import Department from "../schema/department.js";
import asyncHandler from 'express-async-handler';
import slugify from 'slugify';

class DepartmentController {
    get_all_departments = asyncHandler(async (req, res) => {
        const departments = await Department.find();
        res.status(200).json({message: 'Departments successfully retrieved', data: departments});
    })

    create_new_department = asyncHandler(async (req, res) => {
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
    });

    get_one_department = asyncHandler(async (req, res) => {
        const department = await Department.findOne({_id: req.params.departmentId});
        if(!department) res.status(404).json({message: 'Department not found', data: null});
        res.status(200).json({message: 'Department successfully retrieved', data: department})
    });

    update_department = asyncHandler(async (req, res) => {
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
    });

    delete_department = asyncHandler(async (req, res) => {
        const department = await Department.findByIdAndDelete(req.params.departmentId);
        if(!department) res.status(404).json({message: 'Department not found', data: null});
        res.send({message: 'Department deleted successfully'});
    });
}

const departmentController = new DepartmentController();
export default departmentController;