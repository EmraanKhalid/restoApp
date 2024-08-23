
"use client";
import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations,setLocations] = useState([]);
  const [restaurants,setRastaruants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocation,setShowLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadlocation();
    loadRestaurants();
  }, []);

  const loadlocation = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations");
    response = await response.json();
    if (response.success) {
      setLocations(response.result);
    }
  }

  const loadRestaurants = async (params) =>{
    let url = "http://localhost:3000/api/customer";
    if(params?.location){
      url = url+"?location="+params.location;
      console.log(url)
    }else if(params?.restaurant){
      url = url+"?restaurant="+params.restaurant;
    }
    let response = await fetch(url);
    response = await response.json();
    if(response.success){
      setRastaruants(response.result);
    }
  }
  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({location:item});
  }
  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="home-input-wrapper">
          <input type="text" value={selectedLocation} 
          onClick={()=>setShowLocation(true)}
          className="select-input" placeholder="Select Area" />
          <ul className="location-list">
              {
                showLocation && locations.map((item)=>(
                  <li onClick={()=>handleListItem(item)}>{item}</li>
                ))
              }
          </ul>
          <input type="text" className="search-input" onChange={()=>loadRestaurants({restaurant: event.target.value})} 
          placeholder="Enter Food or Resturant Name" />
        </div>
      </div>
      <div className="restaurant-list-container">
        {
          restaurants.map((item)=>(
            <div onClick={()=>router.push('explore/'+item.resturantName+"?id="+item._id)} className="restaurant-wrapper">
              <div className="heading-wrapper">
                <h2>{item.resturantName}</h2>
                <h5>Contact: {item.contact}</h5>
              </div>
              <div className="address-wrapper">
                <div>{item.city},</div>
                <div className="address">{item.address}, Email: {item.email}s</div>
              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </main>
  );
}
