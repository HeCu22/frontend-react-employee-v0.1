import React, {useState, useEffect} from 'react';
import './EmployeeComponent.css';
import {createEmployee, getEmployee, updateEmployee} from "../services/EmployeeService";
import {useNavigate, useParams} from "react-router-dom";

function EmployeeComponent() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const {id} = useParams();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const navigator = useNavigate();

    useEffect(() => {

        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {

            const employee = {firstName, lastName, email};
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator(('/employees'))
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createEmployee(employee).then((response) => {
                        console.log(response.data);
                        navigator('/employees');
                    }).catch(error => {
                        console.error(error);
                })

            }

        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = {...errors}; /* use spread operator to copy error object */

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }
        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }
        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors((errorsCopy));
        return valid;

    }

    function pageTitle() {
        if (id) {
            return <h2>Update Employee</h2>
        } else
            return <h2>Add Employee</h2>
    }

    return (
        <div className="outer-container">


            <div className="inner-container">
                <br/>
                {pageTitle()
                }
                <br/>
                <div className="">
                    <form className="formSpace">
                        <legend className="column">
                            <label className=""> <span className="form-text">
                                First Name: </span>
                                <input
                                    type='text'
                                    placeholder="enter employee first name"
                                    name='firstName'
                                    value={firstName}
                                    className='form-control'
                                    onChange={(e) => setFirstName(e.target.value)}/>
                                {errors.firstName && <div className='invalid-feedback'> {errors.firstName}</div>}
                            </label>

                            <label className="">
                                <span className="form-text"> Last Name: </span>

                                <input
                                    type='text'
                                    placeholder="enter employee last name"
                                    name='lastName'
                                    value={lastName}
                                    className='form-control'
                                    onChange={(e) => setLastName(e.target.value)}/>
                                {errors.lastName && <div className='invalid-feedback'> {errors.lastName}</div>}
                            </label>

                            <label className=""> <span className="form-text">
                                Email id: </span>

                                <input
                                    type='text'
                                    placeholder=".enter employee email id"
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}/>
                                {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
                            </label>
                            <br/>


                            <button onClick={saveOrUpdateEmployee}>Submit</button>


                        </legend>

                    </form>
                </div>
            </div>

        </div>
    );
}

export default EmployeeComponent;