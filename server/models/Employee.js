const pool = require('../config/db');

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

    // Log data for debugging
    console.log('Employee.create data:', data);

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

    // Log data for debugging
    console.log('Employee.update data:', data);

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
    if (password !== undefined) {
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