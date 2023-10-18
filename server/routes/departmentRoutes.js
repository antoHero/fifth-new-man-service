import express from 'express';
import departmentController from '../controllers/department.js';
const router = new express.Router();

router.post('/',  departmentController.create_new_department);
router.get('/', departmentController.get_all_departments);
router.get('/:departmentId', departmentController.get_one_department);
router.patch('/:departmentId', departmentController.update_department);
router.delete('/:departmentId', departmentController.delete_department);

export default router;