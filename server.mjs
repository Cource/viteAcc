import {connectdb, sales, closedb} from './db.mjs'
import express from 'express'
import cors from 'cors'
import { purchases } from './db.mjs'
let app = express()

app.use(cors())
app.use(express.json())

// app.use('/', express.static('dist'))
app.get('/api/init', (req, res)=>{
    sales.length()
        .then(length=> res.send({lastSale: length}))
        .catch(_=> res.status(500).send('Could not connect to the database'))
})
app.get('/api/close', (req, res)=> {
    closedb()
        .then(_=> res.send('Closed connection to the database'))
        .catch(_=> res.status(500).send('Could not connect to the database'))
})

app.post('/api/sale', (req, res)=>{
    sales.insert({
        amt: req.body.amt,
        time: new Date()
    })
        .then(_=>res.status(200).send('Added to database'))
        .catch(_=>res.status(500).send('Error'))
})
app.post('/api/purchase', (req, res)=>{
    purchases.insert({
        distributor: req.body.distributor,
        amt: req.body.amt,
        time: new Date()
    })
        .then(_=>res.status(200).send('Added to database'))
        .catch(_=>res.status(500).send('Error'))
})

app.listen(8080)
