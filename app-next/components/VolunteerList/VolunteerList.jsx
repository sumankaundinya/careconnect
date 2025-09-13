"use client";
import React, { useEffect, useState } from "react";
import Volunteer from "../Volunteer/Volunteer";
import styles from "./VolunteerList.module.css";

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/volunteers");
        const data = await res.json();
        setVolunteers(data);
      } catch (error) {
        console.error("Failed to fetch volunteers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  if (loading) return <p className={styles.loading}>Loading volunteers...</p>;
  if (!volunteers.length)
    return <p className={styles.empty}>No volunteers found.</p>;

  return (
    <div className={styles.grid}>
      {volunteers.map((volunteer) => (
        <Volunteer key={volunteer.id} volunteer={volunteer} />
      ))}
    </div>
  );
};

export default VolunteerList;
