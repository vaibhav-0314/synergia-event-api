import express from "express";

const app = express();
const PORT = 5001;

app.use(express.json());

let bookings = [
  {
    id: 1,
    name: "Vaibhav DS",
    email: "vaibhav@example.com",
    event: "AI & ML Workshop",
  },
  {
    id: 2,
    name: "Sumangala Gouda",
    email: "sumangala@example.com",
    event: "Web Development Bootcamp",
  },
  {
    id: 3,
    name: "Shabari N",
    email: "shabari@example.com",
    event: "Cybersecurity Awareness Workshop",
  },
];

app.get("/api/bookings", (req, res) => {
  res.status(200).json(bookings);
});


app.post("/api/bookings", (req, res) => {
  const { name, email, event } = req.body;

  if (!name || !email || !event) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newBooking = {
    id: bookings.length + 1,
    name,
    email,
    event,
  };

  bookings.push(newBooking);
  res.status(201).json({
    message: "Booking added successfully",
    booking: newBooking,
  });
});


app.put("/api/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Booking not found" });
  }

  const { name, email, event } = req.body;
  bookings[index] = {
    ...bookings[index],
    name: name || bookings[index].name,
    email: email || bookings[index].email,
    event: event || bookings[index].event,
  };

  res.status(200).json({
    message: "Booking updated successfully",
    booking: bookings[index],
  });
});


app.delete("/api/bookings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Booking not found" });
  }

  bookings.splice(index, 1);
  res.status(200).json({ message: "Booking cancelled successfully" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
