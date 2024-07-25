"use client"
import { useState } from "react";
import ResturantHeader from "../_components/ResturantHeader";
import ResturantLogin from "../_components/resturantLogin";
import ResturantSignUp from "../_components/resturantSignUp";
import Footer from "../_components/Footer";
import './style.css';

const Resturant = () => {
    const [login, setLogin] = useState(true);
    return (
        <>
            <div className="container">
        <ResturantHeader/>
                <h1>Resturant Login/SignUp Page</h1>
                {
                    login ? <ResturantLogin /> : <ResturantSignUp />
                }
                <div>
                    <button className="button-link" onClick={() => { setLogin(!login) }}>
                        {login ? "Don't have account? SignUp" : "Already have Account? Login now!"}
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default Resturant;