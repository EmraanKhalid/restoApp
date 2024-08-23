import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr);
    const result = await userSchema.findOne({email: payload.email,password:payload.password});
    console.log(result.name);
    if(result){
        success=true;
    }
    return NextResponse.json({result,success});
}