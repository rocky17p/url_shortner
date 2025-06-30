const { nanoid } = require("nanoid");
const Url = require("../models/url");

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
  return res.render("home", { id: shortID });
}
async function handleall(req, res) {
  const shortID = req.params.shortID;
  const entry = await Url.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );  
  res.redirect(entry.redirectURL);
}
async function handlegetanalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await Url.findOne({ shortID });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handlegenerateNewShortURL,
  handleall,
  handlegetanalytics,
};
