import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import "./styles/MainPage.css";

const MainPage = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    description: ""
  })

  function handleFieldChange(e) {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const ticket = {
      name: formFields.name,
      email: formFields.email,
      description: formFields.description
    }

    try {
      const response = await fetch(process.env.REACT_APP_TICKETS_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to submit ticket.');
    }

    setFormFields({ name: "", email: "", description: "" })
  }

  return (
    <div className="main-container">
      <h1 className="header">Submit a Ticket to the Help Desk!</h1>
      <Link to="admin" className="link">Admin Page</Link>
      <div className="form-group">
        <input className="input" name="name" placeholder="Name" value={formFields.name} onChange={handleFieldChange} type="text" />
      </div>
      <div className="form-group">
        <input className="input" name="email" placeholder="Email" value={formFields.email} onChange={handleFieldChange} type="text" />
      </div>
      <div className="form-group">
        <input className="input" name="description" placeholder="Description" value={formFields.description} onChange={handleFieldChange} type="text" />
      </div>
      <button className="button" onClick={handleSubmit}>Submit</button>
      <Outlet />
    </div>);
}

export default MainPage;