import express from 'express'
import cors from 'cors'
import path from 'path'

import routes from './routes'

const app = express()

const port = 3030

app.use(cors())
app.use(express.json())
app.use(routes)

app.use('/static', express.static(path.resolve(__dirname, '..', 'static')))
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(port, () => {
  console.log(`🚀 Ecoleta server is listening on port ${port}!`)
})
