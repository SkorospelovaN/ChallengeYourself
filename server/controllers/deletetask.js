import { sql } from "../db.js";

export const deletetask = async (req, res) => {

    const {id} = req.body;
  
    await sql`delete from Tasks where id = ${id}`
    return res.send({message: "Цель удалена"})
}