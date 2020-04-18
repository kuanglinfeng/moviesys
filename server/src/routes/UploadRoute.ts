import Express from 'express'

const router = Express.Router()

router.post('/', (request, response) => {
  console.log('处理文件上传')
})

export default router