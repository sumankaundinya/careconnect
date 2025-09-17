"use client";
import React, { useEffect, useState } from "react";
import styles from "./VolunteerDetail.module.css";

const VolunteerDetail = ({ volunteerId }) => {
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteer = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/volunteers/${volunteerId}`
        );
        const data = await res.json();
        setVolunteer(data);
      } catch (error) {
        console.error("Failed to fetch volunteer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteer();
  }, [volunteerId]);

  if (loading) return <p>Loading volunteer...</p>;
  if (!volunteer) return <p>Volunteer not found.</p>;

  return (
    <div className={styles.volunteerDetail}>
      <h1>Volunteer Details</h1>
      <h2>{volunteer.name}</h2>
      <span>Email: {volunteer.email}</span>
      <br />
      <span>Phone: {volunteer.phone_nr}</span>
      <br />
      <span>Gender: {volunteer.gender}</span>
      <br />
      <span>Address: {volunteer.address}</span>
      <br />
      <span>Routine: {volunteer.routine || "Not specified"}</span>
      <br />

      <div>
        <span>Services & Availability:</span>
        {volunteer.availability?.length
          ? volunteer.availability.map((slot, idx) => (
              <div key={idx}>
                <span>
                  {idx + 1}. {slot.service}
                </span>
                <br />
                From:{" "}
                {new Date(slot.available_from).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                → To:{" "}
                {new Date(slot.available_to).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            ))
          : "Not specified"}
      </div>
    </div>
  );
};

export default VolunteerDetail;
