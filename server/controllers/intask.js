import { sql } from "../db.js";

export const intask = async (req, res) => {

    const {task_id, user_id} = req.body;
    

    const candidate = await sql`select * from Tasks_with where task_id = ${task_id} && user_id = ${user_id} limit 1`[0]

    if (candidate) {
        res.status(400).send("Цель уже добавлена")
    }
    console.log(req.body);
   
    await sql`insert into Tasks_with(task_id, user_id) values(${task_id}, ${user_id})`

    return res.send({message: "Цель успешно добавлена"})
}