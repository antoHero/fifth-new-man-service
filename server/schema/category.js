import mongoose from 'mongoose';
import Joi from 'joi';

const categorySchema = new mongoose.Schema({
    title: Joi.string().required(),
    slug: Joi.string().allow(null),
    description: Joi.string().allow(null),
    cover: Joi.string().required()
},{
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);
export default Category;