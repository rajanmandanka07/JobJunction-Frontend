import React from 'react';

const Achievements = () => {
    const highlights = [
        {
            title: 'Furniture Assemblies',
            number: '3.4M+',
            description: 'Furniture assemblies completed across the platform.'
        },
        {
            title: 'Moving Tasks Completed',
            number: '1.5M+',
            description: 'Successful moving tasks completed by our experts.'
        },
        {
            title: 'Satisfied Customers',
            number: '2.1M+',
            description: 'Over 2 million customers satisfied with our services.'
        },
        {
            title: 'Successful Deliveries',
            number: '5M+',
            description: 'Reliable deliveries completed nationwide.'
        },
    ];

    return (
        <div className="container my-5">
            <h2
                className="text-center mb-4"
                style={{
                    fontSize: '2.5rem',
                    fontWeight: '600',
                    color: '#424a48',
                    lineHeight: '1.4',
                    letterSpacing: '1px',
                }}
            >
                Our <spam style={{color: '#16A085',}}>Achievements</spam>
            </h2>
            <p
                className="text-center mb-5"
                style={{
                    fontSize: '1.1rem',
                    color: '#657273',
                    maxWidth: '800px',
                    margin: '0 auto',
                    fontWeight: '400',
                }}
            >
                We take pride in the milestones we&#39;ve achieved, reflecting our commitment to excellence and customer satisfaction.
            </p>

            <div className="row">
                {highlights.map((highlight, index) => (
                    <div className="col-md-3 mb-4" key={index}>
                        <div className="card border shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                            <div className="card-body text-center">
                                <h4 className="card-title" style={{ fontSize: '2rem', fontWeight: '700', color: '#16A085' }}>
                                    {highlight.number}
                                </h4>
                                <p className="card-text" style={{ fontSize: '1rem', color: '#535c5e' }}>
                                    {highlight.title}
                                </p>
                                <p className="card-text" style={{ fontSize: '1rem', color: '#8e9195' }}>
                                    {highlight.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;

