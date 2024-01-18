import mongoose from "npm:mongoose@7.6.5";
import { booking } from "../types.ts";
import { ClientModel } from "./clients.ts";
import { RestauranteModel } from "./resturantes.ts";
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    date: { type: Date, default:Date()},
    client: {type:Schema.Types.ObjectId, required: true, ref:"clients"},
    restaurant: {type:Schema.Types.ObjectId, required: true, ref:"restaurantes"},

  },
  { timestamps: true }
);
bookingSchema
.post('save', async function(doc:BookingModelType) {
const cliente=  await ClientModel.findById(doc.client)
cliente?.bookings.push(doc._id)
 await ClientModel.findByIdAndUpdate(doc.client,{bookings:cliente?.bookings}).exec();
const resturante= await RestauranteModel.findById(doc.restaurant)
resturante?.bookings.push(doc._id)
await RestauranteModel.findByIdAndUpdate(doc.restaurant,{bookings:resturante?.bookings}).exec();

}); 
bookingSchema
.path("client")
.validate( async function (client:string) {
    try{
        const cliente=  await ClientModel.findById(client)

        if(!cliente) return false;
    }catch(Error){
     throw new Error("El cliente no existe");
    }
    
});
bookingSchema
.path("restaurant")
.validate( async function (restaurant:string) {
    try{
        const restaurante=  await RestauranteModel.findById(restaurant)

        if(!restaurante) return false;
    }catch(Error){
     throw new Error("El restaurante no existe");
    }
    
});
bookingSchema
.path("date")
.validate(async function(value:Date){
  try{
    const bookingexistente=  await BoookingModel.findOne({
      date:value,
      client:this.client,
      restaurant:this.restaurant
    })
    if(bookingexistente)return false;
}catch(Error){
 throw new Error("Este booking ya existe");
}

});
bookingSchema
.pre('findOne',  function () {

  this.populate('client', 'firstName lastName  phoneNumber DNI'); // Rellenar los detalles del cliente
  this.populate('restaurant', 'name address '); // Rellenar los detalles del restaurante

  
});
bookingSchema
.post('findOneAndDelete', async function (doc:BookingModelType) {
  const clienteborr= await ClientModel.findById(doc.client)
  const restaurantborr=await RestauranteModel.findById(doc.restaurant)
   let bookings= clienteborr?.bookings;
   if (bookings) {
    const indexToDelete = bookings.indexOf(doc._id);
  
    if (indexToDelete !== -1) {
      bookings.splice(indexToDelete, 1);
    }
  }

    await ClientModel.findByIdAndUpdate(doc.client,{bookings},{new:true})

  

  
    bookings= restaurantborr?.bookings;
    if (bookings) {
     const indexToDelete = bookings.indexOf(doc._id);
   
     if (indexToDelete !== -1) {
       bookings.splice(indexToDelete, 1);
     }
   }

     await RestauranteModel.findByIdAndUpdate(doc.restaurant,{bookings},{new:true})
     
   
  
})


export type BookingModelType = mongoose.Document &
  Omit<booking, "client"|"restaurant">&{
    client:mongoose.Types.ObjectId;
    restaurant:mongoose.Types.ObjectId;

  };

export const BoookingModel = mongoose.model<BookingModelType>(
  "bookings",
  bookingSchema
);




