import { EntitySchema } from "typeorm";

const User = new EntitySchema({
  name: "user",
  columns: {
    uid: {
      primary: true,
      type: "int",
      generated: true,
      unique: true,
    },
    name: {
      type: "varchar",
      length: 255,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    mobile_number: {
      type: "varchar",
      length: 15,
      unique: true,
    },
    college_name: {
      type: "varchar",
      length: 255,
    },
    category: {
      type: "enum",
      enum: ["Contingent", "Team", "Individual"],
      default: "Individual",
    },
    total_bill_amount: {
      type: "int",
      default: 0,
    },
    receipt_photo: {
      type: "varchar",
      nullable: true,
    },
    payment_verification_status: {
      type: "enum",
      enum: ["None", "Pending", "Verified"],
      default: "None",
    },
    message_by_admin: {
      type: "varchar",
      nullable: true,
    },
  },
  relations: {
    captain: {
      target: "captain",
      type: "one-to-many",
      inverseSide: "user",
      joinColumn: { name: "uid" },
      onDelete: "CASCADE",
    },
  },
});

export default User;
