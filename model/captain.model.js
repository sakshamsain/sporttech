import { EntitySchema } from "typeorm";
import {SPORTS_NAME} from '../utils/constant.utils.js';

const Captain = new EntitySchema({
  name: "captain",
  columns: {
    cid: {
      primary: true,
      type: "int",
      generated: true,
      unique: true,
    },
    uid: {
      type: "int",
      nullable: false,
    },
    name: {
      type: "varchar",
      length: 255,
    },
    gender:{
      type: "enum",
      enum: ["M", "F"], 
    },
    email: {
      type: "varchar",
      length: 255,
    },
    mobile_number: {
      type: "varchar",
      length: 15,
    },
    entry_no: {
      type: "varchar",
      length: 255,
    },
    sport: {
      type: "enum",
      enum: SPORTS_NAME,
    },
    id_url: {
      type: "text",
      nullable: true,
    },
    noc_url: {
      type: "text",
      nullable: true,
    },
    registration_status: {
      type: "enum",
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  relations: {
    user: {
      target: "user",
      type: "many-to-one",
      joinColumn: { name: "uid" },
      onDelete: "CASCADE",
    },
    team_members: {
      target: "team_member",
      type: "one-to-many",
      inverseSide: "captain",
      cascade: true,
    },
  },
});

export default Captain;
