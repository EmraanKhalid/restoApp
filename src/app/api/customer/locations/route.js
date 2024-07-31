import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(connectionStr);
    let result = await foodSchema.find();
    result = result.map((item)=>item.city.charAt(0).toUpperCase()+ item.city.slicy(1));
    result = [...new Set[(result.map((item)=>item))]];

    return NextResponse.json({success:true,result});
    
}