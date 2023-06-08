import { generateID } from "@/Details";
import Connect from "@/connect";
import GameModel from "@/schemas/GameSchema";
import TokenModel from "@/schemas/TokenSchema";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

interface postData {
  reqType: string;
  email: string;
  title: string;
}

interface verifyGame {
    gameID: string;
    email: string;
    reqType: string;
    token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const PostData: postData = req.body;
    await Connect();
    if (PostData.reqType === "GENTOKEN") {
      const Games = await GameModel.find({ name: PostData.title });

      const ValidTill = new Date();
      ValidTill.setHours(ValidTill.getHours() + 4);
      if (Games.length > 0) {
        const tokenID = generateID(16);
        const Token = new TokenModel({
          _id: new mongoose.Types.ObjectId(),
          email: PostData.email,
          gameID: Games[0]._id,
          validTill: ValidTill.toISOString(),
          price:
            Games[0].discounted !== 0 ? Games[0].discounted : Games[0].price,
          tokenID: tokenID,
        });
        const savedDocument = await Token.save();
        res.status(200).json({ created: true, doc: savedDocument });
      } else {
        res.status(200).json({ created: false, name: PostData.title });
      }
    } else if (PostData.reqType === "ACTIVATE") {
        const inData: verifyGame = req.body;
        const Game = await GameModel.findOneAndUpdate(
            { _id: inData.gameID, 'gamelist.owned': 'none' },
            { $set: { 'gamelist.$.owned': inData.email }, $inc: { quantity: -1 }},
            { new: true }
        );

        if (!Game) {
            res.status(200).json({ updated: false, err: "NO_ENTRIES" });
            return;
        }
        
        const updatedGame = Game.gamelist.find((game) => game.owned === inData.email)
        res.status(200).json({ updated: true, doc: updatedGame, title: Game.name});
    }
  }
}
