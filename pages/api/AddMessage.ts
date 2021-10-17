import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body) {
    try {
      const response = await fetch(`${process.env.SERVER_API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });
      const result = await response.json();
      if (result.id) {
        res.send({ status: 200, message: "Success", data: result });
      } else {
        res.send({ status: 400, message: "Failed" });
      }
      res.send(result);
    } catch (e) {
      res.send({ status: 405, message: "Server Error", error: e });
    }
  } else {
    res.send({ status: 400, message: "Data is empty or null" });
  }
}
