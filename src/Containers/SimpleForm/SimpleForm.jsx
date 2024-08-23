import React, { useState } from "react";
import AddAppointment from "../AddAppointment/AddAppointment";
import { CSSTransition } from "react-transition-group";
import { AnimatePresence } from "framer-motion";
import './SimpleForm.css';

const SimpleForm = () => {

    const [appointment, setAppointment] = useState([]);
    const [showAddAppointment, setShowAddAppointment] = useState(false);

    // const addAppointment = (type, date, time, client, product) => {
    //     const newAppointment = {
    //         type: type,
    //         date: date,
    //         time: time,
    //         client: client,
    //         product: product,
    //     };
    //     setAppointment(appointment => [...appointment, newAppointment]);
    // }

    const handleChangeApproval = (id) => {
        setAppointment(appointment => appointment.map(appointmentMap => appointmentMap.id === id ? {...appointmentMap, approved: !appointmentMap.approved} : appointmentMap));
    }

    const getAppointment = () => {
        return !appointment.length ? <p className="SimpleForm__appointment--empty">No appointments was made!</p>: (
            <div className="SimpleForm__appointment-container">
                {appointment.map(appointmentMap => (
                    <div className="SimpleForm__appointment">
                        <div className="SimpleForm__appointment--visit-type">
                            {appointmentMap.visitType}
                        </div>
                        <div className="SimpleForm__appointment--date">
                            {appointmentMap.date}
                        </div>
                        <div className="SimpleForm__appointment--time">
                            {appointmentMap.time}
                        </div>
                        
                        <div className="SimpleForm__appointment--client">
                            {appointmentMap.client}
                        </div>
                        <div className="SimpleForm__appointment--product">
                            {appointmentMap.product}
                        </div>
                        <div className="SimpleForm__appointment--approval">
                            {appointmentMap.approved ? 'Approved!': 'Not Approved!'}
                        </div>
                        <button onClick={() => handleChangeApproval(appointmentMap.id)} className="SimpleForm__appointment--change-approval">Change approval</button>
                    </div>
                ))}
            </div>
        )
    }

    const handleSetShowAddAppointment = () => {
        setShowAddAppointment(!showAddAppointment);
    }

    const handleAddAppointment = (newAppointment) => {

        // addAppointment(newAppointment);
        setAppointment(appointment => [...appointment, newAppointment]);
        
        handleSetShowAddAppointment(false);

    }

    return (
        <div className="SimpleForm">
            <AnimatePresence initial={false} mode="wait">
                <CSSTransition in={showAddAppointment} timeout={300} classNames={"AddAppointment__transition"} unmountOnExit>
                    <AddAppointment onSubmit={handleAddAppointment} currentLength = {appointment.length}/>
                </CSSTransition>
            </AnimatePresence>
            <div className="SimpleForm__container">
                <div className="SimpleForm__header">
                    <button className="SimpleForm__create-button" onClick={handleSetShowAddAppointment}>Add Appointment</button>
                </div>
                <div className="SimpleForm__content">
                    {getAppointment()}
                </div>
            </div>
        </div>
    );
}

export default SimpleForm;