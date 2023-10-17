import express from 'express';
import asyncHandler from 'express-async-handler';
import Category from '../schema/category.js';
import slugify from 'slugify';

import cloudinary from 'cloudinary';
const router = new express.Router();

cloudinary.config({
    secure: true
});


router.post('/',  asyncHandler(async(req, res) => {
    const { title, description, cover } = req.body;
        const options = {
            use_filename: false,
            unique_filename: true,
            overwrite: true,
        };
        const result = await cloudinary.uploader.upload(cover, options);
        let data = {
            title: title,
            slug: slugify(title, {
                trim: true
            }),
            description: description,
            cover: result.secure_url
        };
        const newCategory = new Category(data);
        await newCategory.save();
        res.status(201).json({message: 'Category successfully created', data: newCategory});
}));

router.get('/', asyncHandler (async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({message: 'Categories successfully retrieved', data: categories});
}));

router.get('/:categoryId', asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const category = await Category.findOne({_id: categoryId});
    if(!category) return res.status(404).json({message: 'Category not found'});
    res.status(200).json({message: 'Category retrieved successfully', data: category});
}));


router.patch('/:categoryId', asyncHandler(async (req, res) => {
    const keys = Object.keys(req.body);
    const categoryId = req.params.categoryId;
    if(req.body['cover']) {
        const options = {
            use_filename: false,
            unique_filename: true,
            overwrite: true,
        };
        const result = await cloudinary.uploader.upload(req.body.cover, options);
        req.body['cover'] = result.secure_url;
    }

    const allowedUpdates = ['title', 'description', 'cover', 'slug'];
    const isValidUpdates = keys.every((key) => allowedUpdates.includes(key));
    if(!isValidUpdates) return res.status(400).json({message: 'Invalid updates'});
    const category = await Category.findOne({_id: categoryId});
    if(!category) return res.status(404).json({message: 'Category not found'});
    keys.forEach((key) => category[key] = req.body[key]);
    await category.save();
    res.status(200).json({message: 'Category updated successfully', data: category});
}));

router.delete('/:categoryId', asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const category = await Category.findOneAndDelete({_id: categoryId});
    if(!category) return res.status(404).json({message: 'Category not found'});
    res.send({message: 'Category deleted successfully'});
}));

export default router;