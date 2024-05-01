import React, { useState, useEffect } from 'react';
import Ticket from './Ticket.jsx';
import {
  Link
} from "react-router-dom";

const AdminPage = () => {
  const [tickets, setTickets] = useState([]);

  async function getTickets() {
    const res = await fetch(process.env.REACT_APP_TICKETS_API_ENDPOINT);
    const newTickets = await res.json()
    setTickets(newTickets)
  }

  useEffect(() => {
    getTickets()
  },[])

  useEffect(() => {
    console.log(tickets)
  }, [tickets])

  return <>
    <h1>Admin Page!</h1>

    <Link to="/">Back to Main Page</Link>

    {tickets.map((ticket) => {
      return <Ticket id={ticket.id}
      name={ticket.name} email={ticket.email} 
      description={ticket.description} status={ticket.status} 
      getTickets={getTickets} />
    })}
  </>;
}

export default AdminPage;