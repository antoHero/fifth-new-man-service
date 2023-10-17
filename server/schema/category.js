import mongoose from 'mongoose';
import joi from 'joi';

const categorySchema = new mongoose.Schema({
    title: joi.string().required(),
    slug: joi.string().nullable(),
    description: joi.string().nullable(),
    cover: joi.string().required()
},{
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;