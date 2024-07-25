const ResturantSignUp = ()=>{
    return(
        <>
            <h3>Sign Up Component</h3>
            <div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Your Email id" className="input-field" />
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Enter Your Password" className="input-field" />
                </div>
                <div className="input-wrapper">
                    <input type="password" placeholder="Confirm Password" className="input-field" />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant Name" className="input-field" />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant City" className="input-field" />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant Full Address" className="input-field" />
                </div>
                <div className="input-wrapper">
                    <input type="text" placeholder="Enter Resturant Contact Number" className="input-field" />
                </div>
                <div className="input-wrapper">
                    <button className="button">Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default ResturantSignUp;