import React from 'react';
import Button from 'react-bootstrap/Button';
import './index.css'

const Welcome = () => {
    return (
        <>
            <div className="pb-5 d-grid gap-3" style={{ margin: '130px auto 0', borderRadius: '10px', backgroundColor: '#205295', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', width: '50%' }}>
                <div className="pt-5 text-center">
                    <p className="fs-1" style={{ fontFamily: 'Poppins' }}>Welcome to Smart-Cart</p>
                    <div style={{ width: '100px', height: '100px', margin: '0 auto', border: '5px white solid', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><i class="bi bi-cart-check" style={{ color: '#EB6440', fontSize: '60px' }}></i></div>
                    <p className="fs-2" style={{ fontFamily: 'Jost', marginTop: '16px' }}>Your one-stop smart shopping resource</p>
                </div>
                <div className="p-2 fs-2 text-center">
                    <Button size="lg" href="/home" style={{ backgroundColor: '#EB6440', border: 'none', borderRadius: '10px' }}>Get Started</Button>
                </div>
            </div>
            <div className="bar"><span className="bar_content">Hello Hello</span></div>

            <div className="bar2"><span className="bar_content2"><i class="bi bi-cart-check"></i>
                <i class="bi bi-cart-check" style={{ color: 'white' }}></i>
                <i class="bi bi-cart-check" style={{ color: '#9CDD94' }}></i>
                <i class="bi bi-cart-check" style={{ color: '#FFBFE4' }}></i>
                <i class="bi bi-cart-check" style={{ color: '#FFE5BF' }}></i>
                <i class="bi bi-cart-check" style={{ color: '#BCB9FF' }}></i>
                <i class="bi bi-cart-check" style={{ color: '#FFFB8E' }}></i>
                <i class="bi bi-cart-check" style={{ color: '#FFBA79' }}></i>
                <i class="bi bi-cart-check" style={{ color: '#B0F2FF' }}></i>
                <i class="bi bi-cart-check" style={{ color: '#9CDD94' }}></i>
                <i class="bi bi-cart-check" style={{ color: '#FFBFE4' }}></i>
                <i class="bi bi-cart-check" style={{ color: '#BCB9FF' }}></i></span></div>


        </>
    );
};

export default Welcome;
