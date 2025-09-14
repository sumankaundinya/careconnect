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

    fetchVolunteer();
  }, [volunteerId]);

  if (loading) return <p>Loading volunteer...</p>;
  if (!volunteer) return <p>Volunteer not found.</p>;

  return (
    <div className={styles.volunteerDetail}>
      <h2>{volunteer.name}</h2>
      <p>Email: {volunteer.email}</p>
      <p>Phone: {volunteer.phone_nr}</p>
      <p>Gender: {volunteer.gender}</p>
      <p>Address: {volunteer.address}</p>
      <p>Routine: {volunteer.routine || "Not specified"}</p>

      <p>
        Availability:{" "}
        {volunteer.availability?.length
          ? volunteer.availability
              .map((date) =>
                new Date(date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              )
              .join(", ")
          : "Not specified"}
      </p>
      <p>
        Services:{" "}
        {volunteer.services?.length
          ? volunteer.services.join(", ")
          : "Not specified"}
      </p>

      <div className={styles.reviews}>
        <h3>Reviews:</h3>
        {volunteer.reviews?.length ? (
          <ul>
            {volunteer.reviews.map((review) => (
              <li key={review.id}>
                <strong>{review.user}</strong> ({review.stars}⭐):{" "}
                {review.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default VolunteerDetail;
