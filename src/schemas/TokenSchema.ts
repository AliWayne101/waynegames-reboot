import mongoose, { Document, Schema } from "mongoose";

export interface IToken extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    gameID: mongoose.Types.ObjectId;
    validTill: string;
    claimedOn: Date;
    price: number;
    visited: boolean;
    tokenID: string;
}

const TokenSchema = new Schema<IToken>({
    _id: mongoose.Types.ObjectId,
    email: String,
    gameID: mongoose.Types.ObjectId,
    validTill: String,
    claimedOn: {
        type: Date,
        default: null
    },
    price: Number,
    visited: {
        type: Boolean,
        default: false
    },
    tokenID: String,
});

let TokenModel: mongoose.Model<IToken>;

try {
    TokenModel = mongoose.model<IToken>("TokenSchema");

} catch (error) {
    TokenModel = mongoose.model<IToken>("TokenSchema", TokenSchema, "Tokens");
}

export default TokenModel;