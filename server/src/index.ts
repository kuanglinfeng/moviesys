import 'reflect-metadata'
import Express from 'express'
import MovieRouter from './routes/MovieRoute'

const app = Express()

// 配置中间件用于解析请求消息体中的json格式数据
app.use(Express.json())

app.use('/api/movie', MovieRouter)

app.listen(3000)
