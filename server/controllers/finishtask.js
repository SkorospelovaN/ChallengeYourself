import { sql } from "../db.js";

export const finishtask = async (req, res) => {

    const {id, done, user_id} = req.body;
  
    await sql`delete from Tasks_with where task_id = ${id}`
    await sql`delete from Tasks where id = ${id}`
    await sql`update Users set done = ${done} + 1 where id = ${user_id}`
    return res.send({message: "Цель удалена"})
}