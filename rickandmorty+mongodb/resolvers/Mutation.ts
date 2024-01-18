import { ClientModelType, ClientModel } from "../db/clients.ts";
import { restauranteModelType, RestauranteModel } from "../db/resturantes.ts";
import { BookingModelType, BoookingModel } from "../db/bookings.ts";

export const Mutation={
    addRestaurante : async (_: unknown, args : {name : string , CIF: string, address:string},): Promise<restauranteModelType>=>{
        const restaurante ={
            name: args.name,
            CIF: args.CIF,
            address: args.address,
        };
        const newRestaurante = await RestauranteModel.create(restaurante);
        return newRestaurante;
    },
    addCliente: async (_: unknown, args : {firstName : string , lastName: string, email:string, phoneNumber:string, DNI:string},): Promise<ClientModelType>=>{
        const {firstName,lastName,email,phoneNumber,DNI} = args;
        const client = new ClientModel ({
            firstName,
            lastName,
            email,
            phoneNumber,
            DNI,
        });
        await client.save();
        return client;
    },
    addBooking: async (_: unknown, args : {date : string , client: string, restaurant:string},): Promise<BookingModelType>=>{
        const {date,client,restaurant} = args;
        const Booking = new BoookingModel ({
            date,
            client,
            restaurant,
        });
        await Booking.save();
        return Booking;
    },
}