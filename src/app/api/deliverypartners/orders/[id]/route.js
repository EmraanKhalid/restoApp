import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    
    const deliveryBoy_id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr);
    let result = await orderSchema.find({deliveryBoy_id: deliveryBoy_id});
    if(result){
        let restoData = await Promise.all(
            result.map(async (item)=>{
                console.log(item.user_id);
                let restoInfo = {};
                let customerInfo = {};
                restoInfo.data = await restaurantSchema.findOne({_id: item.resto_id});
                customerInfo.data = await userSchema.findOne({_id: item.user_id});
                restoInfo.amount = item.amount;
                restoInfo.status = item.status;
                return {restoInfo,customerInfo};
            })
        );
        result = restoData;
        success = true;
    }

    return NextResponse.json({result,success});

}