const express = require("express")
const cors = require("cors")
// const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
dotenv.config()
//Midleware

const { Schema } = mongoose;

const userSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: [{ type: String, required: true }],
    image: { type: String, required: true }
}, { timestamps: true }
)


app.use(cors())
// app.use(bodyParser.json())
app.use(express.json())

const Books = mongoose.model("books", userSchema)

//Get All Users
app.get("/books", async (req, res) => {
    try {
        const books = await Books.find({})
        res.send(books)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

//User get by id
app.get("/books/:id", async (req, res) => {
    try {
        const book = await Books.findById(req.params.id)

        res.send(book)

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

//Add User
app.post("/books", async (req, res) => {
    try {
        const book = new Books({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            image: req.body.image
        })
        await book.save()
        res.send({ message: "book Created" })
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

//book Update
app.put("/books/:id", async (req, res) => {
    try {
        const book = await Books.findByIdAndUpdate(req.params.id)

        if (book) {
            book.title = req.body.title,
                book.description = req.body.description,
                book.category = req.body.category,
                book.image = req.body.image,

                await book.save()
            res.json(book)
        } else {
            res.status(404).json({ message: "Not Found" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

//Delete book

app.delete("/books/:id", async (req, res) => {
    try {
        await Books.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "User Deleted" })

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

const port = process.env.Port
const YUAREL = process.env.connectToUrl.replace("<password>", process.env.password)

mongoose.connect(YUAREL).catch(err => console.log("Db not connect" + err))

app.listen(port, () => {
    console.log("Server Connection");
})