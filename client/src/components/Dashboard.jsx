import React from 'react';
import { motion } from 'framer-motion';
import { Check, Edit, Trash } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from './ui/card';
import { GrInProgress } from "react-icons/gr";
import { IoMdAlarm } from "react-icons/io";
import { FaFreeCodeCamp } from "react-icons/fa";
import { SquareStack } from 'lucide-react';
import InProgressSvg from "../assets/svg/progress.svg"

const dummyData = [
  { name: 'Server 1', CPU: '40%', Memory: '24%', Disk: '20%' },
  { name: 'Server 2', CPU: '30%', Memory: '13%', Disk: '22%' },
  { name: 'Server 3', CPU: '20%', Memory: '98%', Disk: '29%' },
  { name: 'Server 4', CPU: '27%', Memory: '39%', Disk: '20%' },
  { name: 'Server 5', CPU: '18%', Memory: '48%', Disk: '21%' },
  { name: 'Server 6', CPU: '23%', Memory: '38%', Disk: '25%' },
  { name: 'Server 7', CPU: '34%', Memory: '43%', Disk: '21%' },
];

const dashboardData = [
  {
    name: "In Progress",
    count: 30,
    className: "bg-[#0d2847] dark:bg-[#0d2847]/80 border-[#104d87] text-[#70b8ff]",
    Icon: GrInProgress
  },
  {
    name: "Total Queues",
    count: 300,
    className: "bg-[#132d21] dark:bg-[#132d21]/80 border-[#20573e] text-[#3dd68c]",
    Icon: SquareStack
  },
  {
    name: "Idle",
    count: 4,
    // className: "bg-[#301c3b]/80 border-[#54346b] text-[#d19dff]",
    className: "bg-[#37172f] dark:bg-[#37172f]/80 border-[#692955] text-[#ff8dcc]",
    Icon: FaFreeCodeCamp
  },
  {
    name: "Pending",
    count: 4,
    className: "bg-[#462100] dark:bg-[#462100]/80 border-[#7e451d] text-[#ffa057]",
    Icon: IoMdAlarm
  }
]

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-x-4 mt-4 mb-10'>
        {
          dashboardData.map((d, index) => {
            let Icon = d.Icon;
            return (
              <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              >
                <Card className={`${d.className} h-[120px] relative overflow-hidden`}>
                  <CardContent>
                    <div className="h-20 flex justify-end items-center space-x-5">
                      {/* <Icon className='size-6'/> */}
                      <p className='font-semibold text-lg'>{d.name}</p>
                    </div>
                    <div className='h-full flex flex-col items-end justify-end'>
                      <p className='text-2xl font-semibold'>{d.count}</p>
                    </div>
                    <div className='absolute top-5 left-5'>
                      <Icon className="opacity-20 animate-pulse" size={70}/>
                      {/* <img src={InProgressSvg} className="w-[200px] opacity-20 rotate-90 text-white"/> */}
                    </div>
                  </CardContent>
                  
                </Card>
              </motion.div>
            )
          })
        }

      </div>
      <h1 className="text-3xl font-bold mb-6">Server Monitoring Dashboard</h1>
      <div className="overflow-x-auto">
        <motion.table
          className="min-w-full bg-white dark:bg-content_background shadow-md rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="bg-gray-200 dark:bg-neutral-800 text-gray-600  dark:text-neutral-200 uppercase text-sm leading-normal">
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
          <tbody className="text-gray-600 dark:text-neutral-300 text-sm font-light">
            {dummyData.map((server, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
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
      <div className="bg-white dark:bg-content_background p-6 rounded-lg shadow-md">
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