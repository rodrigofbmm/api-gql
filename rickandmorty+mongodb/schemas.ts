export const typeDefs = `#graphql
    type Client {
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    DNI: String!
    bookings: [Booking!]!
  }

  type Restaurant {
    name: String!
    CIF: String!
    address: String!
    bookings: [Booking!]!
  }

  type Booking {
    date: String!
    client: String!
    restaurant: String!
  }
  type Query{
    getCliente(id: ID!): Client!
    getBooking(id: ID!): Booking!
    getRestaurante(id: ID!): Restaurant!
  }
  type Mutation{
    addRestaurante(name: String!,CIF:String!,address:String!):Restaurant!
    addCliente(firstName: String!,lastName:String!,email:String!,phoneNumber:String!,DNI:String!):Client!
    addBooking(date: String!,client:String!,restaurant:String!):Booking!
  }
`;