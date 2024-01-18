import { GraphQLError } from "graphql";
import { restauranteModelType,RestauranteModel } from "../db/resturantes.ts";
import { ClientModelType,ClientModel } from "../db/clients.ts";
import { BookingModelType,BoookingModel } from "../db/bookings.ts";



export const Query={
    getRestaurante:async (_:unknown,args:{id:string}): Promise<restauranteModelType> =>{
        const {id}= args;
       const resturante=  await RestauranteModel.findById(id)

       if(!resturante){
        throw new GraphQLError(`No hay restaurante con este id: ${args.id}`);
       }
       return resturante;
    },
    getCliente:async (_:unknown,args:{id:string}): Promise<ClientModelType> =>{
        const {id}= args;
       const client=  await ClientModel.findById(id)

       if(!client){
        throw new GraphQLError(`No hay cliente con este id: ${args.id}`);
       }
       return client;
    },
    getBooking:async (_:unknown,args:{id:string}): Promise<BookingModelType> =>{
        const {id}= args;
       const booking=  await BoookingModel.findById(id)

       if(!booking){
        throw new GraphQLError(`No hay reserva con este id: ${args.id}`);
       }
       return booking;
    },
}