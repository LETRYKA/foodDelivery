import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_EXPIRES_IN, TOKEN_SECRET } from "../../../config/env.js";
import User from "../../models/user_schema.js";

export const signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			const error = new Error('User not found')
			error.statusCode = 404;
			throw error;
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			const error = new Error('Password is not valid')
			error.statusCode = 401;
			throw error;
		}

		const token = jwt.sign(
			{ userId: user._id },
			TOKEN_SECRET,
			{ expiresIn: '2h' }
		);


		res.status(200).json({
			success: true,
			message: 'Successfully logged in',
			data: {
				token,
				user
			}
		});

	}
	catch (err) {
		next(err)
	}
};
