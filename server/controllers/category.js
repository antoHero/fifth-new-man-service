import Category from "../schema/category.js";
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
cloudinary.config({
    secure: true
});

class CategoryController {
    create_new_category = async function(req, res) {
        try {

            const { title, description, cover } = req.body;
            const options = {
                use_filename: false,
                unique_filename: true,
                overwrite: true,
            };
            const result = await cloudinary.uploader.upload(cover, options);
            let data = {
                _id: new mongoose.Types.ObjectId(),
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
        } catch(err) {
            console.error(err);
            res.status(500).json({message: err.message, data: null});
        }
    }

    get_all_categories = asyncHandler(async (req, res) => {
        const categories = await Category.find().populate('departments');
        res.status(200).json({message: 'Categories successfully retrieved', data: categories});
    });

    get_one_category = asyncHandler(async (req, res) => {
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId).populate('departments');
        if(!category) return res.status(404).json({message: 'Category not found'});
        res.status(200).json({message: 'Category retrieved successfully', data: category});
    });

    update_category = asyncHandler(async (req, res) => {
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
    });

    delete_category = async function(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const category = await Category.findOneAndDelete({_id: categoryId});
            if(!category) return res.status(404).json({message: 'Category not found'});
            res.send({message: 'Category deleted successfully'});
        } catch (err) {
            res.status(500).json({message: err.message, data: null});
        }
    }
}

const categoryController = new CategoryController();
export default categoryController;