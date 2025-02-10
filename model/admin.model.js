import { EntitySchema } from "typeorm";

const Admin = new EntitySchema({
  name: "admin",
  columns: {
    adId: {
        primary: true,
        type: "int",
        generated: true,    
        unique: true,    
      }, 
      email: {
        type: "varchar",
        length: 255,
      },
      mobile_number: {
        type: "varchar",
        length: 15,
      },
      name: {
        type: "varchar",
        length: 255,
      },
      password: {
        type: "varchar",
        length: 255,
      },
  }})

export default Admin;