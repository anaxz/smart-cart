import React from 'react';
import Button from 'react-bootstrap/Button';

const Welcome = () => {
    return (
        <>
      <div className='text-center'>
      <div>
        <h1>Welcome to Smart-Cart</h1>
        <h3>Your one-stop smart shopping resource</h3>
      </div>
      <div className="mb-2">
        <Button variant="primary" size="lg" href="#">Get Started</Button>
      </div>
      </div>
      </>
    );
  };

export default Welcome;
