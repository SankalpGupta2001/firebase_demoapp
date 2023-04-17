import express from "express"

const router = express.Router();

router.get('/posts/:id', verifyToken, (req, res) => {
    const postId = req.params.id;
    const postRef = firebase.database().ref(`posts/${postId}`);
    postRef.once('value', (snapshot) => {
      const post = snapshot.val();
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    });
  });

  router.put('/posts/:id', verifyToken, (req, res) => {
    const postId = req.params.id;
    const updatedPost = req.body;
    const postRef = firebase.database().ref(`posts/${postId}`);
    postRef.once('value', (snapshot) => {
      const post = snapshot.val();
      if (post) {
        postRef.update(updatedPost, (err) => {
          if (err) {
            res.status(500).json({ error: 'Failed to update post' });
          } else {
            res.json({ message: 'Post updated' });
          }
        });
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    });
  });

  // DELETE request to delete an existing blog post
router.delete('/posts/:id', verifyToken, (req, res) => {
    const postId = req.params.id;
    const postRef = firebase.database().ref(`posts/${postId}`);
    postRef.once('value', (snapshot) => {
      const post = snapshot.val();
      if (post) {
        postRef.remove((err) => {
          if (err) {
            res.status(500).json({ error: 'Failed to delete post' });
          } else {
            res.json({ message: 'Post deleted' });
          }
        });
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    });
  });
  // POST request to create a new blog post
router.post('/posts/:id', verifyToken, (req, res) => {
  const postId = req.params.id;
  const newPost = req.body;
  const postsRef = firebase.database().ref('posts');
  const newPostRef = postsRef.child(postId); // set the child path to the specified id
  newPostRef.set(newPost, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create post' });
    } else {
      res.json({ message: `Post created with ID ${postId}` });
    }
  });
});
export default router;
