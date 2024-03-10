import { sql } from "../db.js";

export const updatetask = async (req, res) => {

    const {id} = req.body;
  
    await sql`update Tasks set status = 'Одобрено' where id = ${id}`
    return res.send({message: "Статус обновлён"})
}