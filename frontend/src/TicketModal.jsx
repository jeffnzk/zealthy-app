import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, ButtonGroup, Button, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TicketModal = ({ open, onClose, id, email, name, status, getTickets }) => {
  const [response, setResponse] = useState('');
  const [ticketStatus, setTicketStatus] = useState(status);

  async function handleSend() {
    let newStatus = 'NEW'

    if(ticketStatus === "New") {
      newStatus = "NEW"
    } else if (ticketStatus === "In Progress") {
      newStatus = "IN_PROGRESS"
    } else if (ticketStatus === "Resolved") {
      newStatus = "RESOLVED"
    }

    const newTicketStatus = {"status": newStatus}

    const res = await fetch(process.env.REACT_APP_TICKETS_API_ENDPOINT + "/" + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTicketStatus)
    })

    getTickets() // for updating UI with updated ticket status immediately
    console.log(res)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Ticket: {name}
        </Typography>
        <TextField
          fullWidth
          label={`Send message to ${email}`}
          variant="outlined"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          sx={{ mt: 2 }}
        />
        <ButtonGroup fullWidth sx={{ mt: 2 }} aria-label="ticket status">
          {['New', 'In Progress', 'Resolved'].map((item) => (
            <Button
              key={item}
              variant={ticketStatus === item ? 'contained' : 'outlined'}
              onClick={() => setTicketStatus(item)}
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
        <Button 
        onClick={handleSend}
        sx={{ mt: 2, width: '100%' }}>
          Send Message and Update
        </Button>
      </Box>
      </Modal>
  );
}

export default TicketModal;