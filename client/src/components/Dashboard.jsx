import React from 'react';
import { motion } from 'framer-motion';
import { Check, Edit, Trash } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dummyData = [
  { name: 'Server 1', CPU: '40%', Memory: '24%', Disk: '20%' },
  { name: 'Server 2', CPU: '30%', Memory: '13%', Disk: '22%' },
  { name: 'Server 3', CPU: '20%', Memory: '98%', Disk: '29%' },
  { name: 'Server 4', CPU: '27%', Memory: '39%', Disk: '20%' },
  { name: 'Server 5', CPU: '18%', Memory: '48%', Disk: '21%' },
  { name: 'Server 6', CPU: '23%', Memory: '38%', Disk: '25%' },
  { name: 'Server 7', CPU: '34%', Memory: '43%', Disk: '21%' },
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Server Monitoring Dashboard</h1>
      <div className="overflow-x-auto">
        <motion.table
          className="min-w-full bg-white shadow-md rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">
                <Checkbox />
              </th>
              <th className="py-3 px-6 text-left">Server Name</th>
              <th className="py-3 px-6 text-left">CPU Usage</th>
              <th className="py-3 px-6 text-left">Memory Usage</th>
              <th className="py-3 px-6 text-left">Disk Space</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {dummyData.map((server, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <Checkbox />
                </td>
                <td className="py-3 px-6 text-left">{server.name}</td>
                <td className="py-3 px-6 text-left">{server.CPU}</td>
                <td className="py-3 px-6 text-left">{server.Memory}</td>
                <td className="py-3 px-6 text-left">{server.Disk}</td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Resource Usage Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="CPU" stroke="#8884d8" />
            <Line type="monotone" dataKey="Memory" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Disk" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard; 