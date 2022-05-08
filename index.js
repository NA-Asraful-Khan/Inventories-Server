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
        const myProducts = client.db("Inventory").collection("myProducts");

        // const result = await collection.insertOne(product);
        app.get('/product', async(req,res) =>{
            const query = {};
            const cursor = collection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

        app.get('/product/:id', async(req,res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const product = await collection.findOne(query);
            res.send(product);
        })
        
        //post product
        app.post('/product',async (req,res)=>{
            const newProduct = req.body;
            console.log('adding new user', newProduct);
            const result = await collection.insertOne(newProduct);
            res.send({result});
        })

        //update product
        app.put('/product/:id', async(req,res)=>{
            const id = req.params.id;
            const updatedProduct = req.body;
            const filter = {_id: ObjectId(id)};
            const options={upsert: true};
            const updatedDoc={
                $set:{
                    quantity: updatedProduct.quantity
                }
            }
            const result = await collection.updateOne(filter,updatedDoc,options);
            res.send(result);
        })
        // delet product

        app.delete('/product/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await collection.deleteOne(query);
            res.send(result);
        })

        app.get('/myProducts', async(req,res) =>{
            const query = {};
            const cursor = myProducts.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })


        app.post('/myProducts',async (req,res)=>{
            const newProduct = req.body;
            console.log('adding new user', newProduct);
            const result = await myProducts.insertOne(newProduct);
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