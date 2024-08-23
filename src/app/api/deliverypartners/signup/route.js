import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartners";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr);
    const deliverypartner = new deliveryPartnersSchema(payload);
    const result = await deliverypartner.save();
    if(result){
        success = true;
    }
    return NextResponse.json({result,success});
}