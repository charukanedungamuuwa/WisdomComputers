import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const ServicesList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:8080/repairs'); // Update URL to match your backend endpoint
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="flex flex-wrap justify-center">
            {services.map((service, index) => (
                <ServiceCard key={index} service={service} />
            ))}
        </div>
    );
};

export default ServicesList;
