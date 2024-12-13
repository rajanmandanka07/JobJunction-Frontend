// eslint-disable-next-line no-unused-vars
import React from 'react';

const PopularProjects = () => {
    const popularTasks = [
        {
            title: 'Plumbing Services',
            description: 'Fixing leaks and repairing pipes.',
            price: '₹599',
            imageUrl: 'https://media.istockphoto.com/id/911703434/photo/hands-of-plumber-with-a-wrench.webp?s=2048x2048&w=is&k=20&c=W0g-6MZXHCXouvTXt01LTNZ_t2a5uJtf1kw_JUaWvSk=', // Placeholder image URL
        },
        {
            title: 'Furniture Assembly',
            description: 'Assemble your furniture with expert help.',
            price: '₹799',
            imageUrl: 'https://media.istockphoto.com/id/1067496776/photo/top-view-of-drill-tool-and-another-equipment-on-wood-table-furniture-assembly-improvement-or.jpg?s=612x612&w=is&k=20&c=4JGaVlZ3caTjD6_oPmq0GlP5uTtZz3w00NILRbSoFs8=', // Placeholder image URL
        },
        {
            title: 'Cleaning Services',
            description: 'Deep cleaning for homes and offices.',
            price: '₹499',
            imageUrl: 'https://media.istockphoto.com/id/1417833187/photo/professional-cleaner-vacuuming-a-carpet.jpg?s=612x612&w=is&k=20&c=sRSfeVNgJJP_DYtsF9wz1Mo0B6Z1NQTNSJZnqOSFdiU=', // Placeholder image URL
        },
        {
            title: 'Electrical Repairs',
            description: 'Repairs, installations, and more.',
            price: '₹899',
            imageUrl: 'https://media.istockphoto.com/id/1345670559/photo/electrician-fixing-an-electrical-outlet-and-measuring-the-voltage.jpg?s=612x612&w=is&k=20&c=gHO4MYHviYgvLa6yaX7BBHsRSLM5et1EZwVbexLRgYU=', // Placeholder image URL
        },
        {
            title: 'Moving Services',
            description: 'Moving your belongings safely and quickly.',
            price: '₹999',
            imageUrl: 'https://media.istockphoto.com/id/928084870/photo/close-up-of-two-delivery-men-carrying-cardboard-box.jpg?s=612x612&w=is&k=20&c=2xhLVCaclN9eSr93SNX8etr7448zAVLyf9zNQuqkQo4=', // Placeholder image URL
        },
        {
            title: 'Home Renovation',
            description: 'Revamp your space with professional renovation.',
            price: '₹1499',
            imageUrl: 'https://media.istockphoto.com/id/1477568555/photo/family-room-storing-tools-and-supplies.jpg?s=612x612&w=is&k=20&c=9LnYFfzKfv5HsE5baAY1u97Bwi0eEI0HpTbtD3qo8Y0=', // Placeholder image URL
        },
    ];

    return (
        <div className="container my-5">
            <h2
                className="text-center mb-4"
                style={{
                    fontSize: '2.5rem',
                    fontWeight: '600',
                    color: '#32525a',
                    lineHeight: '1.4',
                    letterSpacing: '1px',
                }}
            >Popular <spam style={{color:'#0091bf'}}>Projects</spam></h2>
            <p className="text-center mb-5"
               style={{fontSize: '1.1rem', color: '#647475', maxWidth: '700px', margin: '0 auto'}}>
                Explore some of the most popular services available at competitive prices. Start today and get the job
                done!
            </p>

            <div className="row">
                {popularTasks.map((task, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card" style={{borderRadius: '10px', overflow: 'hidden'}}>
                            <img src={task.imageUrl} alt={task.title} className="card-img-top"
                                 style={{height: '200px', objectFit: 'cover'}}/>
                            <div className="card-body text-center" style={{padding: '1rem'}}>
                                {/* Title */}
                                <h5 className="card-title" style={{fontSize: '1.2rem', color:'#575151'}}>{task.title}</h5>

                                {/* Description */}
                                <p className="card-text"
                                   style={{fontSize: '0.9rem', color: '#737e80'}}>{task.description}</p>

                                {/* Price */}
                                <p className="card-text" style={{fontWeight: '600', color: '#16A085'}}>
                                    Starting from <span style={{fontSize: '1.2rem'}}>{task.price}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PopularProjects;
