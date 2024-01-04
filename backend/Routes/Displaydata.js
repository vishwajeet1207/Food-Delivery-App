const express =require('express');
const router =express.Router()

router.post('/fooddata', (req,res)=>{
   
    try{
   
    // console.log(global.f_data);
  
    res.send([global.foodData2, global.foodCategory])
    }
    catch(error)
    {
        console.log(error.message);
        res.send("server Error")
    }
})

module.exports = router; 