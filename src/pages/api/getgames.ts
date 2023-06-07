import Connect from "@/connect";
import GameModel from "@/schemas/GameSchema";
import { NextApiRequest, NextApiResponse } from "next";

type PostData = {
  reqType: string;
}

export default async function handler(_req: NextApiRequest, _res: NextApiResponse) {
    if (_req.method === "POST") {
        const postData: PostData = _req.body;
        
        if (postData.reqType === "GETGAMES") {
            await Connect();
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
        }
    }
}
