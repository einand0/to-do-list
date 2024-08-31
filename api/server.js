import express from 'express'
import { PrismaClient } from "@prisma/client"
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


app.put('/tasks/:id', async (req, res) => {
    await prisma.task.update({
        where: {
            id: req.params.id
        },
        data: {
            title: req.body.title,
            description: req.body.description,
            done: req.body.done
        }
    })

    res.send(201)
})

app.post('/tasks', async (req, res) => {
    await prisma.task.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            done: req.body.done
        }
    })

    res.send(201)
})

app.get('/tasks', async (req, res) => {

    let tasks = []

    if(req.query){
        tasks = await prisma.task.findMany({
            where: {
                id: req.query.id
            }
        })
    } else{
        tasks = await prisma.task.findMany()
    }

    res.status(200).json(tasks)
})

app.delete('/tasks/:id', async (req, res) => {
    await prisma.task.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Task deleted successfully."})
})

app.listen(3000)