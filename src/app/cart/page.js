"use client"

import { useState } from "react";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const { default: CustomerHeader } = require("../_components/CustomerHeader");
const { default: Footer } = require("../_components/Footer");


const Page = () => {
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem("cart")));
    const [total] = useState(() => cartStorage.length == 1 ? cartStorage[0].price : cartStorage.reduce((a, b) => {
        return Number(Number(b.price) + Number(a.price));
    }))
    const tax = total * TAX / 100;
    const router = useRouter();

    const orderNow = () =>{
        if(JSON.parse(localStorage.getItem('user'))){
            router.push('/order');
        }
        else{
            router.push('/user-auth?order=true');
        }
    }

    return (
        <div>
            <CustomerHeader />
            <h1>Cart Page</h1>
            <div className="food-item-wrapper">
                {
                    cartStorage?.length > 0 ? cartStorage.map((item) => (
                        <div className="list-item">
                            <div className="list-item-block-1"><img style={{ width: 100 }} src={item?.img_path} /></div>
                            <div className="list-item-block-2">
                                <div>Name: {item?.name}</div>
                                <div className="description">Description: {item?.description}</div>
                                <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                            </div>
                            <div className="list-item-block-3">Price: {item?.price}</div>

                        </div>
                    ))
                        :
                        <h1>No Food Item Avaliable</h1>
                }
            </div>
            <div className="total-wrapper">
                <div className="block-1">
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
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Place Your Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page;