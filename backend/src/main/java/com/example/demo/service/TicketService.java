package com.example.demo.service;

import com.example.demo.model.Ticket;
import com.example.demo.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> getTicketById(String id) {
        return ticketRepository.findById(id);
    }

    public Ticket saveTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(String id, Ticket ticketDetails) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));

        if (ticketDetails.getName() != null) {
            ticket.setName(ticketDetails.getName());
        }
        if (ticketDetails.getEmail() != null) {
            ticket.setEmail(ticketDetails.getEmail());
        }
        if (ticketDetails.getDescription() != null) {
            ticket.setDescription(ticketDetails.getDescription());
        }
        if (ticketDetails.getStatus() != null) {
            ticket.setStatus(ticketDetails.getStatus());
        }

        return ticketRepository.save(ticket);
    }

    public void deleteTicket(String id) {
        ticketRepository.deleteById(id);
    }
}
