import { v4 as uuidv4 } from "uuid";
import TicketModel from "../model/ticket.js";

const CREATE_TICKET = async (req, res) => {
  try {
    const ticket = {
      title: req.body.title,
      ticket_price: req.body.ticket_price,
      from_location: req.body.from_location,
      to_location: req.body.to_location,
      to_location_photo_url: req.body.to_location_photo_url,
      id: uuidv4(),
    };

    const response = new TicketModel(ticket);

    await response.save();

    return res.status(201).json({ message: "Ticket was created", response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in application" });
  }
};

const GET_USER_TICKETS = async (req, res) => {
  try {
    const response = await TicketModel.find({
      userId: req.params.userId,
    });

    console.log(response);
    return res.status(200).json({ tickets: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in application" });
  }
};

const GET_TICKET_BY_ID = async (req, res) => {
  try {
    const response = await TicketModel.findOne({ id: req.params.id });

    return res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in application" });
  }
};

const DELETE_TICKET_BY_ID = async (req, res) => {
  try {
    const ticket = await TicketModel.findOne({ id: req.params.id });

    if (!ticket) {
      return res.status(404).json({ message: "This ticket doesn't exist." });
    }

    if (ticket.userId !== req.user.id) {
      return res.status(403).json({
        message: "We can only delete ticket that belongs to user.",
      });
    }

    await TicketModel.deleteOne({ id: req.params.id });

    return res.status(200).json({ message: "Ticket was deleted." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in application" });
  }
};

export {
  CREATE_TICKET,
  GET_USER_TICKETS,
  GET_TICKET_BY_ID,
  DELETE_TICKET_BY_ID,
};
