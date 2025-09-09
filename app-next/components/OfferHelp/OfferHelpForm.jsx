"use client";

import { useState, useEffect } from "react";
import styles from "./OfferHelpPage.module.css";
import ServiceSelect from "./ServiceSelect";
import AvailabilityPicker from "./AvailabilityPicker";
import SubmitButton from "./SubmitButton";

export default function OfferHelpForm() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const volunteerId = 1;

    try {
      await fetch("/api/volunteer-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteer_id: volunteerId,
          service_id: selectedService,
        }),
      });

      await fetch("/api/available-time", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteer_id: volunteerId,
          available_from: availableFrom,
          available_to: availableTo,
        }),
      });

      alert("Offer help submitted successfully ✅");
    } catch (error) {
      console.error("Error submitting offer help:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Offer Help</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <ServiceSelect
          services={services}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          styles={styles}
        />
        <AvailabilityPicker
          availableFrom={availableFrom}
          setAvailableFrom={setAvailableFrom}
          availableTo={availableTo}
          setAvailableTo={setAvailableTo}
          styles={styles}
        />
        <SubmitButton handleSubmit={handleSubmit} styles={styles} />
      </form>
    </div>
  );
}
