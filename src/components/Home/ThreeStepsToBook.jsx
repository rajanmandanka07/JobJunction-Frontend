import React from 'react';

const ThreeStepsToBook = () => {
    return (
        <div className="container my-5">
            <h2
                className="text-center mb-4"
                style={{
                    fontSize: '2.5rem',
                    fontWeight: '600',
                    color: '#3e525a',
                    lineHeight: '1.4',
                    letterSpacing: '1px',
                }}
            >
                Three <span style={{color: '#3656bc'}}>Steps to Book</span>
            </h2>

            <p
                className="text-center mb-5"
                style={{
                    fontSize: '1.1rem',
                    color: '#5e6768',
                    maxWidth: '800px',
                    margin: '0 auto',
                    fontWeight: '400',
                }}
            >
                Booking is simple! Just select your service, choose a task, and confirm your booking to get started.
            </p>

            <div className="row text-center">
                {/* Step 1 */}
                <div className="col-md-4  mb-4">
                    <div className="card  shadow-sm" style={{ borderRadius: '10px', backgroundColor: '#f7f8fd' }}>
                        <div
                            className="card-body"
                            style={{
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <i
                                className="bi bi-list-check"
                                style={{ fontSize: '3rem', color: '#3656bc' }}
                            ></i>
                            <h5 className="card-title mt-3" style={{ fontSize: '1.5rem' }}>
                                Select a Category
                            </h5>
                            <p className="card-text" style={{ fontSize: '1rem', color: '#7F8C8D' }}>
                                Choose from a variety of services based on your needs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="col-md-4 mb-4">
                    <div className="card border shadow-sm" style={{ borderRadius: '10px', backgroundColor: '#f7f8fd' }}>
                        <div
                            className="card-body"
                            style={{
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <i
                                className="bi bi-check-circle"
                                style={{ fontSize: '3rem', color: '#3656bc' }}
                            ></i>
                            <h5 className="card-title mt-3" style={{ fontSize: '1.5rem' }}>
                                Choose a Task
                            </h5>
                            <p className="card-text" style={{ fontSize: '1rem', color: '#7F8C8D' }}>
                                Pick the task that best fits your needs from available options.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="col-md-4 mb-4">
                    <div className="card border shadow-sm" style={{ borderRadius: '10px', backgroundColor: '#f7f8fd' }}>
                        <div
                            className="card-body"
                            style={{
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <i
                                className="bi bi-check-all"
                                style={{ fontSize: '3rem', color: '#3656bc' }}
                            ></i>
                            <h5 className="card-title mt-3" style={{ fontSize: '1.5rem' }}>
                                Confirm Booking
                            </h5>
                            <p className="card-text" style={{ fontSize: '1rem', color: '#7F8C8D' }}>
                                Review and confirm your booking to complete the process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThreeStepsToBook;
