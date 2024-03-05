import express from "express";
import { sql } from "./db.js";
import { register } from "./controllers/register.js";
import { auth } from "./controllers/auth.js";
import { roleMiddleware } from "./middlewares/roleMiddleware.js";
import cors from 'cors'
import { addtask } from "./controllers/addtask.js";

const PORT = 5000

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', roleMiddleware(["ADMIN"]), async (req, res) => {
    const data = await sql`select * from Users`
    res.send(data)
})

app.get('/usertasks', async (req, res) => {
    const { user_id } = req.body 
    const user = await sql`select * from Users where user_id == ${user_id}`
    const data = await sql`select * from Tasks where user_id == ${user}`
    res.send(data)
})

app.post('/reg', register)

app.post('/auth', auth)

app.post('/addnew', addtask)

const start = async () => {
    
    
    /*await sql`create table if not exists Users(
        id SERIAL PRIMARY KEY NOT NULL,
        login varchar(100) NOT NULL,
        fio varchar(100),
        phone bigint,
        password varchar(100),
        role varchar(100),
        done int
    )`*/


    /*await sql`create table if not exists Tasks(
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(100),
        description varchar(400),
        date date,
        quantity int,
        status varchar(100),
        user_id int,
        FOREIGN KEY (user_id) REFERENCES Users(id)
    )`*/

    /*await sql`create table if not exists Tasks_with(
        id SERIAL PRIMARY KEY NOT NULL,
        task_id int,
        user_id int,
        FOREIGN KEY (task_id) REFERENCES Tasks(id),
        FOREIGN KEY (user_id) REFERENCES Users(id)
    )`*/


    
    app.listen(PORT, () => {
        console.log(`СЕРВАК ФУРЫЧИТ ТУТ http://localhost:${PORT}`);
    })
}

start()