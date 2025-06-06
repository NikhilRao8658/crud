// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getEmployeeById, createEmployee, updateEmployee } from '../services/api';

// const EmployeeForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: 'Mr',
//     first_name: '',
//     last_name: '',
//     email: '',
//     role: 'User',
//     password: '',
//     confirmPassword: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (id && id !== 'new') {
//       const fetchEmployee = async () => {
//         setIsLoading(true);
//         try {
//           const employee = await getEmployeeById(id);
//           setFormData({
//             title: employee.title,
//             first_name: employee.first_name,
//             last_name: employee.last_name,
//             email: employee.email,
//             role: employee.role,
//             password: '',
//             confirmPassword: ''
//           });
//         } catch (err) {
//           console.error(err);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchEmployee();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password && formData.password !== formData.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }

//     const employeeData = {
//       title: formData.title,
//       firstName: formData.first_name,
//       lastName: formData.last_name,
//       email: formData.email,
//       role: formData.role,
//       password: formData.password || undefined
//     };

//     try {
//       if (id && id !== 'new') {
//         await updateEmployee(id, employeeData);
//       } else {
//         await createEmployee(employeeData);
//       }
//       navigate('/users');
//     } catch (err) {
//       console.error(err);
//       alert('Error saving employee');
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center py-8">Loading...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           {id && id !== 'new' ? 'Edit User' : 'Add User'}
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//               <select
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//               >
//                 <option value="Mr">Mr</option>
//                 <option value="Mrs">Mrs</option>
//                 <option value="Ms">Ms</option>
//                 <option value="Dr">Dr</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//               <input
//                 type="text"
//                 name="first_name"
//                 value={formData.first_name}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//               <input
//                 type="text"
//                 name="last_name"
//                 value={formData.last_name}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
//               >
//                 <option value="User">User</option>
//                 <option value="Admin">Admin</option>
//               </select>
//             </div>
//           </div>

//           <div className="border-t border-gray-200 pt-6 mb-6">
//             <h3 className="text-lg font-medium text-gray-900 mb-2">Change Password</h3>
//             <p className="text-sm text-gray-500 mb-4">Leave blank to keep the same password</p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-start space-x-3">

//           <button
//               type="submit"
//               className="inline-flex justify-center cursor-pointer py-2 px-6 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"

//             >
//               Save
//             </button>

//             <button
//               type="button"
//               onClick={() => navigate('/users')}
//               className="inline-flex justify-center cursor-pointer py-2 px-6 text-sm font-medium text-blue-600 "

//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default EmployeeForm;


















import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, createEmployee, updateEmployee } from '../services/api';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: 'Mr',
    first_name: '',
    last_name: '',
    email: '',
    role: 'User',
    password: '',
    confirmPassword: '',
    hobbies: '',
    gender: '',
    profile_pic: null
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id && id !== 'new') {
      const fetchEmployee = async () => {
        setIsLoading(true);
        try {
          const employee = await getEmployeeById(id);
          setFormData({
            title: employee.title,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            role: employee.role,
            password: '',
            confirmPassword: '',
            hobbies: employee.hobbies || '',
            gender: employee.gender || '',
            profile_pic: null
          });

        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchEmployee();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const employeeData = new FormData();
    employeeData.append('title', formData.title);
    employeeData.append('firstName', formData.first_name);
    employeeData.append('lastName', formData.last_name);
    employeeData.append('email', formData.email);
    employeeData.append('role', formData.role);
    if (formData.password) employeeData.append('password', formData.password);
    employeeData.append('hobbies', formData.hobbies);
    employeeData.append('gender', formData.gender);
    if (formData.profile_pic) employeeData.append('profile_pic', formData.profile_pic);

    try {
      if (id && id !== 'new') {
        await updateEmployee(id, employeeData);
      } else {
        await createEmployee(employeeData);
      }

      if (formData.email && formData.password) {
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userPassword', formData.password);
      }

      navigate('/users');
    } catch (err) {
      console.error(err);
      alert('Error saving employee');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {id && id !== 'new' ? 'Edit User' : 'Add User'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hobbies</label>
            <textarea
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm border p-2"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="flex items-center gap-4">
              {['Male', 'Female', 'Other'].map(gender => (
                <label key={gender} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
            <input
              type="file"
              name="profile_pic"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500"
            />
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Change Password</h3>
            <p className="text-sm text-gray-500 mb-4">Leave blank to keep the same password</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-start space-x-3">
            <button
              type="submit"
              className="inline-flex justify-center cursor-pointer py-2 px-6 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="inline-flex justify-center cursor-pointer py-2 px-6 text-sm font-medium text-blue-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
