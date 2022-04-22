const { ObjectId } = require("mongodb")
const { getDB } = require("./getDB")


function findAllFriends() {
    return getDB()
        .then(db => db.collection("kapitFreundebuch").find().toArray())
}

function findFriendById(id) {
    return getDB()
        .then(db => db.collection("kapitFreundebuch").findOne({ _id: new ObjectId(id) }))
}



module.exports = {
    findAllFriends,
    findFriendById
}