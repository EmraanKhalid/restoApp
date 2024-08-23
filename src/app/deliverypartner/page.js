'use client'
import { useEffect, useState } from "react";
import DeliveryHeader from "../_components/DeliveryHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const Page = () => {
    const [loginMobile, setloginMobile] = useState('');
    const [loginPassword, setloginPassword] = useState('');

    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [city,setCity] = useState('');
    const [address,setAddress] = useState('');
    const [mobile,setMobile] = useState('');
    const router = useRouter();

useEffect(()=>{
    const deliveryPartner = JSON.parse(localStorage.getItem('deliveryPartner'));
    console.log(deliveryPartner);
    if(deliveryPartner){
        router.push('/deliverydashboard');
    }

},[]);


    const loginHandle = async () => {
        let response = await fetch('http://localhost:3000/api/deliverypartners/login/',{
            method:'POST',
            body: JSON.stringify({mobile: loginMobile,password: loginPassword})
        });

        response = await response.json();
        console.log(response);
        if(response.success){
            const {result} = response;
            delete result.password;
            localStorage.setItem('deliveryPartner',JSON.stringify(result));
            router.push('/deliverydashboard');

        }
        else{
            alert('Failed to login. Please try again');
        }

    }

    const handleSignup = async () =>{
        console.log('Handle signup');
        let response = await fetch('http://localhost:3000/api/deliverypartners/signup',{
            method: 'POST',
            body: JSON.stringify({name, mobile, password, city, address})
        })
        response = await response.json();
        if(response.success){
            const {result}= response;
            delete result.password;
            localStorage.setItem('deliveryPartner',JSON.stringify(result));
            console.log(result);
            router.push('/deliverydashboard');
        }else{
            alert('failed');
        }
    }
    return (
        <div style={{textAlign:'center'}}>
            <DeliveryHeader />
            <h1>Delivery Partner</h1>
            <div className="auth-container">
                <div className="login-wrapper">
                <h3>Login</h3>
                    <div className="input-wrapper">
                        <input type="text" placeholder="Enter Your Mobile" value={loginMobile} onChange={(event) => setloginMobile(event.target.value)} className="input-field" />
                    </div>
                    <div className="input-wrapper">
                        <input type="password" placeholder="Enter Your Password" value={loginPassword} onChange={(event) => setloginPassword(event.target.value)} className="input-field" />
                    </div>
                    <div className="input-wrapper">
                        <button onClick={loginHandle} className="button">Sign In</button>
                    </div>
                </div>
                <div className="signup-wrapper">
                    <h3>Sign Up</h3>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter Name" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={mobile} onChange={(event) => setMobile(event.target.value)} placeholder="Enter Your Contact Number" />
                    </div>

                    <div className="input-wrapper">
                        <input type="password" className="input-field" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your Password" />
                    </div>

                    <div className="input-wrapper">
                        <input type="password" className="input-field" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Enter your Password Again" />
                    </div>

                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Enter Your City" />
                    </div>

                    <div className="input-wrapper">
                        <input type="text" className="input-field" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter Your Complete Address" />
                    </div>


                    <div className="input-wrapper">
                        <button onClick={handleSignup} className="button">Sign Up</button>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Page;