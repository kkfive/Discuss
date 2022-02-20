import request from 'xhr-ajax'

/**
 * 访问量统计
 * @param {String} url 请求地址
 * @param {String} path 请求路径
 */
async function VisitStat(url, path) {
  if (!url) return
  const counterEle = document.getElementById('Discuss-Visitors')
  if (!counterEle) return
  if (!path) path = location.pathname

  const options = {
    url,
    method: 'post',
    data: {
      type: 'COUNTER',
      path
    }
  }

  const { data } = await request(options)

  if (data) counterEle.innerText = data
}

export default VisitStat