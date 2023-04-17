import express from "express"
const router = express.Router();

router.get('/posts', validateToken, (req, res) => {
    const postsRef = db.collection('posts');
    postsRef.get()
      .then((snapshot) => {
        const posts = [];
        snapshot.forEach((doc) => {
          const post = {
            id: doc.id,
            ...doc.data()
          };
          posts.push(post);
        });
        return res.status(200).json(posts);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: 'Failed to retrieve posts' });
      });
  });
  

  router.post('/posts', validateToken, (req, res) => {
    const { title, content } = req.body;
    const newPostRef = db.collection('posts').doc();
    newPostRef.set({ title, content })
      .then(() => {
        const newPost = { id: newPostRef.id, title, content };
        return res.status(200).json(newPost);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: 'Failed to create post' });
      });
  });
  export default router;

