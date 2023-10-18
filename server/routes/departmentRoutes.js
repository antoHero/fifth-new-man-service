import express from 'express';
import asyncHandler from 'express-async-handler';
import Department from '../schema/department.js';
import slugify from 'slugify';

const router = new express.Router();

router.post('/',  asyncHandler(async(req, res) => {
    const { title } = req.body;
        let data = {
            title: title,
            slug: slugify(title, {
                trim: true
            }),
        };
        const newDepartment = new Department(data);
        await newDepartment.save();
        res.status(201).json({message: 'Department successfully created', data: newDepartment});
}));

router.get('/', asyncHandler(async(req, res) => {
    const departments = await Department.find();
    res.status(200).json({message: 'Departments successfully retrieved', data: departments});
}));

router.get('/:departmentId', asyncHandler(async(req, res) => {
    const department = await Department.findOne({_id: req.params.departmentId});
    if(!department) res.status(404).json({message: 'Department not found', data: null});
    res.status(200).json({message: 'Department successfully retrieved', data: department})
}));

router.patch('/:departmentId', asyncHandler(async(req, res) => {
    const keys = Object.keys(req.body);
    const { title } = req.body
    const allowedUpdates = ['title', 'slug'];
    const isValidUpdates = keys.every((key) => allowedUpdates.includes(key));
    if(!isValidUpdates) return res.status(400).json({message: 'Invalid updates'});
    const department = await Department.findById(req.params.departmentId);
    department.title = title;
    department.slug = slugify(title, {
        trim: true
    });
    await department.save();
    res.status(200).json({message: 'Department updated successfully', data: department});
}));

router.delete('/:departmentId', asyncHandler(async (req, res) => {
    const department = await Department.findByIdAndDelete(req.params.departmentId);
    if(!department) res.status(404).json({message: 'Department not found', data: null});
    res.send({message: 'Department deleted successfully'});
}));

export default router;