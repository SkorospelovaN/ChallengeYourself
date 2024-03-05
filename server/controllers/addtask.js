import { sql } from "../db.js";

export const addtask = async (req, res) => {

    const {name, description, date, status, user_id} = req.body;
    

    const candidate = await sql`select * from Tasks where name = ${name} limit 1`[0]

    if (candidate) {
        res.status(400).send("Цель уже существует")
    }
    console.log(req.body);
   
    await sql`insert into Tasks(name, description, date, status, user_id) values(${name}, ${description}, ${date}, 'Ожидает', ${user_id})`

    return res.send({message: "Цель успешно добавлена"})
}