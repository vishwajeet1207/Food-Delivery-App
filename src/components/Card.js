import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card (props)  {
    let dispatch=useDispatchCart()
    let options=props.options;
    let data=useCart();
    const priceref=useRef();
    let priceoptions=Object.keys(options)
    const [qty, setqty] = useState(1)
    const [size, setsize] = useState("")
    // let foodItem=props.foodItem;
    const handleadtocart= async()=>{
        let food=[]
        for (const item of data){
            if(item.id==props.foodItem._id){
            food=item;
            break;
            }
        }

        if(food!=[])
        {
            if(food.size==size)
            {
                await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice, qty:qty})
                return
            }
            else if(food.size!=size)
            {
                await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name, price:finalPrice, qty:qty, size:size})
                return

            }
            return 
        }
        

          await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name, price:finalPrice, qty:qty, size:size})
        //   console.log(data);
    }

    let finalPrice = qty * parseInt(options[size]); 
    useEffect(()=>{
        setsize(priceref.current.value)
    },[])
    return (
        <div>
            <div><div class="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} class="card-img-top" alt="..." style={{ height: "130px", objectFit: "fill" }}/>
                <div class="card-body">
                    <h5 class="card-title">{props.foodItem.name}</h5>
                    {/* <p class="card-text">This imp rext</p> */}
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success rounded' onChange={(e)=>setqty(e.target.value)} >
                            {Array.from(Array(5), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}

                        </select>
                        <select className='m-2 h-100  bg-success rounded'  ref={priceref} onChange={(e)=>setsize(e.target.value)} >
                          {priceoptions.map((data)=>{
                            return <option key={data} value={data}> {data}</option>
                          })}

                        </select>
                        <div className='d-inline h-100 fs-5'>
                        ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr></hr>
                    <button className={'btn btn-success justify-center ms-1'} onClick={handleadtocart}>Add to Cart</button>




                </div>
            </div>
            </div>
        </div>
    )
}


