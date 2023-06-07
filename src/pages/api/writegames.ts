import { modifiedJSONData, JSONData } from "@/Details";
import Connect from "@/connect";
import GameModel from "@/schemas/GameSchema";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

type postData = {
  title: string;
  image: string;
  genre: string;
  platform: string;
  host: string;
  price: number;
  discounted: number;
  quantity: number;
  gameData: JSONData[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const PostData: postData = req.body;

    const modifiedArray: modifiedJSONData[] = [];
    PostData.gameData.map((game) => {
      modifiedArray.push({
        user: game.user,
        password: game.password,
        owned: "none",
      });
    });

    const newGame = new GameModel({
      _id: new mongoose.Types.ObjectId(),
      name: PostData.title,
      image: PostData.image,
      genre: PostData.genre,
      platform: PostData.platform,
      host: PostData.host,
      price: PostData.price,
      discounted: PostData.discounted,
      quantity: PostData.quantity,
      gamelist: modifiedArray,
    });

    await Connect();
    newGame
      .save()
      .then((response) => {
        res.status(200).json({ created: true });
      })
      .catch((err) => {
        res.status(200).json({ "Error: ": err });
      });
  } else {
    res.status(200).json({ result: "NOT_ALLOWED" });
  }
}
