import { JSONData, modifiedJSONData } from "@/Details";
import GameModel from "@/schemas/GameSchema";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

type PostData = {
  title: string;
  image: string;
  genre: string;
  platform: string;
  host: string;
  price: string;
  discounted: string;
  quantity: string;
  gamelist: JSONData[];
};

export default function handler(_req: NextApiRequest, _res: NextApiResponse) {
    if (_req.method === "POST") {
        const postData: PostData = _req.body;
        
        const modifiedArray: modifiedJSONData[] = [];
        postData.gamelist.map((game) => {
            modifiedArray.push({
                user: game.user,
                password: game.password,
                owned: "none"
            });
        })

        const newGame = new GameModel({
            _id: new mongoose.Types.ObjectId(),
            name: postData.title,
            image: postData.image,
            genre: postData.genre,
            platform: postData.platform,
            host: postData.host,
            price: parseInt(postData.price),
            discounted: parseInt(postData.discounted),
            quantity: parseInt(postData.quantity)
        });

        
    }
}
