import { useState } from "react";
// import { POST } from "../api/resturant/route";

const AddFoodItems = () => {
    const [name,setName]= useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const handleAddFoodItem = async () => {
        let resto_id;
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
        if(restaurantData){
            resto_id = restaurantData._id;
        }

        let response = await fetch("http://localhost:3000/api/resturant/foods",{
            method: "POST",
            body: JSON.stringify({name,price,img_path: path,description,resto_id})
        });

        response = await response.json();
        if(response.success){
            alert("Food Item Addes Succesfully");
        }
    }

    return(
        <div className="container">
            <h1>Add Food Item</h1>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Food Name" value={name} 
                onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Price" value={price}
                onChange={(e)=>setPrice(e.target.value)} />
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Image Path" value={path}
                onChange={(e)=>setPath(e.target.value)} />
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Descripiton" value={description}
                onChange={(e)=>setDescription(e.target.value)} />
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
            </div>
        </div>
    );
}

export default AddFoodItems;