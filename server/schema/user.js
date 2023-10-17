import mongoose from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String,
        trim: true,
        lowercase: true
    },
    lastname: {
        required: true,
        type: String,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate( value ) {
           if( !validator.isEmail( value )) {
                throw new Error(`Invalid email`)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
        validate(value) {
            if( value.toLowerCase().includes('password')) {
                throw new Error("password musn\’t contain password")
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    timestamps: true
});

const User = mongoose.model('User', userSchema)
module.exports = User