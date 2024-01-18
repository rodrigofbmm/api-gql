import mongoose from "npm:mongoose@7.6.5";
import { restaurante } from "../types.ts";
import { BoookingModel } from "./bookings.ts";
import { ClientModel } from "./clients.ts"; 
const CIFRegex=/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
const Schema = mongoose.Schema;

const restauranteSchema = new Schema(
  {
    name: { type: String, required: true,unique:true },
    CIF: { type: String, required: true,unique:true},
    address: { type: String, required: true},
    bookings: [{type:Schema.Types.ObjectId, required: true, ref:"bookings"},
    ],
  },
  { timestamps: true }
);
 /* restauranteSchema
    .path("CIF")
    .validate(function (CIF:string) {
        try{
            if(!CIFRegex.test(CIF)) return false;
        }catch(Error){
         throw new Error("El CIF no coiincide con el formato");
        }
        
    });
 restauranteSchema
    .post('findOneAndDelete', async function (doc:restauranteModelType) {
      for (let index = 0; index < doc.bookings.length; index++) {
        const borrador= await BoookingModel.findById(doc.bookings[index])
        const borradorclient= await ClientModel.findById(borrador?.client)
    
       let bookings= borradorclient?.bookings;
       if (bookings) {
        const indexToDelete = bookings.indexOf(doc.bookings[index]);
      
        if (indexToDelete !== -1) {
          bookings.splice(indexToDelete, 1);
        }
      }
        await RestauranteModel.findByIdAndUpdate(borrador?.client,{bookings},{new:true})
        await BoookingModel.findByIdAndDelete(doc.bookings[index])
        
      }
    })*/
export type restauranteModelType = mongoose.Document &
  Omit<restaurante, "bookings">&{
    bookings:Array<mongoose.Types.ObjectId>
  };

export const RestauranteModel = mongoose.model<restauranteModelType>(
  "restaurantes",
  restauranteSchema
);