import flightScrapping from "lib/flightScrapping";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers } = req;

  if (
    (process.env.NODE_ENV === "development" &&
      headers.host !== "localhost:3000") ||
    (process.env.NODE_ENV === "production" &&
      !headers.host?.includes("valencassa.dev"))
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

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
