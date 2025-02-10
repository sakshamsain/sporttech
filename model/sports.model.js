import { EntitySchema } from "typeorm";
import {SPORTS_NAME} from '../utils/constant.utils.js';

const Sports = new EntitySchema({
  name: "sports",
  columns: {
    sid: {
      primary: true,
      type: "int",
      generated: true,
      unique: true,
    },
    name: {
      type: "enum",
      enum: SPORTS_NAME,
    },
    category: {
      type: "char",
      length: 1,
      enum: ["M", "F","B"], // M for male, F for female
    },
    min_players: {
      type: "int",
      default: 0,
    },
    max_players: {
      type: "int",
      default: 1,
    },
    registration_fee: { 
      type: "int",
      default: 0,
    },
    fee_type: {
      type: "char",
      length: 1,
      enum: ["F", "P"], // F for full team, P for per player
    },
  },
});

export default Sports;
