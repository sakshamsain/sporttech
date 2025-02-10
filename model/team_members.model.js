import { EntitySchema } from "typeorm";
import {SPORTS_NAME} from '../utils/constant.utils.js';

const Team_Member = new EntitySchema({
  name: "team_member",
  columns: {
    mid: {
      primary: true,
      type: "int",
      generated: true,
      unique: true,
    },
    cid: {
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
      nullable:true,
    },
    noc_url: {
      type: "text",
      nullable:true
    },
  },
  relations: {
    captain: {
      target: "captain",
      type: "many-to-one",
      joinColumn: { name: "cid" },
      onDelete: "CASCADE",
    },
  },
});

export default Team_Member;
