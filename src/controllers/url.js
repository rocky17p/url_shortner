import { nanoid } from "nanoid";
import Url from "../models/url.js";

async function handlegenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ status: "url is required" });
  }
  const shortID = nanoid(8);
  await Url.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.status(201).json({
    shortID,
    shortUrl: `${req.protocol}://${req.get("host")}/${shortID}`,
  });
}

async function handleall(req, res) {
  const shortID = req.params.shortID;

  const entry = await Url.findOneAndUpdate(
    { shortID },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(entry.redirectURL);
}

async function handlegetanalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await Url.findOne({ shortID });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleListUrls(req, res) {
  const urls = await Url.find({}).sort({ createdAt: -1 });
  return res.json(urls);
}

export {
  handlegenerateNewShortURL,
  handleall,
  handlegetanalytics,
  handleListUrls,
};
