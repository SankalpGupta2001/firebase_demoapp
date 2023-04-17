import express from "express"

const router = express.Router();

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        const userId = firebase.auth().currentUser.uid;
        db.collection('users').doc(userId).set({ email });
        return res.status(200).json({ message: 'User created successfully' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: 'Failed to create user' });
      });
  });
  
  router.post('/login', (req, res) => {
    const { email, password } = req.body;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        const token = jwt.sign({ userId: user.uid }, 'your_jwt_secret_key');
        return res.status(200).json({ token });
      })
      .catch((err) => {
        console.error(err);
        return res.status(401).json({ message: 'Invalid credentials' });
      });
  });
  
  export default router;
