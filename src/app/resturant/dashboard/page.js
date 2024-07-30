"use client"
import Footer from "@/app/_components/Footer";
import ResturantHeader from "@/app/_components/ResturantHeader";
import "./../style.css"
import AddFoodItems from "@/app/_components/AddFoodItem";
import { useState } from "react";
import FoodItemList from "@/app/_components/FoodItemList";

const Dashboard = () => {
    const [addItem, setAddItem] = useState(false);

    return (
        <div>
             <ResturantHeader />
             <button onClick={()=>setAddItem(true)}>Add Food Items</button>
             <button onClick={()=>setAddItem(false)}>Dashboard</button>
             {
                addItem ?<AddFoodItems /> : <FoodItemList />
             }
            <Footer />
        </div>
    )
}

export default Dashboard;