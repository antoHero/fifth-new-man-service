import mongoose from 'mongoose';
import Joi from 'joi';

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: Joi.string().required(),
    slug: Joi.string().allow(null),
    description: Joi.string().allow(null),
    cover: Joi.string().required(),
    departments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department'
        }
    ]
},{
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);
export default Category;