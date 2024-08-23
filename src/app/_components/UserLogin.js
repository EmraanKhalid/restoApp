import { useRouter } from "next/navigation";
import { useState } from "react";

const UserLogin = (props) =>{
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const router = useRouter();
    const loginHandle = async () =>{
        let response = await fetch("http://localhost:3000/api/user/login",{
            method: 'POST',
            body: JSON.stringify({email,password})
        })
        response = await response.json();
        if(response.success){
            const {result} = response;
            delete result.password;
            localStorage.setItem('user',JSON.stringify(result));
            if(props.redirect){
                router.push('/order');
            }
            else{
                router.push('/')
            }
        }
    }
    return(
        <div>
            <div className="input-wrapper">
                <input type="text" placeholder="Enter Your Email" value={email} onChange={(event)=>setEmail(event.target.value)} className="input-field"/>
            </div>
            <div className="input-wrapper">
                <input type="password" placeholder="Enter Your Password" value={password} onChange={(event)=>setPassword(event.target.value)} className="input-field"/>
            </div>
            <div className="input-wrapper">
                <button onClick={loginHandle} className="button">Sign In</button>
            </div>
        </div>
    )
}

export default UserLogin;