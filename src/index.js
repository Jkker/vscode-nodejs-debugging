import express from 'express';
import { promises as fs } from 'fs';

// Load Data from JSON
const posts = await fs.readFile('./data/post.json').then(JSON.parse);

console.log(`📝 Loaded ${posts.length} posts`);
console.log(`The last post is: ${posts[posts.length].title}`);

const app = express();

// Route Handlers
app.get('/', (req, res) => {
  res.send('Up and running!');
});

app.get('/posts', (req, res) => {
  const { userId } = req.query;

  if (userId === undefined) {
    res.json(posts);
    return;
  }

  const filteredPosts = posts.filter((post) => post.userId === userId);
  res.json(filteredPosts);
});

// Start Server
const port = parseInt(process.env.PORT) ?? 3000;

app.listen(port, () => console.log(`✅ Server started on port ${port}`));
