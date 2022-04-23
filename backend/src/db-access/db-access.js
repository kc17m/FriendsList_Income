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

function insertFriend(friendsObject) {
    return new Promise((resolve, reject) => {
        getDB()
            .then(db => db.collection("kapitFreundebuch").insertOne(friendsObject))
            .then(result => { // result ist ein objekt, welches insertOne returned
                if (result.acknowledged === true && result.insertedId) {
                    resolve() // erfolgreich
                } else {
                    reject() // hat nicht geklappt
                }
            })
            .catch((err) => reject(err))
    })
}



module.exports = {
    findAllFriends,
    findFriendById,
    insertFriend
}