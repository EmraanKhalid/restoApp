import { useRouter } from "next/navigation";
import { useState } from "react";

const ResturantSignUp = () => {
    const [email, setEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resturantName, setResturantName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const router = useRouter();
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSignup = async () => {
        // console.log(resturantName);
        // return;
        if (password !== confirmPassword) {
            setPasswordError(true);
            return false;
        }
        else {
            setPasswordError(false);
        }
        if(!email || !password || !confirmPassword || !resturantName || !city || !address || !contact)
        {
            setError(true);
            return false;
        }
        else{
            setError(false);
        }
        console.log(email, password, confirmPassword, resturantName, city, address, contact);
        let response = await fetch("http://localhost:3000/api/resturant", {
            method: "POST",
            body: JSON.stringify({ email, password, resturantName, city, address, contact })
        });
        response = await response.json();
        console.log(response);
        if (response.success) {
            const { result } = response;
            delete result.password;
            console.log(result);
            localStorage.setItem("restaurantUser", JSON.stringify(result));
            router.push("/resturant/dashboard");
        }

    }
    return (
        <>
            <h3>Sign Up Component</h3>
            <div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Your Email id" className="input-field" value={email}
                        onChange={(event) => setEmail(event.target.value)} />
                        {
                            error && !email && <span className="input-error">Email field is empty</span>
                        }
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Your Password" className="input-field" value={password}
                        onChange={(event) => SetPassword(event.target.value)} />
                {
                    passwordError && <span className="input-error">Passwrod and Confirm Password not match.</span>
                }

                {
                    error && !password && <span className="input-error">Password Field is empty</span>
                }
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Confirm Password" className="input-field" value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)} />
                {
                    passwordError && <span className="input-error">Password and Confirm Passwrod not Match.</span>
                }
                {
                    error && !confirmPassword && <span className="input-error">Confirm Password Field is empty</span>
                }                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant Name" className="input-field" value={resturantName}
                        onChange={(event) => setResturantName(event.target.value)} />
                {
                    error && !resturantName && <span className="input-error">Name Field is empty</span>
                }  
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant City" className="input-field" value={city}
                        onChange={(event) => setCity(event.target.value)} />
                {
                    error && !city && <span className="input-error">City Field is empty</span>
                }  
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant Full Address" className="input-field" value={address}
                        onChange={(event) => setAddress(event.target.value)} />
                {
                    error && !address && <span className="input-error">Address Field is empty</span>
                }  
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant Contact Number" className="input-field" value={contact}
                        onChange={(event) => setContact(event.target.value)} />
                {
                    error && !contact && <span className="input-error">Contact Field is empty</span>
                }  
                </div>
                <div className="input-wrapper">
                    <button className="button" onClick={handleSignup}>Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default ResturantSignUp;