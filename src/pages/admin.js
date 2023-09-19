import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get('/api/submissions');
      setSubmissions(res.data);
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  useEffect(() => {
    if (password === process.env.ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchSubmissions();
    }
  }, [password]);

  return (
    <div className="p-8 w-full bg-gradient-to-br from-violet-600 to-indigo-600">
      {!isAuthenticated ? (
        <div className="mb-4">
          <label className="text-white">Enter Admin Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="hover:shadow-md p-2"
          />
        </div>
      ) : (
        <Table submissions={submissions} />
      )}
    </div>
  );
};

const Table = ({ submissions }) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-x-scroll max-w-4xl mx-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
            <th className="pl-4 w-8"></th>
            <th className="text-start p-4 font-medium">Name</th>
            <th className="text-start p-4 font-medium">Email</th>
            <th className="text-start p-4 font-medium">Project Idea</th>
            <th className="text-start p-4 font-medium">Tech Stack</th>
            <th className="text-start p-4 font-medium">Github Link</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <TableRows key={submission._id} submission={submission} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRows = ({ submission, index }) => {
  return (
    <motion.tr className={`text-sm ${index % 2 ? 'bg-slate-100' : 'bg-white'}`}>
      <td className="pl-4 w-8">{index + 1}</td>
      <td className="p-4">{submission.name}</td>
      <td className="p-4">{submission.email}</td>
      <td className="p-4">{submission.project_idea}</td>
      <td className="p-4">{submission.tech_stack}</td>
      <td className="p-4">{submission.github_link}</td>
    </motion.tr>
  );
};

export default Admin;
