"use client"

import { useRouter } from "next/navigation";

const { useState, useEffect } = require("react")

const EditFoodItem =(props) =>{
    console.log(props.params.id); 
    const [name,setName]=useState();
    const [price,setPrice]=useState();
    const [path, setPath]=useState();
    const [description,setDescription]=useState();
    const [error,setError]=useState(false);
    const router = useRouter();

    useEffect(()=>{
        handleloadFoodItem();
    },[]);

    const handleloadFoodItem = async() => {
        let response = await fetch(`http://localhost:3000/api/resturant/foods/edit/${props.params.id}`);
        response = await response.json();
        if(response.success){
            console.log(response.result);
            setName(response.result.name);
            setPrice(response.result.price);
            setPath(response.result.img_path);
            setDescription(response.result.description);
        }
    }

    const handleUpdateFoodItem = async () => {
        console.log(name,price,path,description);
        if(!name || !price || !path || !description){
            setError(true);
            return;
        }else{
            setError(false);
        }
        let response = await fetch(`http://localhost:3000/api/resturant/foods/edit/${props.params.id}`,{
            method: 'PUT',
            body: JSON.stringify({name,price,path,description})
        });
        response = await response.json();
        if(response.success){
            router.push('http://localhost:3000/resturant/dashboard');
        }
        else{
            alert("Something Went Wrong. Try Again");
        }

    }
    return(
        <div className="container">
            <h1>Update Food Item</h1>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Food Name" value={name} 
                onChange={(e)=>setName(e.target.value)} />
                {
                    error && !name && <span className="input-error">Restaurant Name Field is Empty.</span>
                }
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Price" value={price}
                onChange={(e)=>setPrice(e.target.value)} />
                {
                    error && !price && <span className="input-error">Price Field is Empty.</span>
                }
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Image Path" value={path}
                onChange={(e)=>setPath(e.target.value)} />
                {
                    error && !path && <span className="input-error">Image Path Field is Empty.</span>
                }
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Descripiton" value={description}
                onChange={(e)=>setDescription(e.target.value)} />
                {
                    error && !description && <span className="input-error">Descripiton Field is Empty.</span>
                }
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleUpdateFoodItem}>Update Food Item</button>
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={()=>router.push("/resturant/dashboard")}>Back to Food Item</button>
            </div>
        </div>
    );
}

export default EditFoodItem;