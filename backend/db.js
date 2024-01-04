const mongoose =require('mongoose')
const url="mongodb://0.0.0.0:27017/gofoodmern"
const mogoDB=async()=>{
   await mongoose.connect(url,{useNewUrlParser:true},async(err,result)=>{
    if(err) console.log("--",err);
    else{

        console.log("Connected");
        const fecched_data=await mongoose.connection.db.collection("foodCategory");
        fecched_data.find({}).toArray(async function(err,data){
            const foodCategory=await mongoose.connection.db.collection("foodData2");
            foodCategory.find({}).toArray(function(err,catdata){
                if(err) console.log(err);
                else {
                    global.foodData2=data;
                    global.foodCategory=catdata;
                    // console.log(global.foodData2);
                }
            })
           
        })
    }

    })
}
    module.exports=mogoDB();



// const mogoDB=async()=>{
// await mongoose.connect(url).then((err,result)=>{
// console.log("Connected");
//         const fecched_data=  mongoose.connection.db.collection("foodCategory");
//         fecched_data.find({}).toArray(async function(err,data){
//             const foodCategory=await mongoose.connection.db.collection("foodCategory");
//             foodCategory.find({}).toArray(function(err,catdata){
//                 if(err) console.log(err);
//                 else {
//                     global.foodData2=data;
//                     global.foodCategory=catdata
//                     console.log(global.foodCategory);
//                 }
//             })
           
//         })
//     }
// ).catch((err)=>console.log(err.message))
// }





// const { MongoClient } = require('mongodb')
// const url = 'mongodb://0.0.0.0:27017';
// const database = 'gofoodmern'
// const client = new MongoClient(url)
// global.f_data=null;
// async function dbconnect() {
//     let result = await client.connect();
//     db = result.db(database);
//     global.f_data = db.collection("foodData2");
//     return global.f_data;

 

// }


// module.exports = dbconnect;

// const{MongoClient} =require('mongodb')
// const url='mongodb://0.0.0.0:27017';
// const database ='gofoodmern';
// const client=mongoose.connect("mongodb://0.0.0.0:27017/gofoodmern");

// async function dbconnect()
// {
//     let result=await client.connect();
//     db=result.db(database);
//     return db.collection("foodCategory");
// }

// module.exports=dbconnect;
