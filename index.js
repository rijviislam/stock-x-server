const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: ["http://localhost:5001", "http://localhost:5173"],
};

// MIDDLE-WARE //
app.use(cors(corsOptions));
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yy4jwyq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const productCollection = client.db("stockX").collection("product");

    // Route to get products //
    app.get("/products", async (req, res) => {
      try {
        const result = await productCollection.find().toArray();
        console.log(result); 
        res.send(result);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Failed to fetch products");
      }
    });
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Job Task is Running!!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
