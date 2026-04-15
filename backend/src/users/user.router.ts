import Router from 'express';
import { createUser, logInUser, logOutUser } from './user.controller';

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@mail.ru
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 507f1f77bcf86cd799439011
 */
router.post('/users', createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@mail.ru
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ok
 */
router.post('/users/login', logInUser);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ok
 */
router.post('/users/logout', logOutUser);

export default router;
