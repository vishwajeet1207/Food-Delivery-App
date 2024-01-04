// const express = require('express')
// const punycode = require('punycode/');
// const app = express()
// const port = 3000
// const mongDB=require('./db');
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
// "use client"
const express=require('express')
const dbconnect=require('./db')
const app=express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
app.use(express.json());

app.use("/api",require('./Routes/Createuser'))
app.use("/api" ,require("./Routes/Displaydata"))
app.use("/api" ,require("./Routes/OrderData"))
app.get('/',async(req,resp)=>{
   
    let data= await dbconnect;
    data =await data.find().toArray();
    resp.send(data);
    console.log(data);

});

// const dbconnect=require("./db")
// app.use(express.json());
// app.get('/',async(req,resp)=>{
   
//     let data= await dbconnect();
//     data =await data.find().toArray();
//     resp.send(data);
//     console.log(data);

// });

app.listen(5000)