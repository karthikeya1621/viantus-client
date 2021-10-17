import { NextApiRequest, NextApiResponse } from "next";
import { getPage } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query && req.query.page) {
    const pageName = req.query.page as string;

    const response = await getPage(pageName);
    res.send(response);
  } else {
    res.send({ status: 400, message: "Data is empty or null" });
  }
}
