const handleAboutForm = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // For now, we'll just log the data to the console
  // In the future (if the team decide), we could save this to a database or send an email
  console.log("About form submission:");
  console.log({ name, email, message });

  res.status(200).json({ message: "Message received successfully!" });
};

module.exports = { handleAboutForm };
