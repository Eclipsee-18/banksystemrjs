import { Button } from 'bootstrap';
import React, { useState } from 'react';



export default function CustUpdateForm(props) {

    const initialFormData = Object.freeze({
        fullName: props.cust.fullName,
        phoneNo: props.cust.phoneNo,
        email: props.cust.email,
        address: props.cust.address,
        age: props.cust.age
    });

    const [formData, setFormData] = useState(initialFormData);

    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const custToUpdate = {
            id: props.cust.id,
            fullName: formData.fullName,
            phoneNo: formData.phoneNo,
            email: formData.email,
            address: formData.address,
            age: formData.age
        };

        const url = 'http://localhost:5095/api/customer/updateCustomer';

        fetch(url, {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(custToUpdate)
        })
            .then(response => response)
            .then(responseFromServer => {
                console.log(responseFromServer);
                
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.onCustUpdated(custToUpdate);
    };

    return (
        
        <form className="w-100 px-5">
            <h1 className="mt-5"> Update Customer "{props.cust.id}".</h1>
                <div className="mt-5">
                    <label className="h3 form-label"> Customer Name</label>
                    <input value={formData.fullName} name="fullName" type="text" className="form-control" onChange={handleChange}/>
                </div>
                <div className="mt-5">
                    <label className="h3 form-label"> PhoneNo</label>
                    <input value={formData.phoneNo} name="phoneNo" type="text" className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-5">
                    <label className="h3 form-label"> Email</label>
                    <input value={formData.email} name="email" type="text" className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-5">
                    <label className="h3 form-label"> Address</label>
                    <input value={formData.address} name="address" type="text" className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-5">
                    <label className="h3 form-label"> Age</label>
                    <input value={formData.age} name="age" type="text" className="form-control" onChange={handleChange} />
                </div>

                <button onClick={handleSubmit} className="btn btn-success btn-lg w-10 mt-5">Submit</button>
                <button onClick={()=>props.onCustUpdated(null)} className="btn btn-secondary btn-lg w-10 mt-5">Cancel</button>
            </form>
       
        )
}