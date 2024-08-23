'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const Page = () =>{
    const router = useRouter();

    const [myOrders,setMyOrders] = useState([]);
    useEffect(()=>{
        getMyOrders();
    },[]);

    const getMyOrders = async()=>{
        const deliveryPartnerStorage = JSON.parse(localStorage.getItem('deliveryPartner'));
        console.log(deliveryPartnerStorage._id);
        let response = await fetch('http://localhost:3000/api/deliverypartners/orders/66c597cb6d5fac3db07a92df');
        response = await response.json();
        console.log(response.result);
        if(response.success){
            setMyOrders(response.result);
        } 
    }



    useEffect(()=>{
        const devliveryPartner = JSON.parse(localStorage.getItem('deliveryPartner'));
        if(!devliveryPartner){
            router.push('/deliverypartner');
        }
    });
    return(
        <div style={{textAlign:'center'}}>
            <DeliveryHeader/>
            <h1>My Order List Dashboard</h1>
            {
                myOrders.map((item)=>(
                    <div className="restaurant-wrapper" style={{marginLeft:'auto',marginRight:'auto'}}>
                        <h4>{item.restoInfo.data.resturantName}</h4>
                        <div>Amount: {item.restoInfo.amount}</div>
                        <div>Address: {item.restoInfo.data.address}</div>
                        <div>Status: {item.restoInfo.status}</div>
                    </div>
                ))
            }
            <Footer/>
        </div>
    )
}

export default Page;