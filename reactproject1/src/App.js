import React, { useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import CustCreateForm from "./component/CustCreateForm";
import CustUpdateForm from "./component/CustUpdateForm";
import CustomerAccounts from "./component/CustomerAccounts";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';





function App() {
    const [custs, setCusts] = useState([]);
    const [cust, setCust] = useState({});
    const [userId, setuserId] = useState();
    console.log("UserId is", userId);

    const data = userId;
    
    const [showingCreateNewCustForm, setshowingCreateNewCustForm] = useState(false);
    const [custCurrentlyBeingUpdated, setcustCurrentlyBeingUpdated] = useState(null);
    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
        setIsShown(true);
        
    };
    

    function getCusts(){
        const url = 'http://localhost:5095/api/customer';

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(custsFromServer => {
               
                setCusts(custsFromServer);
                console.log(custs);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    function deleteCust(id) {
        const url = 'http://localhost:5095/api/customer/deleteCustomer/'+id;

        fetch(url, {
            method: 'DELETE'
        })
            .then(response => response)
            .then(responseFromServer => {
                console.log(responseFromServer);
                onCustDeleted(id);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    function getCustbyId(id) {
        const custId = parseInt(id.userId);
        
        const url = 'http://localhost:5095/api/customer/' + custId;

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(custsFromServer => {
                console.log(custsFromServer);
                
                setCust(custsFromServer);

                console.log(cust);
               
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    
    return (
      
        <div className="container">
            <div>
                <h1 align="center">Bank Management System</h1>
            </div>
            {(showingCreateNewCustForm === false && custCurrentlyBeingUpdated===null) && (

                <div className="mt-5" >
                    <button onClick={getCusts} className="btn btn-dark btn-lg w-10 mx-5 ">Show All Customers</button>

                    <input  type="number" onChange={e => setuserId(e.target.value)} ></input>
                    <button onClick={() => getCustbyId({ userId })} className="btn btn-primary btn-lg w-10 mx-3">Get Customer By Id</button>
                    

                    <button onClick={() => setshowingCreateNewCustForm(true)} className="btn btn-success btn-lg w-10  mx-5">Create New Customer</button>
                    
                </div>
             )}

            
            {(custs.length > 0 && showingCreateNewCustForm === false && custCurrentlyBeingUpdated === null) && renderCustTable()}
            
            {(cust.id!=null && showingCreateNewCustForm === false && custCurrentlyBeingUpdated === null) && renderCustbyIdTable()}

            
            {showingCreateNewCustForm && <CustCreateForm onCustCreated={onCustCreated} />}
            {custCurrentlyBeingUpdated !== null && <CustUpdateForm cust={custCurrentlyBeingUpdated} onCustUpdated={onCustUpdated} />}
            {isShown && <CustomerAccounts data={data}  />}
            </div>
        
    );

    function renderCustTable() {
        return (
            <div className="table-responsive mt-5">
                
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id(PK)</th>
                            <th scope="col">FullName</th>
                            <th scope="col">PhoneNo</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Age</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {custs.map((cust)=>(
                            <tr key={cust.id}>
                                <th scope="row">{cust.id}</th>
                                <td> {cust.fullName}</td>
                                <td> { cust.phoneNo}</td>
                                <td> {cust.email}</td>
                                <td> {cust.address}</td>
                                <td> {cust.age}</td>
                                <td >
                                    <Button onClick={() => setcustCurrentlyBeingUpdated(cust)} className="btn btn-primary btn-sm mx-3 my-3">Update</Button>
                                    <Button onClick={() => { if (window.confirm(`Are you sure?`)) deleteCust(cust.id) }} className="btn btn-danger btn-sm">Delete</Button>

                                </td>
                                
                            </tr>
                        )) }
                    </tbody>
                    
                </table>
                
                <button onClick={() => setCusts([])} className="btn btn-dark btn-lg w-10">Close </button>
            </div>    
        );
    }

    function renderCustbyIdTable() {
        return (
            <div className="table-responsive mt-5">
                
                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id(PK)</th>
                            <th scope="col">FullName</th>
                            <th scope="col">PhoneNo</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Age</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                            <tr key={cust.id}>
                                <th scope="row">{cust.id}</th>
                                <td> {cust.fullName}</td>
                                <td> {cust.phoneNo}</td>
                                <td> {cust.email}</td>
                                <td> {cust.address}</td>
                                <td> {cust.age}</td>
                                <td >
                                    <Button onClick={() => setcustCurrentlyBeingUpdated(cust)} className="btn btn-primary btn-sm mx-3 my-3">Update</Button>
                                     <Button onClick={() => { if (window.confirm(`Are you sure?`)) deleteCust(cust.id) }} className="btn btn-danger btn-sm">Delete</Button>
                                <button onClick={handleClick} className="btn btn-secondary btn-sm w-10 mx-3">Customer Details</button>
                                </td>

                            </tr>
                       
                    </tbody>

                </table>
                <button onClick={() => setCust({})} className="btn btn-dark btn-lg w-10">Close </button>
            </div>
        );
    }



    function onCustCreated(createdCust) {
        setshowingCreateNewCustForm(false);
        if (createdCust === null) {
            return;
        }
        alert("Customer Added");

        getCusts();
    }

    function onCustUpdated(updatedCust) {
        setcustCurrentlyBeingUpdated(null)

        if (updatedCust == null) {
            return; 
        }

        let custsCopy = [...custs];

        const index = custsCopy.findIndex((custsCopyCust, currentIndex) => {
            if (custsCopyCust.id === updatedCust.id) {
                return true;
            }
        });
        if (index !== -1) {
            custsCopy[index] = updatedCust;
        }
        setCusts(custsCopy);

        alert("Customer Updated")
    }

    function onCustDeleted(deletedCustid) {

     

        let custsCopy = [...custs];

        const index = custsCopy.findIndex((custsCopyCust, currentIndex) => {
            if (custsCopyCust.id === deletedCustid) {
                return true;
            }
        });
        if (index !== -1) {
            custsCopy.splice(index,1);
        }
        setCusts(custsCopy);

        alert(`Customer Deleted`);
    }

    

    

}

export default App;
