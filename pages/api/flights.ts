import flightScrapping from "lib/flightScrapping";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers } = req;

  if (method === "GET") {
    try {
      const data = await flightScrapping({ req, res });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
}
