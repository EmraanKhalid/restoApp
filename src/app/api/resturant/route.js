import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    
    await mongoose.connect(connectionStr,{
        serverSelectionTimeoutMS: 5000000 // Increase as needed
    });
    const data = await restaurantSchema.find();
    console.log(data);
    return NextResponse.json("Result True");
}


export async function POST(request){
    let payload = await request.json();
    let result;
    await mongoose.connect(connectionStr,{
        serverSelectionTimeoutMS: 5000000 // Increase as needed
    });
    if(payload.login){
        //login code
        result = await restaurantSchema.findOne({email:payload.email,password:payload.password});

    }
    else{
        //signup code
        let restaurant = new restaurantSchema(payload);
        result = await restaurant.save();
    }
    return NextResponse.json({result, success: true});

    
}