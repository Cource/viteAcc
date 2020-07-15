import * as expressive from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import { sales } from './db.ts'

const app = new expressive.App()
app.use(expressive.bodyParser.json())
app.use(expressive.simpleLog())


app.get('/api/init', async (req, res)=>{
    let lastSale = await sales.count({})
    res.json({lastSale})
})

app.get('/api/ret', async (req, res)=>{
    res.json(await sales.find({}))
})

app.post('/api/sale', async (req)=>{
    console.log(await sales.insertOne({
        amt: req.data.amt,
        time: new Date()
    }))
})

app.listen(8080)