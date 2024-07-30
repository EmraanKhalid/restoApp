"use client"
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ResturantHeader = () => {
    const [details, setDetails] = useState();
    const router = useRouter();
    const pathName = usePathname();
    useEffect(() => {
        let data = localStorage.getItem("restaurantUser");
        if (!data) {
            router.push("/resturant");
        }
        else if (data && pathName == "/resturant") {
            router.push("/resturant/dashboard");
        }
        else {
            setDetails(JSON.parse(data));
        }
    },[]);
    const logout = () => {
        localStorage.removeItem("restaurantUser");
        router.push("/resturant");
    }
    // console.log(details);
    return (
        <div className="header-wrapper">
            <div className="logo">
                <img style={{ width: 100 }} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" />
            </div>
            <ul>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                {
                    details && details.resturantName ?
                        <>
                            <button className="logout-button" onClick={logout}>Logout</button>
                            <li><Link href={"/"}>Profile</Link></li>
                        </>
                        :
                        <li>
                            <Link href={"/"}>Login/SignUp</Link>
                        </li>
                }

            </ul>
        </div>
    )
}

export default ResturantHeader;