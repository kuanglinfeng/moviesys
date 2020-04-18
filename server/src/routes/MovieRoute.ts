import Express from 'express'
import MovieService from '../services/MovieService'
import { ResponseHelper } from './ResponseHelper'

const router = Express.Router()

// 根据id获取单个电影
router.get('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const movie = await MovieService.findById(id)
    ResponseHelper.sendData(movie, response)
  } catch (e) {
    ResponseHelper.sendData(null, response)
  }
})

// 根据分页信息查询多个电影
router.get('/', async (request, response) => {
  // @ts-ignore
  const result = await MovieService.find(request.query)
  ResponseHelper.sendPageData(result, response)
})

// 添加电影
router.post('/', async (request, response) => {
  // 这里的使用request.body需要使用中间件Express.json()
  const result = await MovieService.add(request.body)
  if (Array.isArray(result)) {
    ResponseHelper.sendError(result, response)
  } else {
    ResponseHelper.sendData(result, response)
  }
})

// 修改电影
router.put('/:id', async (request, response) => {
  try {
    const result = await MovieService.edit(request.params.id, request.body)
    if (result.length > 0) {
      ResponseHelper.sendError(result, response)
    } else {
      ResponseHelper.sendData(true, response)
    }
  } catch (e) {
    ResponseHelper.sendError('id错误', response)
  }
})

// 删除电影
router.delete('/:id', async (request, response) => {
  try {
    await MovieService.delete(request.params.id)
    ResponseHelper.sendData(true, response)
  } catch (e) {
    ResponseHelper.sendError('id错误', response)
  }
})

export default router