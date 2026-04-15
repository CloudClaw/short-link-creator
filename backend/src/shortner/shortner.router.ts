import { Router } from 'express';
import {
  createShortUrl,
  getAllShortnerLinksByUser,
  removeShortLink,
  updateShortLink,
} from './shortner.controller';

const router = Router();

/**
 * @swagger
 * /shortner:
 *   post:
 *     summary: Create a new short URL
 *     tags:
 *       - Shortner CRUD
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
 *     summary: Get all short URL
 *     tags:
 *       - Shortner CRUD
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

/**
 * @swagger
 * /shortner/{id}:
 *   patch:
 *     summary: Update short URL
 *     tags:
 *       - Shortner CRUD
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       200:
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
router.patch('/shortner/:id', updateShortLink);

/**
 * @swagger
 * /shortner/{id}:
 *   delete:
 *     summary: Remove short URL
 *     tags:
 *       - Shortner CRUD
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The created short URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 507f1f77bcf86cd799439011
 *                 message:
 *                   type: string
 *                   example: ok
 */
router.delete('/shortner/:id', removeShortLink);

export default router;
