import mongoose from "npm:mongoose@7.6.5";
import { client } from "../types.ts";
import { BoookingModel } from "./bookings.ts";
import { RestauranteModel } from "./resturantes.ts";
const  emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex=/^(\+?34)?(6\d{2}|7[1-9]\d{1})\d{6}$/;
const DNIregex = /^[0-9]{8}[A-Z]{1}$/;
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true},
    email: { type: String, required: true,unique:true},
    phoneNumber: { type: String, required: true,unique:true},
    DNI: { type: String, required: true,unique:true},
    bookings: [{type:Schema.Types.ObjectId, required: true, ref:"bookings"},
    ],
  },
  { timestamps: true }
);
clientSchema
.path("email")
.validate( function (email:string) {
    try{
        if(!emailRegex.test(email)) return false;
    }catch(Error){
     throw new Error("El email no coiincide con el formato");
    }
    
});
clientSchema
.path("phoneNumber")
.validate( function (phoneNumber:string) {
    try{
        if(!phoneRegex.test(phoneNumber)) return false;
    }catch(Error){
     throw new Error("El numero de telefono no coiincide con el formato");
    }
    
});
clientSchema
.path("DNI")
.validate( function (DNI:string) {
    try{
        if(!DNIregex.test(DNI)) return false;
    }catch(Error){
     throw new Error("El DNI no coiincide con el formato");
    }
    
});
clientSchema
.post('findOneAndDelete', async function (doc:ClientModelType) {
  for (let index = 0; index < doc.bookings.length; index++) {
    const borrador= await BoookingModel.findById(doc.bookings[index])
    const borradorderest= await RestauranteModel.findById(borrador?.restaurant)

   let bookings= borradorderest?.bookings;
   if (bookings) {
    const indexToDelete = bookings.indexOf(doc.bookings[index]);
  
    if (indexToDelete !== -1) {
      bookings.splice(indexToDelete, 1);
    }
  }
    await RestauranteModel.findByIdAndUpdate(borrador?.restaurant,{bookings},{new:true})
    await BoookingModel.findByIdAndDelete(doc.bookings[index])
    
  }
})
export type ClientModelType = mongoose.Document &
  Omit<client, "bookings">&{
    bookings:Array<mongoose.Types.ObjectId>
  };

export const ClientModel = mongoose.model<ClientModelType>(
  "clients",
  clientSchema
);