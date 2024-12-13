import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const QuickSuggestions = () => {
    const navigate = useNavigate(); // Hook for navigating to another page

    const suggestions = [
        {
            category: 'Home Services',
            subcategories: [
                { id: 1, name: 'Plumbing' },
            ],
        },
        {
            category: 'Delivery Services',
            subcategories: [
                { id: 8, name: 'Food Delivery' },
            ],
        },
        {
            category: 'Handyman Services',
            subcategories: [
                { id: 16, name: 'TV Mounting' },
            ],
        },
        {
            category: 'Personal Assistance',
            subcategories: [
                { id: 31, name: 'Laundry Services' },
            ],
        },
        {
            category: 'Beauty & Wellness',
            subcategories: [
                { id: 38, name: 'Personal Training' },
                { id: 39, name: 'Skin Care Treatments' },
            ],
        },
    ];

    const handleBookTasker = ({ id, taskName, taskCategory }) => {
        // Example: Navigate to a booking page with task details
        console.log("Booking Details:", { id, taskName, taskCategory });

        // If using React Router, navigate to another page
        navigate('/book-tasker', {
            state: {
                taskId: id,
                taskName,
                taskCategory,
            },
        });
    };

    return (
        <div className="container my-5">
            <h2
                className="text-center mb-4"
                style={{
                    fontSize: '2.5rem',
                    fontWeight: '600',
                    color: '#465057',
                    lineHeight: '1.4',
                    letterSpacing: '1px',
                }}
            >
                Quick <span style={{ color: '#2980B9' }}>Suggestions</span>
            </h2>
            <p
                className="text-center mb-5"
                style={{
                    fontSize: '1.1rem',
                    color: '#626b6c',
                    maxWidth: '800px',
                    margin: '0 auto',
                    fontWeight: '400',
                }}
            >
                Explore the most popular services and get started with just a click.
            </p>

            <div className="d-flex justify-content-center flex-wrap">
                {suggestions.map((suggestion) => (
                    suggestion.subcategories.map((subcategory) => (
                        <button
                            key={subcategory.id}
                            className="btn btn-primary m-2"
                            style={{
                                fontSize: '1.1rem',
                                padding: '12px 25px',
                                backgroundColor: '#2980B9',
                                borderColor: '#2980B9',
                                borderRadius: '30px',
                                color: '#fff',
                            }}
                            onClick={() =>
                                handleBookTasker({
                                    id: subcategory.id,
                                    taskName: subcategory.name,
                                    taskCategory: suggestion.category,
                                })
                            }
                        >
                            {subcategory.name}
                        </button>
                    ))
                ))}
            </div>
        </div>
    );
};

export default QuickSuggestions;
