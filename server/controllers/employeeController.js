const Employee = require('../models/Employee');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAll();
    res.json(employees);
  } catch (error) {
    console.error('Get All Employees Error:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.getById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Get Employee By ID Error:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    // Log for debugging
    console.log('Body:', req.body);
    console.log('File:', req.file);

    // Destructure fields from req.body
    const {
      title,
      firstName,
      lastName,
      email,
      role,
      password,
      hobbies,
      gender,
    } = req.body;

    // Validate required fields
    if (!title || !firstName || !lastName || !email || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Handle profile picture
    const profilePicPath = req.file ? req.file.path : null;

    // Create employee object (match database column names)
    const employeeData = {
      title,
      first_name: firstName,
      last_name: lastName,
      email,
      role,
      password: password || null, // Store plain text password or null if not provided
      hobbies: hobbies || null,
      gender: gender || null,
      profile_pic: profilePicPath,
    };

    // Log employeeData for debugging
    console.log('Employee Data:', employeeData);

    // Save to database
    const employeeId = await Employee.create(employeeData);

    res.status(201).json({ id: employeeId });
  } catch (error) {
    console.error('Create Employee Error:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    // Log for debugging
    console.log('Body:', req.body);
    console.log('File:', req.file);

    // Destructure fields from req.body
    const {
      title,
      firstName,
      lastName,
      email,
      role,
      password,
      hobbies,
      gender,
    } = req.body;

    // Validate required fields
    if (!title || !firstName || !lastName || !email || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Handle profile picture
    const profilePicPath = req.file ? req.file.path : undefined;

    // Create update object
    const employeeData = {
      title,
      first_name: firstName,
      last_name: lastName,
      email,
      role,
      ...(password && { password }), // Store plain text password if provided
      hobbies: hobbies || null,
      gender: gender || null,
      ...(profilePicPath && { profile_pic: profilePicPath }),
    };

    // Log employeeData for debugging
    console.log('Employee Data:', employeeData);

    // Update in database
    const result = await Employee.update(req.params.id, employeeData);

    if (result === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Update Employee Error:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const result = await Employee.delete(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete Employee Error:', error);
    res.status(500).json({ message: 'Server error', details: error.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};