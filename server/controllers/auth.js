import { sql } from "../db.js"
import bcrypt from 'bcryptjs'
import { generateAccessToken } from "../utils/generateToken.js"

export const auth = async (req, res) => {
    //вытаскиваем json и сразу вытаскиваем из нее переменные
    const { login, password } = req.body 
    //вытаскиваем из базы пользователя
    const user = await sql`select * from Users where login = ${login}`
    //если нет то выкидываем ошибку
    if (!user[0]) {
        return res.status(400).json({ message: `Пользователь с e-mail ${login} не найден` })
    }
    //сверяем пароли
    const validPassword = bcrypt.compareSync(password, user[0].password)
    //если не совпадают то ошибку прокидываем
    if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` })
    }
    //если все ок то генерируем токен
    const token = generateAccessToken(user[0].id, user[0].role)
    //и возвращаем пользователю токен и его данные из базы
    return res.json({
        token: token,
        user: user[0]
    })
}