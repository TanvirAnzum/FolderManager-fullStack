// dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  Double,
  MongoDBNamespace,
} = require("mongodb");

// express app initialization

const app = express();
const port = 9000;

// middlewares

app.use(cors());
app.use(express.json());

// mongodb initialization

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ote0m1f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// homepage

app.get("/", (req, res) => {
  res.send("Welcome to the server side of simple folder structure project");
});

async function run() {
  try {
    const db = client.db("foldersDB").collection("folders");

    // create folder

    app.post("/folders", async (req, res) => {
      const data = req.body;
      data.parentId = ObjectId(data.parentId);
      await db.insertOne(data);
      res.send(data);
    });

    app.delete("/folders/:id", async (req, res) => {
      const folderId = req.params.id;
      const agg = [
        {
          $match: {
            _id: new ObjectId(folderId),
          },
        },
        {
          $graphLookup: {
            from: "folders",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parentId",
            as: "child",
            depthField: "string",
            restrictSearchWithMatch: {},
          },
        },
      ];
      const cursor = db.aggregate(agg);
      const data = await cursor.toArray();
      const idsList = data[0].child.map((folder) => folder._id);
      idsList.push(ObjectId(folderId));
      const response = await db.deleteMany({ _id: { $in: idsList } });
      res.send(response);
    });

    app.get("/folders/:parentId", async (req, res) => {
      const parentId = req.params.parentId;
      const query = {
        parentId: ObjectId(parentId),
      };
      const cursor = db.find(query);
      const response = await cursor.toArray();
      res.send(response);
    });

    // create Folders
  } catch (err) {
    console.log(err);
  }
}

run();

app.listen(port, () => {
  console.log("Server is listening on port" + port);
});
