import 'reflect-metadata'
import Express from 'express'
import MovieRouter from './routes/MovieRoute'
import UploadRoute from './routes/UploadRoute'

const app = Express()

// 配置中间件用于解析请求消息体中的json格式数据
app.use(Express.json())

app.use('/api/movie', MovieRouter)

app.use('/api/upload', UploadRoute)

app.listen(3000)
