import React, { useState, useEffect } from 'react';
import TicketModal from './TicketModal.jsx';
import './styles/Ticket.css';

const Ticket = ({ id, name, email, description, status, getTickets }) => {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="ticket">
      <h2 className="ticket-title">{name}</h2>
      <p className="ticket-email">Email: {email}</p>
      <p className="ticket-description">Description: {description}</p>
      <p className="ticket-status">Status: {status}</p>
      <button onClick={handleOpen} className="ticket-button">Update Ticket</button>
      <TicketModal open={open} onClose={handleClose} id={id}
      email={email} name={name} status={status}
      getTickets={getTickets}
       />
    </div>
  );
}

export default Ticket;