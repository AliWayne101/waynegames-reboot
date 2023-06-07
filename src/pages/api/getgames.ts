import Connect from "@/connect";
import GameModel from "@/schemas/GameSchema";
import { NextApiRequest, NextApiResponse } from "next";

type PostData = {
  reqType: string;
}

export default async function handler(_req: NextApiRequest, _res: NextApiResponse) {
    if (_req.method === "POST") {
        const postData: PostData = _req.body;
        await Connect();
        if (postData.reqType === "GETGAMES") {
            GameModel
            .find({})
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
            .limit(1)
            .exec()
            .then((docs) => {
                if (docs.length > 0) {
                    _res.status(200).json({
                        exists: true,
                        gamelist: docs[0],
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
        }
    }
}
