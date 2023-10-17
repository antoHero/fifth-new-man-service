import express from 'express';
import Category from '../schema/category.js';
import slugify from 'slugify';

import cloudinary from 'cloudinary';
const router = new express.Router();

cloudinary.config({
    secure: true
});

router.post('/',  async(req, res) => {

    try {
        const options = {
            use_filename: false,
            unique_filename: true,
            overwrite: true,
        };
        const result = await cloudinary.uploader.upload(req.body.cover, options);
        console.log(result);
        let data = {
            title: req.body.title,
            slug: slugify(req.body.title, {
                trim: true
            }),
            description: req.body.description,
            cover: result.secure_url
        };
        const newCategory = new Category(data);
        await newCategory.save();
        res.status(201).send(newCategory);
    } catch(err) {
        console.error(err);
        res.status(400).json({message: err.message});
    }
});

export default router;