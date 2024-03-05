import { sql } from "../db.js";
import bcrypt from 'bcryptjs'

//контроллер регистрации
export const register = async (req, res) => {
    //вытаскиваем json и сразу вытаскиваем из нее переменные
    const {login, fio, phone, password} = req.body;
    
    //кандидат это переменная в которую попытаемся найти и записать пользователя с таким никнеймом
    const candidate = await sql`select * from Users where login = ${login} limit 1`[0]
    //если мы нашли пользователя с таким ником, то отправляем пользователю обратно ошибку что пользователь уже существует
    if (candidate) {
        res.status(400).send("Пользователь уже существует")
    }
    //хешируем пароль
    console.log(req.body);
    const hashPassword = bcrypt.hashSync(password, 7)
    //вытаскиваем из базы роль для пользователя так как у нас связка таблиц
    //создаем нового пользователя
    await sql`insert into Users(login, fio, phone, password, role) values(${login}, ${fio}, ${phone}, ${hashPassword}, 'USER')`
    //отправляем пользователю 200 статус код (это значит что всё успешно)
    return res.send({message: "Пользователь успешно зарегистрирован"})
}