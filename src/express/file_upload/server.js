
const express = require("express")
const multer = require("multer")
const cors = require("cors")
const {imageFilter} = require('./filter')

const app = express()

app.use(cors())

const UPLOAD_PATH = 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${UPLOAD_PATH}`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage, fileFilter: imageFilter})

const parseFile = function(file) {
  return {
    filename: file.filename,
    originalname: file.originalname,
    encoding: file.encoding,
    path: file.path,
    mimetype: file.mimetype
  }
}

app.post('/image/multi-upload', upload.array('images', 12), (req, res) => {
  let files = req.files
  if (files.length > 0) {
    res.send(files.map(file => {
      return parseFile(file)
    }))
  }
})

app.post('/image/upload', upload.single('images'), (req, res) => {
  let file = req.file
  if (file) {
    res.send(parseFile(file))
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
