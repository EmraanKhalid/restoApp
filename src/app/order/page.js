"use client"

import { useEffect, useState } from "react";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const { default: CustomerHeader } = require("../_components/CustomerHeader");
const { default: Footer } = require("../_components/Footer");


const Page = () => {
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem("user")));
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem("cart")));
    const [total] = useState(() => cartStorage?.length == 1 ? cartStorage[0].price : cartStorage?.reduce((a, b) => {
        return Number(Number(b.price) + Number(a.price));
    }));
    const router = useRouter();
    const tax = total * TAX / 100;
    const [removeCartData,setRemoveCartData] = useState(false);
    useEffect(()=>{
        if(!total){
            router.push('/');
        }

    },[total])
    const orderNow = async () => {
        let user_id = JSON.parse(localStorage.getItem('user'))._id;
        let user_city = JSON.parse(localStorage.getItem('user')).city;
        let cart = JSON.parse(localStorage.getItem('cart'));
        let foodItemIds = cart.map((item)=>item._id).toString();
    
        let deliveryBoyResponse = await fetch('http://localhost:3000/api/deliverypartners/'+user_city);
        deliveryBoyResponse = await deliveryBoyResponse.json();
        let deliveryBoyIds = deliveryBoyResponse.result.map((item)=>item._id);
        let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random()*deliveryBoyIds.length)];
        if(!deliveryBoy_id){
            alert("No Rider Available in your City.");
            return false;
        }
        let resto_id = cart[0].resto_id;

        let collection ={
            user_id:user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status:'confirm',
            amount:total + tax + DELIVERY_CHARGES
        };
        console.log(collection);
        let response  = await fetch('http://localhost:3000/api/order',{
            method: 'POST',
            body:JSON.stringify(collection)
        });
        response = await response.json();
        if(response.success){
            alert('Order Placed Successfully');
            setRemoveCartData(true);
            router.push('/myprofile');
        }else{
            alert("Something went wrong! Try again.")
        }
    }

    return (
        <div>
            <CustomerHeader removeCartData={removeCartData} />
            <h1>Order</h1>
            <div className="total-wrapper">
                <div className="block-1">
                    <h2>User Details</h2>
                    <div className="row">
                        <span>Name: </span>
                        <span>{userStorage.name}</span>
                    </div>
                    <div className="row">
                        <span>Address: </span>
                        <span>{userStorage.address}</span>
                    </div>
                    <div className="row">
                        <span>Contact: </span>
                        <span>{userStorage.contact}</span>
                    </div>
                    <div className="row">
                        <span>Email: </span>
                        <span>{userStorage.email}</span>
                    </div>
                    <div className="row">
                        <span>City: </span>
                        <span>{userStorage.city}</span>
                    </div>
                    <h2>Order Details</h2>
                    <div className="row">
                        <span>Food Price: </span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax: </span>
                        <span>{tax}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges: </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount: </span>
                        <span>{total + tax + DELIVERY_CHARGES}</span>
                    </div>
                    <h2>Payment Method</h2>
                    <div className="row">
                        <span>Cash On Delivery </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page;