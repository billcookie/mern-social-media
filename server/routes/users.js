import express from 'express';
import { signin } from '../controllers/user.js';
import { } from '../controllers/posts.js';

const router = express.Router();

router.post('/signin', signin)
router.post('/signin', signup)

export default router;
