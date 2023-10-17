import express from 'express';
import Category from '../schema/category';

const router = new express.Router()

router.post('/categories', async(req, res) => {
    try {
        const newCategory = new Category({
            ...req.body
        });
        await newCategory.save();
        res.status(201).send(newCategory);
    } catch(err) {
        console.error(err);
    }
});
