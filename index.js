const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require ('mongodb').ObjectId;

app.use(cors());
app.use(express.json());

// Username: admin-1

// pass: 3EN5P7bWSArclyBT

//Mongo

const uri = "mongodb+srv://admin-1:3EN5P7bWSArclyBT@inventory-managment.mjl19.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    try {
        await client.connect();
        const collection = client.db("Inventory").collection("products");
        // const product = {
        //     picture: "https://i.ibb.co/ZVZvwKD/4runner-SR5-Premium.png",
        //     quantity: 32,
        //     carName: "4runner-SR5 Premium",
        //     company: "Toyota",
        //     price: "41,515",
        //     description: "Blind Spot Monitor - SofTex®-trimmed  - Heated side mirrors with turn signal indicator\r\n"
        // }


        // const result = await collection.insertOne(product);
        app.get('/product', async(req,res) =>{
            const query = {};
            const cursor = collection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
        
        //post product
        app.post('/product',async (req,res)=>{
            const newProduct = req.body;
            console.log('adding new user', newProduct);
            const result = await collection.insertOne(newProduct);
            res.send({result});
        })

       
    } finally {
        //close later
    }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})