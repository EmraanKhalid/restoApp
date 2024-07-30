import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { foodSchema } from "@/app/lib/foodsModel";
import { NextResponse } from "next/server";

export async function GET(request, content){
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr,{
        serverSelectionTimeoutMS: 50000000 // Increase as needed
    });
    const result = await foodSchema.find({resto_id:id});
    if(result){
        success = true;
    }   
    console.log(result);
    return NextResponse.json({result,success})
}