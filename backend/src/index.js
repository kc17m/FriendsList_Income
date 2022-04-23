const cors = require("cors")
const express = require("express")

const { findAllFriends, findFriendById, insertFriend } = require("./db-access/db-access")

const PORT = process.env.PORT || 8600
const app = express()

app.use(cors())
app.use(express.json())

app.use((req, _, next) => {
    console.log("new request", req.method, req.url)
    next()
})

app.get("/", (req, res) => {
    res.send("siehst du mich?")
})

app.get("/friends", (_, res) => {
    findAllFriends()
        .then((allFriends) => res.json(allFriends))
        .catch(() => res.json({ err: "Error finding friends..." }))
})


app.get("/friends/:id", (req, res) => {
    const id = req.params.id
    findFriendById(id)
        .then(friend => res.json(friend))
        .catch(() => res.json({ err: "Error finding friend with id: " + id + "..." }))
})


app.post("/friend/new", (req, res) => {
    const newFriend = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.bday,
        phone: req.body.phone,
        job: req.body.job,
        verdienst: req.body.verdienst,
        selfemployed: req.body.selfemp,
        workedwith: req.body.worked
    }
    insertFriend(newFriend)
        .then(() => findAllFriends())
        .then((allFriends) => res.json(allFriends))
        .catch(_ => res.status(500).json({ err: "Unknown error saving Friend" }))

})


app.listen(PORT, () => { console.log("Server listening on port", PORT) })