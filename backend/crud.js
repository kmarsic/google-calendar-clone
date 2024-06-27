//crud functions

module.exports = {
    create: async function createEvent(client, userID, newEvent) {
        await client.db("Users").collection(userID).insertOne(newEvent);
    },
    find: async function findUserEvents(client, userID) {
        const cursor = await client.db("Users").collection(userID).find();
        const results = await cursor.toArray();
        return results;
    },
    update: async function updateUserCollection(client, userID, documentID, updatedEntry) {
        await client.db("Users").collection(userID).updateOne({ uuid: documentID }, { $set: updatedEntry })
    },
    delete: async function deleteEntry(client, userID, documentID) {
        await client.db("Users").collection(userID).deleteOne({ uuid: documentID })
    }
}