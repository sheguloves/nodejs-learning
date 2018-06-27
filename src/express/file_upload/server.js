
const express = require("express")
const multer = require("multer")
const cors = require("cors")
const {imageFilter} = require('./filter')

const app = express()

app.use(cors())

const UPLOAD_PATH = 'uploads'
const upload = multer({ dest: `${UPLOAD_PATH}`, fileFilter: imageFilter})

app.post('/upload', upload.single('avatar'), (req, res) => {
  if (req.file) {
    res.send('File Upload!')
  } else {
    throw Error("No file attached")
  }
})

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/about', (req, res, next) => {
  console.log("about middleware")
  next()
}, (req, res) => res.send('Hello About!'))

app.listen(3000, () => console.log('Example app is running at 3000'))
