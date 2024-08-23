const { default: mongoose, mongo } = require("mongoose");

const orderModel = new mongoose.Schema({
    foodItemIds:String,
    resto_id:mongoose.Schema.Types.ObjectId,
    deliveryBoy_id:mongoose.Schema.Types.ObjectId,
    status:String,
    amount:String,
    user_id:mongoose.Schema.Types.ObjectId
})

export const orderSchema = mongoose.models.orders || mongoose.model('orders',orderModel)