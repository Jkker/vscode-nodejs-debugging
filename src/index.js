import express from "express";
import { promises as fs } from "fs";

const posts = await fs.readFile("./data/post.json").then(JSON.parse);

const app = express();

app.get("/", (req, res) => {
  res.send("Up and running!");
});

app.get("/posts", (req, res) => {
  const { userId } = req.query;

  if (userId === undefined) {
    res.json(posts);
    return;
  }

  const filteredPosts = posts.filter((post) => post.userId === userId);
  res.json(filteredPosts);
});

const PORT = process.env.PORT || 3000;

await app.listen(PORT);
console.log(`Server running on port ${PORT}`);
