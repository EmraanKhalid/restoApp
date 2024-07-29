"use client"
import Footer from "@/app/_components/Footer";
import ResturantHeader from "@/app/_components/ResturantHeader";
import "./../style.css"
import AddFoodItems from "@/app/_components/AddFoodItem";
import { useState } from "react";

const Dashboard = () => {
    const [addItem, setAddItem] = useState(false);

    return (
        <div>
             <ResturantHeader />
             <button onClick={()=>setAddItem(true)}>Add Food Items</button>
             <button onClick={()=>setAddItem(false)}>Dashboard</button>
             {
                addItem ?<AddFoodItems /> : <h1>Resturant Dashbaord</h1>
             }
            <Footer />
        </div>
    )
}

export default Dashboard;