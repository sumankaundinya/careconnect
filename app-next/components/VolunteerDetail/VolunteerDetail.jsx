"use client";
import React, { useEffect, useState } from "react";
import styles from "./VolunteerDetail.module.css";
import { useAuthStore } from "@/store/useAuthStore";

const VolunteerDetail = ({ volunteerId }) => {
  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  const fetchVolunteer = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/volunteers/${volunteerId}`
      );
      const data = await res.json();
      setVolunteer(data);
    } catch (error) {
      console.error("Failed to fetch volunteer:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteer();
  }, [volunteerId]);

  const handleDeleteAvailability = async (slotId) => {
    if (!user) {
      alert("You must be logged in to delete availability.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this availability?")) {
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/available-time/${slotId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete availability");

      setVolunteer((prev) => ({
        ...prev,
        availability: prev.availability.filter((slot) => slot.id !== slotId),
      }));
    } catch (err) {
      console.error("Error deleting availability:", err);
      alert("Failed to delete availability. Try again.");
    }
  };

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
              <div key={slot.id || idx} style={{ marginBottom: "10px" }}>
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
                <br />
                {user &&
                  (user.role === "ADMIN" || user.role === "VOLUNTEER") && (
                    <button
                      onClick={() => handleDeleteAvailability(slot.id)}
                      style={{
                        marginTop: "5px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  )}
                <hr />
              </div>
            ))
          : "Not specified"}
      </div>
    </div>
  );
};

export default VolunteerDetail;
