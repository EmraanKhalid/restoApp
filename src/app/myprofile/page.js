'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";


const Page = () => {
    const [myOrders,setMyOrders] = useState([]);
    const user_id = JSON.parse(localStorage.getItem('user'))._id;
    console.log(user_id);
    useEffect(()=>{
        getMyOrders();
    },[]);
    const getMyOrders = async()=>{
        let response = await fetch('http://localhost:3000/api/order?id='+user_id);
        response = await response.json();
        if(response.success){
            setMyOrders(response.result);
        }
    }

    console.log(myOrders);
    return(
        <div>
            <CustomerHeader />
            <h1>My Profile</h1>
            {
                myOrders.map((item)=>(
                    <div className="restaurant-wrapper" style={{marginLeft:'auto',marginRight:'auto'}}>
                        <h4>{item.data.resturantName}</h4>
                        <div>Amount: {item.amount}</div>
                        <div>Address: {item.data.address}</div>
                        <div>Status: {item.status}</div>
                    </div>
                ))
            }
            <Footer/>
        </div>
    )



}
export default Page;