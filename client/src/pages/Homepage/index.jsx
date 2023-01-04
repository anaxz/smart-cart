import React, { useState } from "react";
import { Foodbar } from "../../components";
import { Darknavbar } from "../../layout";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { deleteItem } from '../../reducer'

import './index.css'

const Homepage = () => {



    return (
        <>
            <Darknavbar />

            <Foodbar />
        </>
    )
}



export default Homepage;
