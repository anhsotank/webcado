const express = require("express");
const path = require("path");
const app = express();

// Tham chiếu thư viện
// var MongoClient = require('mongodb').MongoClient;
// // link kết nối đến database
// var url = "mongodb+srv://truonganh15122003:7nMA58xTe59OQJ7p@cluster0.voymstb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// // tạo đối tượng và truyền dữ liệu qua url
// var mongo = new MongoClient(url);
// // Kết nối đến Database
// mongo.connect((err, db) => {
//     if (err) throw err;

//     console.log("Kết nối thành công");

//     // chọn database để sử dụng
//     var dbo = db.db("profile");
//     // tạo bảng  dữ liệu trong database
//     // dbo.createCollection("person" , (err , res)=>{
//     //     if (err) throw err;

//     //     console.log("Tạo bảng thành công");
//     // });

//     var obj = { name: 'Nguyen Van Z', age: 21 };
//     // Thực hiện insert obj vào bảng person
//     // dbo.collection("person").insertOne(obj , (err , result)=>{
//     //     if(err) throw err;

//     //     console.log("Thêm thành công");
//     //     console.log(result);
//     //     db.close();
//     // });
//     // Lấy dữ liệu trong bảng person
//     // dbo.collection("person").find().toArray((err , objs)=>{
//     //     if(err) throw err;

//     //     if(objs.length != 0) console.log("Lấy dữ liệu thành công ..... ");
//     //     console.log(objs);
//     //     db.close();
//     // });
// });

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://truonganh15122003:7nMA58xTe59OQJ7p@cluster0.voymstb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    console.log("ok");
    // Lấy cơ sở dữ liệu và collection bạn muốn làm việc
    const database = client.db("profile");
    const collection = database.collection("name");

    // Tạo một truy vấn đơn giản
    const query = {
      /* điều kiện tìm kiếm, ví dụ: { name: "Alice" } */
    };

    // Tìm các tài liệu theo truy vấn
    documents = await collection.find().toArray();

    console.log(documents);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static("./src/public"));

app.get("/", function (req, res) {
  res.render("sample.ejs", { user: documents });
});

app.listen(3000);
