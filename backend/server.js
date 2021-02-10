import express from "express";
import dotenv from "dotenv";
import { google } from "googleapis";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/search", async (req, res) => {
  let myQ = "";
  let result = [];
  let nextPageToken = "";
  let prevPageToken = "";
  let myPageToken = "";
  let myOrder = "data";

  const { q, pageToken, order } = req.headers;

  myPageToken = pageToken !== undefined ? pageToken : myPageToken;
  myQ = q !== undefined ? q : myQ;
  myOrder =
    order !== undefined ? (order.trim() == "" ? "date" : order) : "date";

  try {
    const { data } = await google.youtube("v3").search.list({
      key: process.env.api_key,
      part: "snippet",
      maxResults: 12,
      q: myQ, 
      type: "video", 
      order: myOrder,
      channelId: "UCmtyQOKKmrMVaKuRXz02jbQ",
      pageToken: myPageToken,
    });

    data.items.forEach((video) => {
      result.push({
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.medium,
        videoId: video.id.videoId,
      });
    });

    nextPageToken = data.nextPageToken !== undefined ? data.nextPageToken : "";
    prevPageToken = data.prevPageToken !== undefined ? data.prevPageToken : "";

    res.send({
      error: false,
      result,
      nextPageToken,
      prevPageToken,
    });

  } catch (error) {

    res.status(403).send({
      error: true,
      result: [],
      
    });

  }
});

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server running on port 8000");
});
