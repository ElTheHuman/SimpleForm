import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Client from '../../SimpleDatabase/Client/client.json';
import Product from '../../SimpleDatabase/Product/product.json';
import './AddAppointment.css';

const AddAppointment = ({onSubmit, currentLength}) => {

    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showProductDropdown, setShowProductDropdown] = useState(false);

    const [visitType, setVisitType] = useState('Select visit type');
    const [selectedProduct, setSelectedProduct] = useState('Select product');
    const [date, setDate] = useState();
    const [time, setTime] = useState(); //dummy time, can be used as the getClient() input

    const handleSelectType = (type) => {
        setVisitType(type);
        setShowTypeDropdown(false);
    }

    const handleTypeToggle = (isOpen) => {
        setShowTypeDropdown(isOpen);
    }

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setShowProductDropdown(false);
    }

    const handleSelectProductToggle = (isOpen) => {
        setShowProductDropdown(isOpen);
    }

    const getProduct = () => {
        return(
            Product.map(product => (
                <Dropdown.Item className="AddAppointment__dropdown-item" onClick={() => handleSelectProduct(product.productName)}>{product.productName}</Dropdown.Item>
            ))
        )
    }
    
    const getClient = () => {
        // Random client when there is more than one available client.
        // Math.floor(Math.random() * 2)
        // ...

        // Random unstructured client data
        let currentClient;
        const currentTime = new Date().getHours();
        for (let i = 0; i < Client.length; i++) {
            currentClient = Client[i]
            if (currentTime >= currentClient['availableTimeStart'] && currentTime <= currentClient['availableTimeEnd']) {
                return currentClient.name;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const client = getClient();

        // if (!client) {
        //     alert('Out of service hours!');
        //     return;
        // }

        const currentTime = new Date().getHours();

        const newAppointment = {
            id: currentLength,
            visitType: visitType,
            date: date,
            time: currentTime,
            client: client,
            product: selectedProduct,
            approved: false
        }

        onSubmit(newAppointment);
    }

    return (

        <div className="AddAppointment">
            <div className="AddAppointment__container">
                <form onSubmit={handleSubmit} className="AddAppointment__form">
                    <div className="AddAppointment__input-container">
                        <Dropdown show={showTypeDropdown} onToggle={handleTypeToggle} className="AddAppointment__dropdown">
                            <Dropdown.Toggle variant="success" className="AddAppointment__dropdown-selected">
                                {visitType}
                            </Dropdown.Toggle>
                            
                            <Dropdown.Menu className="AddAppointment__dropdown-menu">
                                <Dropdown.Item className="AddAppointment__dropdown-item" onClick={() => handleSelectType('Check Up')}>Check Up</Dropdown.Item>
                                <Dropdown.Item className="AddAppointment__dropdown-item" onClick={() => handleSelectType('Reception')}>Reception</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="AddAppointment__input-container">
                        <label htmlFor="date" className="AddAppointment__input-label">Date of Appointment</label>
                        <input type="date" id="date" className="AddAppointment__input" onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div className="AddAppointment__input-container">
                        <label htmlFor="time" className="AddAppointment__input-label">Time of Appointment</label>
                        <input type="time" id="time" className="AddAppointment__input" onChange={(e) => setTime(e.target.value)}/>
                    </div>
                    <div className="AddAppointment__input-container">
                        <Dropdown show={showProductDropdown} onToggle={handleSelectProductToggle} className="AddAppointment__dropdown">
                            <Dropdown.Toggle variant="success" className="AddAppointment__dropdown-selected">
                                {selectedProduct}
                            </Dropdown.Toggle>
                            
                            <Dropdown.Menu className="AddAppointment__dropdown-menu">
                                {getProduct()}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <button type="submit" className="AddAppointment__submit">Add Appointment</button>
                </form>
            </div>
        </div>

    );

}

export default AddAppointment;