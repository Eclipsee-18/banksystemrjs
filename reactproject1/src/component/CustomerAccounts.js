import { Button } from 'bootstrap';
import React, { useState } from 'react';



export default function CustomerAccounts(props) {

    const [accts, setAccts] = useState([]);
    const [acctid, setAcctid] = useState([]);
    const [point, setPoint] = useState({});
    const cusid = props.data;

    const [acctCurrentlyBeingUpdated, setacctCurrentlyBeingUpdated] = useState(null);
    const [showingCreateNewAcctForm, setshowingCreateNewAcctForm] = useState(false);

    function getAccts() {
        const url = 'http://localhost:5095/api/accounts';

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(custsFromServer => {
                console.log(custsFromServer)
                setAccts(custsFromServer);
                console.log(accts);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    function getAccountbycusId(id) {
        

        const url = 'http://localhost:5095/api/accounts/' + id;

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(custsFromServer => {
                console.log(custsFromServer);

                setAcctid(custsFromServer);

                console.log(acctid);

            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    function deleteAcct(id) {
        const url = 'http://localhost:5095/api/accounts/deleteAccount/' + id;

        fetch(url, {
            method: 'DELETE'
        })
            .then(response => response)
            .then(responseFromServer => {
                console.log(responseFromServer);
                onAcctDeleted(id);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    function getLoyaltyofAcct(id) {

        const url = 'http://localhost:5095/api/LoyaltyPoints/'+id ;

        fetch(url, {
            method: 'GET',
           
        })
            .then(response => response.json())
            .then(custsFromServer => {
                console.log(custsFromServer);

                setPoint(custsFromServer);

                console.log(point);

            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

    }

      return (

          <div className="mt-5">
              
              <h1  align="center">Accounts of Customer "{cusid}" </h1>
              <button onClick={() => getAccountbycusId(cusid)} className="btn btn-dark btn-lg w-30" >Show Accounts </button>
              <button onClick={() => setshowingCreateNewAcctForm(true)} className="btn btn-success btn-lg w-30 mx-5 ">Create New Account</button>
              
              {showingCreateNewAcctForm && <AcctCreateForm onCustCreated={onAcctCreated}  />}
              {acctid.length > 0 && renderAccountbyIdTable()}
              {point.id!=null && showLoyalty()}
              {acctCurrentlyBeingUpdated !== null && <AcctUpdateForm acct={acctCurrentlyBeingUpdated} onAcctUpdated={onAcctUpdated} />}
              
        </div>

    )

    

    function renderAccountbyIdTable() {
        return (
            <div className="table-responsive mt-5">

                <table className="table table-bordered border-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id(PK)</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Account Type</th>

                        </tr>
                    </thead>
                    <tbody>
                        {acctid.map((acct) => (
                            <tr key={acct.id}>
                                <th scope="row">{acct.id}</th>

                                <td> {acct.balance}</td>
                                <td> {acct.accountType}</td>

                                <td >
                                    {<button onClick={() => setacctCurrentlyBeingUpdated(acct)} className="btn btn-primary btn-sm mx-3 my-3">Update</button>}
                                    <button onClick={() => getLoyaltyofAcct(acct.id)} className="btn btn-dark btn-sm w-30">Points </button>
                                {<button onClick={() => { if (window.confirm(`Are you sure?`)) deleteAcct(acct.id) }} className="btn btn-danger btn-sm mx-3">Delete</button>}

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

                <button onClick={() => setAcctid([])} className="btn btn-dark btn-sm w-10">Close </button>
            </div>
        );
    }

    function onAcctDeleted(deletedAcctid) {



        let acctsCopy = [...acctid];

        const index = acctsCopy.findIndex((acctsCopyAcct, currentIndex) => {
            if (acctsCopyAcct.id === deletedAcctid) {
                return true;
            }
        });
        if (index !== -1) {
            acctsCopy.splice(index, 1);
        }
        setAcctid(acctsCopy);

        alert(`Customer Deleted`);
    }

    function onAcctUpdated(updatedAcct) {
        setacctCurrentlyBeingUpdated(null)

        if (updatedAcct == null) {
            return;
        }

        let acctidCopy = [...acctid];

        const index = acctidCopy.findIndex((acctidCopyAcct, currentIndex) => {
            if (acctidCopyAcct.id === updatedAcct.id) {
                return true; 
            }
        });
        if (index !== -1) {
            acctidCopy[index] = updatedAcct;
        }
        setAcctid(acctidCopy);

        alert("Customer Updated");
    }

    function AcctUpdateForm(props) {
        const initialFormData = Object.freeze({
            balance: props.acct.balance,
            accountType:props.acct.accountType
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

            const acctToUpdate = {
                id: props.acct.id,
                balance: formData.balance,
                accountType: formData.accountType
            };
            const aid = props.acct.id

            const url = 'http://localhost:5095/api/accounts/updateAccount/' + aid;

            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(acctToUpdate)
            })
                .then(response => response)
                .then(responseFromServer => {
                    console.log(responseFromServer);

                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
            onAcctUpdated(acctToUpdate);
        };

        return (
           
            <form className="w-10 px-5">
                <h1 className="mt-5"> Update Account "{props.acct.id}".</h1>
                <div className="mt-5">
                    <label className="h3 form-label"> Account Balance</label>
                    <input value={formData.balance} name="balance" type="text" className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-5">
                    <label className="h3 form-label"> Account Type</label>
                    <input value={formData.accountType} name="accountType" type="text" className="form-control" onChange={handleChange} />
                </div>
                

                <button onClick={handleSubmit} className="btn btn-success btn-lg w-10 mt-5">Submit</button>
                <button onClick={() => onAcctUpdated(null)} className="btn btn-secondary btn-lg w-10 mt-5">Cancel</button>
            </form>

        )
    }

    function onAcctCreated(createdAcct) {
        setshowingCreateNewAcctForm(false);
        if (createdAcct === null) {
            return;
        }
        alert("Account Added");

        getAccountbycusId(cusid);
    }

    function AcctCreateForm(props) {


        const initialFormData = Object.freeze({
            balance: "10000",
            accountType: "savings",
       
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

            const acctToCreate = {

                balance: formData.balance,
                accountType: formData.accountType
                
            };

            const url = 'http://localhost:5095/api/accounts/createAccount/' + cusid;

            fetch(url, {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(acctToCreate)
            })
                .then(response => response)
                .then(responseFromServer => {
                    console.log(responseFromServer);

                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
            onAcctCreated(acctToCreate);
        };

        return (
            <div>
            <h1 className="mt-5" align="center">Create New Account for Customer '{cusid}'</h1>
            <form className="w-50 px-5">
                
                <div className="mt-3">
                    <label className="h3 form-label"> Customer Name</label>
                    <input value={formData.balance} name="balance" type="text" className="form-control" onChange={handleChange} />
                </div>
                <div className="mt-3">
                    <label className="h3 form-label"> PhoneNo</label>
                    <input value={formData.accountType} name="accountType" type="text" className="form-control" onChange={handleChange} />
                </div>
                

                <button onClick={handleSubmit} className="btn btn-dark btn-lg w-10 mt-5 mb-5">Submit</button>
                <button onClick={() => onAcctCreated(null)} className="btn btn-secondary btn-lg w-10 mt-5 mx-3 mb-5">Cancel</button>
                </form>
            </div>

        )
    }

    function showLoyalty() {
        return(
            <div className="table-responsive mt-5">
                <h3 align="center">Loyalty points of Account: {point.points}</h3>
            

            <button onClick={() => setPoint([])} className="btn btn-dark btn-sm w-10">Close </button>
        </div>
        );
    }
}

