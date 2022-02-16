
## 部署

使用Vercel部署你的`Discuss`项目

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lete114/discuss/tree/vercel)

### 从终端部署

> 注意：终端部署仅对于有开发经验用户使用，一般用户使用上方按钮部署即可

你可以使用 [Vercel CLI](https://vercel.com/download) 命令行工具进行部署

```shell
vercel dev # 本地预览

vercel # 部署预览环境

vercel --prod # 部署生产环境
```

### 配置环境变量

点击项目内的`Settings` - `Environment Variables`

```
# Discuss environment Config

# 数据库连接地址
DISCUSS_MONGODB='mongodb://localhost:27017/Discuss'

# 加密的密钥字符串(自定义)
DISCUSS_SECRET='Discuss'
```
