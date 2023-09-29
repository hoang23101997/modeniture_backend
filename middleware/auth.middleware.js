/** @format */

import express from 'express';
import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if (!token) {
		return res.status(400).json({
			message: 'Token is not provided',
		});
	}
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		// console.log(decoded);
		// console.log(process.env);

		req.user = decoded;

		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			error,
		});
	}
};
