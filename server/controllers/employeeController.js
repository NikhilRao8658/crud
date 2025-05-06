// const Employee = require('../models/Employee');
// const bcrypt = require('bcryptjs');

// const getAllEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.getAll();
//     res.json(employees);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getEmployeeById = async (req, res) => {
//   try {
//     const employee = await Employee.getById(req.params.id);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }
//     res.json(employee);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const createEmployee = async (req, res) => {
//   try {
//     const { title, firstName, lastName, email, role, password } = req.body;
    
//     let hashedPassword = null;
//     if (password) {
//       hashedPassword = await bcrypt.hash(password, 10);
//     }

//     const employeeId = await Employee.create({
//       title,
//       firstName,
//       lastName,
//       email,
//       role,
//       password: hashedPassword
//     });

//     res.status(201).json({ id: employeeId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const updateEmployee = async (req, res) => {
//   try {
//     const { title, firstName, lastName, email, role, password } = req.body;
    
//     let hashedPassword = null;
//     if (password) {
//       hashedPassword = await bcrypt.hash(password, 10);
//     }

//     const result = await Employee.update(req.params.id, {
//       title,
//       firstName,
//       lastName,
//       email,
//       role,
//       password: hashedPassword
//     });

//     if (result === 0) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     res.json({ message: 'Employee updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const deleteEmployee = async (req, res) => {
//   try {
//     const result = await Employee.delete(req.params.id);
//     if (result === 0) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }
//     res.json({ message: 'Employee deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   getAllEmployees,
//   getEmployeeById,
//   createEmployee,
//   updateEmployee,
//   deleteEmployee 
// };








const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAll();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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

    // Hash password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
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
      password: hashedPassword,
      hobbies: hobbies || null, // Use null if empty to avoid schema issues
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

    // Hash password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
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
      ...(hashedPassword && { password: hashedPassword }),
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
    Vres.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

