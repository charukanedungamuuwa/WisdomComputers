// src/ServiceCard.js
import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
            <img className="w-full h-48 object-cover" src={service.image} alt={service.name} />
            <div className="p-4">
                <h2 className="font-bold text-xl mb-2">{service.name}</h2>
                <p className="text-gray-700 text-base mb-2">Cost: ${service.cost}</p>
                <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
        </div>
    );
};

export default ServiceCard;
