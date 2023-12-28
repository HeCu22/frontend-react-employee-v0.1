import React, {useEffect, useState} from 'react';
import {deleteEmployee, listEmployees} from "../services/EmployeeService";
import { useNavigate} from "react-router-dom";

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
       getAllEmployees();

    },[])

    function getAllEmployees()  {
        listEmployees().then((response) => {
            setEmployees((response.data));
        }).catch(error => {
            console.error(error);
        })

    }


    //
    // const dummyData = [
        // {
        //     "id": 1,
        //     "firstName":
        //         "Annabella",
        //     "lastName":
        //         "Bovenweert",
        //     "email":
        //         "Annabella@gmail.com"
        //
        // }
        // ,
        // {
        //     "id":
        //         2,
        //     "firstName":
        //         "Bella",
        //     "lastName":
        //         "Weerts",
        //     "email":
        //         "Bella@novi.nl"
        //
        // }]

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id) {
        console.log('id', id);

        deleteEmployee(id).then((response) => {
            getAllEmployees();

        }).catch(error => {
            console.error(error);
        })
    }



    return (
        <div className="outer-container">
            <div className="inner-container">
                <h2>List of Employees</h2>
                <button type="button" className="button-add" onClick={addNewEmployee}>Add Employee</button>
                <div className="column">
                    <div className="row">
                        <span className="item-detail">Employee Id</span>
                        <span className="item-detail">Employee first name</span>
                        <span className="item-detail">Employee last name</span>
                        <span className="item-detail">Employee email </span>
                            <span className="item-detail">Action</span>
                    </div>
                    <>
                        {
                            employees.map(employee =>
                            <div className="row" key={employee.id}>
                                <span className="item-detail">{employee.id}</span>
                                <span className="item-detail">{employee.firstName}</span>
                                <span className="item-detail">{employee.lastName}</span>
                                <span className="item-detail">{employee.email}</span>
                                <span className="span-button"><button onClick={() => updateEmployee(employee.id)}>update</button></span>
                                <span className="span-button"><button className="button-delete" onClick={() => removeEmployee(employee.id)}>delete</button></span>

                            </div>)
                        }
                    </>

                </div>

            </div>
        </div>
    )
}

export default ListEmployeeComponent;
