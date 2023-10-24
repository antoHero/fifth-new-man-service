import Category from "../schema/category.js";
import asyncHandler from 'express-async-handler';

class CategoryController {
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
}

const categoryController = new CategoryController();
export default categoryController;