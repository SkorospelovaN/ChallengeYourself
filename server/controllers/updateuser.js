import { sql } from "../db.js";

export const updateuser = async (req, res) => {

    const {id, login, fio, phone} = req.body;
  
    await sql`update Users set login = ${login}, fio = ${fio}, phone = ${phone} where id = ${id}`
    return res.send({message: "Данные обновлены"})
}