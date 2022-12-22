import { Button } from 'bootstrap';
import React, { useState } from 'react';



export default function CustCreateForm(props) {

    
    const initialFormData = Object.freeze({
        fullName: "Full Name",
        phoneNo: "123456",
        email: "x@com",
        address: "xxxx",
        age: "20"

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

        const custToCreate = {

            fullName: formData.fullName,
            phoneNo: formData.phoneNo,
            email: formData.email,
            address: formData.address,
            age: formData.age
        };

        const url = 'http://localhost:5095/api/customer/addCustomer';

        fetch(url, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(custToCreate)
        })
            .then(response => response)
            .then(responseFromServer => {
                console.log(responseFromServer);
                
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        props.onCustCreated(custToCreate);
    };

    return (
        
            <form className="w-100 px-5">
                <h1 className="mt-5">Create New Customer</h1>
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
                <button onClick={()=>props.onCustCreated(null)} className="btn btn-secondary btn-lg w-10 mt-5">Cancel</button>
            </form>
       
        )
}