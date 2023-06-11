import { gameProfileData, modifiedJSONData } from "@/Details";
import Connect from "@/connect";
import GameModel from "@/schemas/GameSchema";
import { NextApiRequest, NextApiResponse } from "next";

type PostData = {
  reqType: string;
}

type getUser = {
    reqType: string;
    targetMail: string;
}

export default async function handler(_req: NextApiRequest, _res: NextApiResponse) {
    if (_req.method === "POST") {
        const postData: PostData = _req.body;
        await Connect();
        if (postData.reqType === "GETGAMES") {
            GameModel
            .find({
                quantity: { $gt: 0 }
            })
            .sort({ tStamp: -1} )
            .exec()
            .then((docs) => {
                _res.status(200).json({
                    exists: true,
                    gamelist: docs,
                });
            })
            .catch((err) => {
                _res.status(200).json({
                    exists: false,
                    err: err
                });
            })
        } else if (postData.reqType === "DISCOUNTEDGAME") {
            GameModel
            .find({
                discounted: { $ne: 0 }
            })
            .sort({
                tStamp: -1
            })
            .exec()
            .then((docs) => {
                if (docs.length > 0) {
                    var randomNumber = 0;
                    if (docs.length > 1)
                        randomNumber = Math.floor(Math.random() * (docs.length));

                    const selectedGame = docs[randomNumber];
                    _res.status(200).json({
                        exists: true,
                        gamelist: selectedGame,
                    });
                } else {
                    _res.status(200).json({
                        exists: false,
                        gamelist: null
                    });
                }
            })
            .catch((err) => {
                _res.status(200).json({
                    exists: false,
                    err: err
                });
            })
        } else if (postData.reqType === "GETUSERGAMES") {
            const reqBody: getUser = _req.body;
            
            const Games = await GameModel.find({
                "gamelist.owned": reqBody.targetMail
            }).select("name image gamelist");

            const gameData: gameProfileData[] = [];
            Games.forEach((game) => {
                const targetedUser = game.gamelist.find(( { owned } ) => owned === reqBody.targetMail);
                gameData.push({
                    title: game.name,
                    image: game.image,
                    owned: targetedUser ? targetedUser : { user: "", password: "", owned: "" }
                });
            });

            _res.status(200).json({
                exists: true,
                docs: gameData
            });
        }
    }
}