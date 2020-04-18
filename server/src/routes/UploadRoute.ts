import Express from 'express'
import multer from 'multer'
import path from 'path'
import { ResponseHelper } from './ResponseHelper'

const router = Express.Router()

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../../public/upload'),
  filename(req, file, cb) {
    // 文件名：在服务器应该随机生成，和客户端不能一致，可以使用时间戳来弄
    const time = new Date().getTime()
    // 后缀名：和客户端一致
    const originalFileName = file.originalname
    const extendName = path.extname(originalFileName)
    // 设置文件名的全称
    cb(null, `${time}${extendName}`)
  }
})

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.jiff']

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 // 文件大小 最多1M
  },
  fileFilter(request, file, cb) {
    const extension = path.extname(file.originalname)
    if (allowedExtensions.includes(extension)) {
      // 接收这个文件
      cb(null, true)
    } else {
      // 拒绝这个文件
      cb(new Error('文件类型不正确'))
    }
  }
}).single('imgfile')

router.post('/', (request, response) => {
  // @ts-ignore
  upload(request, response, error => {
    if (error) {
      ResponseHelper.sendError(error.message, response)
    } else {
      const url = `/upload/${request.file.filename}`
      ResponseHelper.sendData(url, response)
    }
  })
})

export default router