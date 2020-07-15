import { MongoClient, Collection } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

const client = new MongoClient()
client.connectWithUri("mongodb+srv://jeff:W4nt-mehuh@cluster0-dwdjn.mongodb.net/accounts?retryWrites=true&w=majority")
const db = client.database("accounts")

export const sales = db.collection('sales')
