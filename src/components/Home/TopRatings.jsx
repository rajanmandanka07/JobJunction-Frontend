// eslint-disable-next-line no-unused-vars
import React from 'react';

const TopRatings = () => {
    const ratings = [
        {
            name: 'Walter White',
            rating: 5,
            review: 'Excellent service! The plumber was very professional and fixed the issue quickly.',
            task: 'Plumbing Services',
            imageUrl: '/ProfilePictures/Walter White.jpg', // Placeholder image for the client
        },
        {
            name: 'Jesse Pinkman',
            rating: 4,
            review: 'Great furniture assembly. The team did a fantastic job in a short amount of time.',
            task: 'Furniture Assembly',
            imageUrl: '/ProfilePictures/Jesse Pinkman.jpg',
        },
        {
            name: 'Jimmy Mcgill',
            rating: 5,
            review: 'Top-notch cleaning service. My home looks brand new!',
            task: 'Cleaning Services',
            imageUrl: '/ProfilePictures/Jimmy Mcgill.jpg',
        },
        {
            name: 'Gustavo fring',
            rating: 4,
            review: 'Electrical repairs were done quickly, but they could have communicated better.',
            task: 'Electrical Repairs',
            imageUrl: '/ProfilePictures/gustavo fring.jpg',
        },
    ];

    return (
        <div className="container my-5">
            <h2
                className="text-center mb-4"
                style={{
                    fontSize: '2.5rem',
                    fontWeight: '600',
                    color: '#514c5e',
                    lineHeight: '1.4',
                    letterSpacing: '1px',
                }}
            >
                Top <span style={{color:'#7861b3'}}>Ratings</span>
            </h2>
            <p
                className="text-center mb-5"
                style={{
                    fontSize: '1.1rem',
                    color: '#596868',
                    maxWidth: '800px',
                    margin: '0 auto',
                    fontWeight: '400',
                }}
            >
                See what our clients say about our services. Read their reviews and ratings to get an idea of what we can offer.
            </p>

            {/* Cards for reviews */}
            <div className="row">
                {ratings.map((rating, index) => (
                    <div className="col-md-6 mb-4" key={index}>
                        <div className="card shadow-sm" style={{ borderRadius: '10px' }}>
                            <div className="card-body">
                                {/* Client Image */}
                                <div className="d-flex align-items-center mb-3">
                                    <img
                                        src={rating.imageUrl}
                                        alt={rating.name}
                                        className="rounded-circle"
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                    <div className="ms-3">
                                        <h5 className="card-title" style={{ fontSize: '1.2rem' }}>
                                            {rating.name}
                                        </h5>
                                        <p
                                            className="card-text"
                                            style={{ fontSize: '0.9rem', color: '#7F8C8D' }}
                                        >
                                            {rating.task}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="mb-3">
                                    <span
                                        style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            color: '#F39C12',
                                        }}
                                    >
                                        {'★'.repeat(rating.rating)}{' '}
                                        {'☆'.repeat(5 - rating.rating)}
                                    </span>
                                </div>

                                {/* Review */}
                                <p className="card-text" style={{ fontSize: '1rem', color: '#2C3E50' }}>
                                    &#34;{rating.review}&#34;
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopRatings;
