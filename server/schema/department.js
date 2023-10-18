import mongoose from 'mongoose';
import Joi from 'joi';

const departmentSchema = new mongoose.Schema({
    title: Joi.string().required(),
    slug: Joi.string().allow(null),
},{
    timestamps: true
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;