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

    // HOME PAGE PRODUCT SEARCH AND PAGINATION //
    app.get("/products", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const searchName = req.query.name || ""; 
      const query = {};

      if (searchName) {
        query.name = { $regex: searchName, $options: "i" }; 
      }

      try {
        const ITEM_PER_PAGE = 10; 
        const totalItems = await productCollection.countDocuments(query);
        const pageCount = Math.ceil(totalItems / ITEM_PER_PAGE);
        const result = await productCollection
          .find(query)
          .skip((page - 1) * ITEM_PER_PAGE)
          .limit(ITEM_PER_PAGE)
          .toArray();

        res.send({
          pagination: {
            totalItems,
            pageCount,
          },
          result,
        });
      } catch (error) {
        console.error("Error fetching products", error);
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
