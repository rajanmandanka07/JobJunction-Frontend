// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ServiceCategories = () => {
    const categories = [
        {
            category: 'Home Services',
            icon: 'bi-house-door',
            subcategories: [
                { id: 1, name: 'Plumbing' },
                { id: 2, name: 'Electrical' },
                { id: 3, name: 'Carpentry' },
                { id: 4, name: 'Cleaning' },
                { id: 5, name: 'Painting' },
                { id: 6, name: 'Appliance Repair' },
                { id: 7, name: 'Pest Control' },
            ],
        },
        {
            category: 'Delivery Services',
            icon: 'bi-truck',
            subcategories: [
                { id: 8, name: 'Food Delivery' },
                { id: 9, name: 'Parcel Delivery' },
                { id: 10, name: 'Furniture Moving' },
                { id: 11, name: 'Document Courier' },
                { id: 12, name: 'Grocery Delivery' },
                { id: 13, name: 'Medicine Delivery' },
                { id: 14, name: 'Gift Delivery' },
                { id: 15, name: 'E-commerce Package Delivery' },
            ],
        },
        {
            category: 'Handyman Services',
            icon: 'bi-tools',
            subcategories: [
                { id: 16, name: 'TV Mounting' },
                { id: 17, name: 'Furniture Assembly' },
                { id: 18, name: 'Appliance Installation' },
                { id: 19, name: 'Door Repair' },
                { id: 20, name: 'Window Repair' },
                { id: 21, name: 'Faucet Installation' },
                { id: 22, name: 'Ceiling Fan Installation' },
                { id: 23, name: 'Cabinet Installation' },
            ],
        },
        {
            category: 'Personal Assistance',
            icon: 'bi-person-check',
            subcategories: [
                { id: 24, name: 'Errands' },
                { id: 25, name: 'Grocery Shopping' },
                { id: 26, name: 'Pet Sitting' },
                { id: 27, name: 'Event Planning' },
                { id: 28, name: 'Travel Arrangements' },
                { id: 29, name: 'Personal Shopping' },
                { id: 30, name: 'Virtual Assistant' },
                { id: 31, name: 'Laundry Services' },
            ],
        },
        {
            category: 'Beauty & Wellness',
            icon: 'bi-heart',
            subcategories: [
                { id: 32, name: 'Haircuts & Styling' },
                { id: 33, name: 'Facial Treatments' },
                { id: 34, name: 'Massage Therapy' },
                { id: 35, name: 'Nail Services' },
                { id: 36, name: 'Makeup Services' },
                { id: 37, name: 'Yoga Instruction' },
                { id: 38, name: 'Personal Training' },
                { id: 39, name: 'Skin Care Treatments' },
            ],
        },
    ];
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('Home Services');
    const handleBookTasker = ({ id, taskName, taskCategory }) => {

        // If using React Router, navigate to another page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            navigate('/book-tasker', {
                state: {
                    taskId: id,
                    taskName,
                    taskCategory,
                },
            });
        }, 500);
    };

    return (
        <div className="container my-5">
            <h2
                className="text-center mb-4"
                style={{
                    fontSize: '2.5rem',
                    fontWeight: '600',
                    color: '#344c60',
                    lineHeight: '1.4',
                    letterSpacing: '1px',
                }}
            >
                Explore Our <span style={{ color: '#2481ba' }}>Service Categories</span>
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
                Discover a wide variety of services we offer, categorized for your convenience. Browse through different categories, find what you need, and get it done in no time.
            </p>

            {/* Tab Navigation */}
            <ul className="nav nav-tabs justify-content-center mb-4">
                {categories.map((item, index) => (
                    <li className="nav-item" key={index}>
                        <a
                            className={`nav-link ${activeTab === item.category ? 'active' : ''}`}
                            href="#"
                            onClick={() => setActiveTab(item.category)}
                            style={{
                                fontSize: '1.1rem',
                                color: '#444b4c',
                                textTransform: 'capitalize',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <i
                                className={`bi ${item.icon}`}
                                style={{
                                    marginRight: '8px',
                                    fontSize: '1.3rem',
                                    color: '#3498DB',
                                }}
                            ></i>
                            {item.category}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
                {categories.map((item, index) => (
                    <div
                        className={`tab-pane fade ${activeTab === item.category ? 'show active' : ''}`}
                        key={index}
                    >
                        <div className="row">
                            {item.subcategories.map((sub) => (
                                <div className="col-md-4 mb-3" key={sub.id}>
                                    <div>
                                        <div>
                                            <button
                                                className="btn btn-outline-secondary"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px',
                                                    textAlign: 'center',
                                                    borderRadius: '50px',
                                                    fontSize: '1rem',
                                                }}
                                                onClick={() =>
                                                    handleBookTasker({
                                                        id: sub.id,
                                                        taskName: sub.name,
                                                        taskCategory: item.category,
                                                    })
                                                }
                                            >
                                                {sub.name}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default ServiceCategories;
