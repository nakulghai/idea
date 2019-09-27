import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Form = () => {
    const data = useSelector(state => state.data);
    const [formData, setFormData] = useState({
        name: data.name,
        dob: data.dob,
        docType: data.docType,
        docId: data.docId
    });

    const handleChange = (event) => {
        console.log("handle");
        event.preventDefault();
        setFormData({...formData, [event.target.id]: event.target.value});
    }
    return(
        <div className="row">
            <form className="col s12">
                <div className="input-field col s10">
                    <h5 className = 'center-align' htmlFor="name">Mortgage Application Form</h5>
                    <hr />
                </div>
                <div className="row">
                    <div className="input-field col s10">
                        <input onChange = {handleChange} value={formData.name} id="name" type="text" className="validate"/>
                        <label className="active" htmlFor="name">First Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s10">
                        <input onChange = {handleChange} value={formData.docType} id="docType" type="text" className="validate"/>
                        <label className="active" htmlFor="docType">Doument Type</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s10">
                        <input onChange = {handleChange} value={formData.docId} id="docId" type="text" className="validate"/>
                        <label className="active" htmlFor="docId">Document Id</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s10">
                        <input onChange = {handleChange} value={formData.dob} id="dob" type="text" className="validate"/>
                        <label className="active" htmlFor="dob">Date of birth</label>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;