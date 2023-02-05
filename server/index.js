import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import fs from 'fs';

import checkAuth from './utils/checkAuth.js'

import { loginValidator, registerValidator, postCreateValidator } from "./validations/validations.js"

import { register, login, getMe } from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.set('strictQuery', false)

mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.8mv7svu.mongodb.net/test'
).then(() => {
    console.log('ok')

}).catch((err) => console.log('DB error', err))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage })

app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidator, handleValidationErrors, login)
app.post('/auth/register', registerValidator, handleValidationErrors, register)
app.get('/auth/me', checkAuth, getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidator, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id',
    checkAuth,
    postCreateValidator,
    handleValidationErrors,
    PostController.update,

);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok')
})
