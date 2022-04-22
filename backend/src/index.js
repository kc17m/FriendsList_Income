const cors = require("cors")
const express = require("express")

const { findAllFriends, findFriendById } = require("./db-access/db-access")

const PORT = process.env.PORT || 8600
const app = express()

app.use(cors())
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


app.listen(PORT, () => { console.log("Server listening on port", PORT) })