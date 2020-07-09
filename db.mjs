import mongodb from 'mongodb'
const { MongoClient } = mongodb

const url="mongodb+srv://jeff:W4nt-mehuh@cluster0-dwdjn.mongodb.net/accounts?retryWrites=true&w=majority"
const database="accounts"
let conn = MongoClient.connect(url, {useUnifiedTopology: true}).catch((err)=> {throw err})
let dbo = conn
    .then((connection)=> connection.db(database)).catch((err)=> { throw err })

class accounts {
    constructor(name) {
        this.name = name
        this.collection = dbo.then((db)=> db.collection(name))
    }
    async find(query) {
        return await this.collection
            .then((res)=> res.find(query).toArray())
    }
    async delete(query) {
        return await this.collection
            .then((res)=> res.deleteOne(query))
    }
    async insert(doc) {
        return await this.collection
            .then((res)=> res.insertOne(doc))
    }
    async length() {
        return await this.collection
            .then((res)=> res.estimatedDocumentCount())
    }
}

export async function connectdb(){
    conn = MongoClient.connect(url, {useUnifiedTopology: true}).catch((err)=> {throw err})
    dbo = conn
    .then((connection)=> connection.db(database)).catch((err)=> { throw err })
}
export async function closedb(){
    (await conn).close()
}
export const sales = new accounts('sales')
export const purchases = new accounts('purchases')