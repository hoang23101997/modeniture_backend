/** @format */

import express from 'express';
import { posts } from '../data/mockData.js';
import {ObjectId} from "mongodb"
import { authMiddleware } from '../middleware/auth.middleware.js';
const profileRouter = express.Router();
profileRouter.put('/:id', async (req, res) => {
	const id = req.params.id
	const {email} = req.body
	await db.students.updateOne({
		_id: new ObjectId(id)
	}, {
		$set: {
			email: email
		},
		$push: {
			hobbies: {$each: moreHobbies}
		}
	})
	res.send("Updated")
})
// update profile

// delete account

// add new

export default profileRouter;
