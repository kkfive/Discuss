const { VerifyToken } = require('../utils/adminUtils')
const {
  WordNumberLimit,
  WordNumberExceed,
  SendMailHandler,
  GetCommentCounts,
  limitPageNo,
  GetReplyComment,
  limitFilter,
  CommentHandler,
  VerufyMailANDSite,
  CommitCommentHandler
} = require('../utils/commentUtils')
const { IndexHandler, DeepClone, VerifyParams, akismet } = require('../utils')

const { DISCUSS_AUDIT } = process.env

/* eslint-disable max-statements  */
// 获取评论
async function GetComment(params) {
  const { getTopComments, getComments } = global.DiscussDB
  const config = global.Dconfig
  const commentCount = config.commentCount
  // 处理index.html
  params.path = IndexHandler(params.path)

  const { pageNo, path } = params
  // 查询条件
  let options = {
    pid: '',
    path,
    status: 'accept',
    stick: ['!=', true]
  }

  /*
  查询置顶评论
  只有在第一页的时候才会查询置顶评论(只查询一次置顶评论)
  一次性查出所有置顶评论
  */
  let commentsTop = []
  if (pageNo === 1) {
    const optionsTop = DeepClone(options)
    optionsTop.stick = true
    commentsTop = await getTopComments(optionsTop)
  }

  // 获取通过审核的评论数
  const optionsCount = DeepClone(options)
  delete optionsCount.stick
  const counts = await GetCommentCounts(optionsCount)

  // 限制页码
  const { page, pageCount } = await limitPageNo(pageNo, commentCount, optionsCount)

  // 分页查询
  const comments = await getComments(options, { page, pageSize: commentCount })

  // 合并置顶评论和普通评论
  const newComments = [...commentsTop, ...comments]

  // 置顶评论和普通评论一起查询回复评论
  const commentsAll = await GetReplyComment(newComments)

  const wordNumber = WordNumberLimit(config.wordNumber)

  const result = {
    comments: CommentHandler(commentsAll),
    counts,
    pageCount,
    wordNumber
  }

  return result
}

// 提交评论
async function CommitComment(params) {
  const { addComment, getCommentByID } = global.DiscussDB
  // 验证评论信息是否合法
  VerifyParams(params, ['nick', 'mail', 'content', 'ua', 'path'])
  // 验证邮箱和网址是否正确
  VerufyMailANDSite(params.mail, params.site)

  // 查询rid是否存在
  let RplayComment
  if (params.rid) {
    RplayComment = await getCommentByID(params.rid)
  }

  const config = global.Dconfig

  // 验证token是否正确
  const token = await VerifyToken(params.token)

  if (token) params.status = 'accept'
  else {
    // 判断是否使用博主身份评论
    if (config.mail === params.mail) throw new Error('login')
    // ip 限流
    await limitFilter(params.ip)
    // 字数限制
    const isExceed = WordNumberExceed(config.wordNumber, params)
    if (isExceed) throw new Error('Word count exceeds the specified range !')

    const akismetData = {
      ip: params.ip,
      name: params.nick,
      email: params.mail,
      content: params.content,
      url: params.site,
      type: params.rid ? 'reply' : 'comment',
      useragent: params.ua
    }
    params.status = await akismet(config.akismet, config.siteUrl, akismetData)
    if (DISCUSS_AUDIT === 'true') params.status = 'audit'
  }
  const data = await CommitCommentHandler(params)

  // 保存评论
  const result = (await addComment(data))[0]

  // 如果是回复评论则写入回复评论的昵称
  if (RplayComment) data.rnick = result.rnick = RplayComment.nick

  await SendMailHandler(config, data)

  delete data.token
  delete data.type

  if (params.status === 'audit') return []
  if (result) return CommentHandler([result])
  return []
}
/* eslint-enable max-statements */

// 获取最新评论
async function RecentComment(params) {
  const { getRecentComment } = global.DiscussDB
  const config = global.Dconfig
  let query = { status: 'accept' }
  if (params.reply === false) query.pid = ''

  const comments = await getRecentComment(query, config.commentCount || 10)

  return CommentHandler(comments)
}

// 获取评论数
async function CommentCount(params) {
  const { getCommentCount } = global.DiscussDB

  VerifyParams(params, ['paths'])

  // 判断是否是数组
  if (!Array.isArray(params.paths)) throw new Error('"paths" is not an array')

  // 处理index.html
  const paths = params.paths.map((item) => IndexHandler(item))

  // 格式化
  const result = []
  for (const path of paths) {
    const options = { path }
    // 是否查询回复评论，默认查询所有评论
    if (params.reply === false) options.pid = ''
    const count = await getCommentCount(options)
    result.push({ path, count })
  }

  return result
}

module.exports = { GetComment, CommitComment, RecentComment, CommentCount }
