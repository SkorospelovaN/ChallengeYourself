import express from "express";
import { sql } from "./db.js";
import { register } from "./controllers/register.js";
import { auth } from "./controllers/auth.js";
import cors from 'cors'
import { addtask } from "./controllers/addtask.js";
import { updatetask } from "./controllers/updatetask.js";
import { deletetask } from "./controllers/deletetask.js";
import { updateuser } from "./controllers/updateuser.js";
import { intask } from "./controllers/intask.js";
import { finishtask } from "./controllers/finishtask.js";

const PORT = 5000

const app = express()

app.use(express.json())
app.use(cors())

app.get('/gettask',  async (req, res) => {
    const data = await sql`select * from Tasks`
    res.send(data)
})

app.get('/getalltasks',  async (req, res) => {
    const data = await sql`select * from Tasks where not exists(select Tasks_with.task_id from Tasks_with where Tasks.id = Tasks_with.task_id)`
    res.send(data)
})

app.get('/getintask',  async (req, res) => {
    const data = await sql`select * from Tasks_with`
    res.send(data)
})

app.get('/getuser',  async (req, res) => {
    const data = await sql`select * from Users`
    res.send(data)
})


app.post('/updatestatus', updatetask)


app.post('/reg', register)

app.post('/auth', auth)

app.post('/updateuser', updateuser)

app.post('/addnew', addtask)

app.post('/deletetask', deletetask)

app.post('/finishtask', finishtask)

app.post('/intask', intask)

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

    await sql`update Tasks set quantity = (select count (*) from Tasks_with where Tasks_with.task_id = Tasks.id)`


    
    app.listen(PORT, () => {
        console.log(`СЕРВАК ФУРЫЧИТ ТУТ http://localhost:${PORT}`);
    })
}

start()