import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongoDBURi = process.env.ATLAS_URI || '';

mongoose.connect(mongoDBURi);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Successfully connected to Atlas');
})