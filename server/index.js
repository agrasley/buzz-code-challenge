const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

app.get("/feed", async (req, res) => {
  const result = await fetch(
    "https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1",
  );
  const feed = await result.json();
  res.json(feed.items);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
