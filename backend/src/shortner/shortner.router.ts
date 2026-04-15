import { Router } from 'express';
import {
  createShortUrl,
  getAllShortnerLinksByUser,
} from './shortner.controller';

const router = Router();

/**
 * @swagger
 * /shortner:
 *   post:
 *     summary: Create a new short URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://redux-toolkit.js.org/api/createAsyncThunk
 *     responses:
 *       201:
 *         description: The created short URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 507f1f77bcf86cd799439011
 *                 originalLink:
 *                   type: string
 *                   example: https://redux-toolkit.js.org/api/createAsyncThunk
 *                 shortLink:
 *                   type: string
 *                   example: https://spoo.me/FEbTx8D
 */
router.post('/shortner', createShortUrl);

/**
 * @swagger
 * /shortner:
 *   get:
 *     summary: Create a new short URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The created short URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 507f1f77bcf86cd799439011
 *                 originalLink:
 *                   type: string
 *                   example: https://redux-toolkit.js.org/api/createAsyncThunk
 *                 shortLink:
 *                   type: string
 *                   example: https://spoo.me/FEbTx8D
 */
router.get('/shortner', getAllShortnerLinksByUser);

export default router;
