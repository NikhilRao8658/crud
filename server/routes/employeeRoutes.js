// const express = require('express');
// const router = express.Router();
// const employeeController = require('../controllers/employeeController');
// const authMiddleware = require('../middleware/auth');

// router.get('/', authMiddleware, employeeController.getAllEmployees);
// router.get('/:id', authMiddleware, employeeController.getEmployeeById);
// router.post('/', authMiddleware, employeeController.createEmployee);
// router.put('/:id', authMiddleware, employeeController.updateEmployee);
// router.delete('/:id', authMiddleware, employeeController.deleteEmployee);

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// Assuming auth middleware exists
const auth = require('../middleware/auth'); // Adjust path if needed

router.get('/', auth, getAllEmployees); // GET /api/employees
router.get('/:id', auth, getEmployeeById); // GET /api/employees/:id
router.post('/', auth, createEmployee); // POST /api/employees
router.put('/:id', auth, updateEmployee); // PUT /api/employees/:id
router.delete('/:id', auth, deleteEmployee); // DELETE /api/employees/:id

module.exports = router;
