const { default: mongoose } = require("mongoose");


const restaurantModel = new mongoose.Schema({
    resturantName:String,
    email:String,
    password:String,
    city:String,
    address:String,
    contace:String,

})


export const restaurantSchema = mongoose.models.resturants || mongoose.model("resturants",restaurantModel);