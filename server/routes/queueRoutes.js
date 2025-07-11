import express from 'express';
const router = express.Router();

// Example test route
router.get('/', (req, res) => {
    res.send('Queue API is working!');
});

export default router;
