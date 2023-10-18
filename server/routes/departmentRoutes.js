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

export default router;