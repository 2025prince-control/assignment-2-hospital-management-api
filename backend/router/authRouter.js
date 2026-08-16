const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (request, response) => {
    try {
        const { username, email, password } = request.body;

        if (!username) {
            return response.status(400).json({
                message: 'Username field is required'
            });
        }

        if (!email) {
            return response.status(400).json({
                message: 'Email field is required'
            });
        }

        if (!password) {
            return response.status(400).json({
                message: 'Password field is required'
            });
        }

        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {
            return response.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            username,
            email,
            password: hashedPassword
        };

        const user = await User.create(userData);

        response.status(201).json({
            message: 'User registered successfully',
            createdUser: user
        });

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});

router.post(
    '/login',
    passport.authenticate('local'),
    (request, response) => {
        response.status(200).json({
            message: 'Login successful',
            user: request.user
        });
    }
);

module.exports = router;