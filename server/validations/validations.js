import { body } from 'express-validator'

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    //body('fullName', 'Имя должно быть минимум 3 символа').isLength({ min: 3 }),
    //body('avatarUrl', 'Неверная ссылка').optional().isURL(),
]

export const registerValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Имя должно быть минимум 3 символа').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка').optional().isURL(),
]

export const postCreateValidator = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]

