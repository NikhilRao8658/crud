// const pool = require('../config/db');

// class Employee {
//   static async getAll() {
//     const [rows] = await pool.query('SELECT * FROM employees');
//     return rows;
//   }

//   static async getById(id) {
//     const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
//     return rows[0];
//   }

//   static async create(employee) {
//     const { title, firstName, lastName, email, role, password } = employee;
//     const [result] = await pool.query(
//       'INSERT INTO employees (title, first_name, last_name, email, role, password) VALUES (?, ?, ?, ?, ?, ?)',
//       [title, firstName, lastName, email, role, password]
//     );
//     return result.insertId;
//   }

//   static async update(id, employee) {
//     const { title, firstName, lastName, email, role, password } = employee;
//     const query = password 
//       ? 'UPDATE employees SET title = ?, first_name = ?, last_name = ?, email = ?, role = ?, password = ? WHERE id = ?'
//       : 'UPDATE employees SET title = ?, first_name = ?, last_name = ?, email = ?, role = ? WHERE id = ?';
    
//     const params = password
//       ? [title, firstName, lastName, email, role, password, id]
//       : [title, firstName, lastName, email, role, id];
    
//     const [result] = await pool.query(query, params);
//     return result.affectedRows;
//   }

//   static async delete(id) {
//     const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);
//     return result.affectedRows;
//   }
// }

// module.exports = Employee;



const pool = require('../config/db'); // Your MySQL connection pool

class Employee {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM employees');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const {
      title,
      first_name,
      last_name,
      email,
      role,
      password,
      hobbies,
      gender,
      profile_pic,
    } = data;

    const [result] = await pool.query(
      `INSERT INTO employees (title, first_name, last_name, email, role, password, hobbies, gender, profile_pic)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        first_name,
        last_name,
        email,
        role,
        password,
        hobbies,
        gender,
        profile_pic,
      ]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const {
      title,
      first_name,
      last_name,
      email,
      role,
      password,
      hobbies,
      gender,
      profile_pic,
    } = data;

    const fields = [];
    const values = [];

    if (title) {
      fields.push('title = ?');
      values.push(title);
    }
    if (first_name) {
      fields.push('first_name = ?');
      values.push(first_name);
    }
    if (last_name) {
      fields.push('last_name = ?');
      values.push(last_name);
    }
    if (email) {
      fields.push('email = ?');
      values.push(email);
    }
    if (role) {
      fields.push('role = ?');
      values.push(role);
    }
    if (password) {
      fields.push('password = ?');
      values.push(password);
    }
    if (hobbies !== undefined) {
      fields.push('hobbies = ?');
      values.push(hobbies);
    }
    if (gender !== undefined) {
      fields.push('gender = ?');
      values.push(gender);
    }
    if (profile_pic !== undefined) {
      fields.push('profile_pic = ?');
      values.push(profile_pic);
    }

    if (fields.length === 0) {
      return 0;
    }

    values.push(id);
    const [result] = await pool.query(
      `UPDATE employees SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Employee;