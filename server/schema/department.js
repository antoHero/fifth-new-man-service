import mongoose from 'mongoose';
import Joi from 'joi';
// const ObjectID = mongoose.Schema.Types.ObjectId

const departmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    title: Joi.string().required(),
    slug: Joi.string().allow(null),
},{
    timestamps: true
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;