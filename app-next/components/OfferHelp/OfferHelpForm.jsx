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
  const [volunteerId, setVolunteerId] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchVolunteer = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch volunteer profile");
        const data = await res.json();
        setVolunteerId(data.id);
      } catch (err) {
        console.error("Error fetching volunteer:", err);
      }
    };

    fetchVolunteer();
  }, [API_URL]);

  useEffect(() => {
    if (!API_URL) return;

    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_URL}/api/services`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!volunteerId) {
      alert("You must be logged in to submit.");
      return;
    }

    try {
      await fetch(`${API_URL}/api/volunteer-services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteer_id: volunteerId,
          service_id: selectedService,
        }),
      });

      await fetch(`${API_URL}/api/available-time`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          volunteer_id: volunteerId,
          service_id: selectedService,
          available_from: availableFrom,
          available_to: availableTo,
        }),
      });

      alert("Offer help submitted successfully!");
    } catch (error) {
      console.error("Error submitting offer help:", error);
      alert("Something went wrong");
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
