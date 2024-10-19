import React from 'react';

// Sample data for previous repairs
const repairs = [
    {
        serviceName: 'Oil Change',
        date: '2024-01-10',
        cost: '30',
        description: 'Changed the engine oil and replaced the filter.',
    },
    {
        serviceName: 'Tire Rotation',
        date: '2024-03-15',
        cost: '25',
        description: 'Rotated tires for even wear.',
    },
    {
        serviceName: 'Brake Inspection',
        date: '2024-05-20',
        cost: '50',
        description: 'Inspected brakes and replaced worn-out pads.',
    },
];


const MyRepairs = () => {
    return (
        <div className="overflow-x-auto mx-4 mt-4">
            <h2 className="text-3xl font-semibold mb-6 text-center text-green-600">My Previous Repairs</h2>
            <div className="space-y-4">
                {repairs.map((repair, index) => (
                    <div
                        key={index}
                        className={`bg-white rounded-lg shadow-md p-4 transition-transform duration-200 ease-in-out 
                                    hover:shadow-lg  ${index % 2 === 0 ? 'border-l-4 border-blue-500' : 'border-l-4 border-purple-500'}`}
                    >
                        <h3 className="text-xl font-bold text-gray-800">{repair.serviceName}</h3>
                        <p className="text-gray-600">Date: {repair.date}</p>
                        <p className="text-gray-600">Cost: <span className="font-semibold">${repair.cost}</span></p>
                        <p className="text-gray-500 mt-2">{repair.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyRepairs;