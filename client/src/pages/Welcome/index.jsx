import React from 'react';
import Button from 'react-bootstrap/Button';

const Welcome = () => {
    return (
        <>
            <div className="pt-5 d-grid gap-3 ">
                <div className="pt-5 text-center">
                    <p className="fs-1">Welcome to Smart-Cart</p>
                    <p className="fs-2">Your one-stop smart shopping resource</p>
                </div>
                <div className="p-2 fs-2 text-center">
                    <Button variant="primary" size="lg" href="/home">Get Started</Button>
                </div>
            </div>
        </>
    );
};

export default Welcome;
