import Link from "next/link";

const CustomerHeader =()=>{
    return (
        <div className="header-wrapper">
            <div className="logo">
            <img style={{ width: 150 }} src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png" />
            </div>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>                <li>
                    <Link href="/">Login</Link>
                </li>
                <li>
                    <Link href="/">Sign Up</Link>
                </li>
                <li>
                    <Link href="/">Cart{0}</Link>
                </li>
                <li>
                    <Link href="/">Add Restaurants </Link>
                </li>
            </ul>
        </div>
    )
}

export default CustomerHeader;