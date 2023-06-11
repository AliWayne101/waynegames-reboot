import { modifiedJSONData } from "@/Details";
import mongoose, { Document, Schema } from "mongoose";

export interface IGame extends Document {
  name: string;
  image: string;
  genre: string;
  platform: string;
  host: string;
  price: number;
  discounted: number;
  quantity: number;
  tstamp: Date;
  gamelist: modifiedJSONData[];
  uploadedBy: string;
}

const GameSchema = new Schema<IGame>({
  _id: mongoose.Types.ObjectId,
  name: String,
  image: String,
  genre: String,
  platform: String,
  host: String,
  price: {
    type: Number,
    default: 0,
  },
  discounted: Number,
  quantity: Number,
  tstamp: {
    type: Date,
    default: Date.now,
  },
  gamelist: {
    type: [{ type: Schema.Types.Mixed }],
    default: [],
  },
  uploadedBy: String,
});

let GameModel: mongoose.Model<IGame>;

try {
  GameModel = mongoose.model<IGame>("Games");
} catch {
  GameModel = mongoose.model<IGame>("Games", GameSchema, "games");
}

export default GameModel;