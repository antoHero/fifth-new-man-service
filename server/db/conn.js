import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongoDBURi = process.env.ATLAS_URI || '';

mongoose.connect(mongoDBURi, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Successfully connected to Atlas');
})