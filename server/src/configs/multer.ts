import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      const hash = crypto.randomBytes(1).toString('hex')

      const data = Date.now()

      const filename = `${data}-${hash}-${file.originalname}`

      callback(null, filename)
    },
  }),
}
