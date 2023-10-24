import express from 'express';
import categoryController from '../controllers/category.js';
const router = new express.Router();

router.post('/',  categoryController.create_new_category);
router.get('/', categoryController.get_all_categories);
router.get('/:categoryId', categoryController.get_one_category);
router.patch('/:categoryId', categoryController.update_category);
router.delete('/:categoryId', categoryController.delete_category);

export default router;