// src/controller/aboutController.js

export const handleAboutForm = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log("About form submission:", { name, email, message });

  res.status(200).json({ message: "Message received successfully!" });
};
