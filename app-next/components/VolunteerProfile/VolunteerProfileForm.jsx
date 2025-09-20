"use client";

import { useEffect, useState } from "react";
import styles from "./VolunteerProfileForm.module.css";

export default function VolunteerProfileForm() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [volunteer, setVolunteer] = useState({
    name: "",
    email: "",
    phone_nr: "",
    address: "",
    post_nr: "",
    routine: "",
    photo: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch logged-in volunteer profile
  useEffect(() => {
    const fetchVolunteer = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errData = await res.json();
          setError(errData.error || "Failed to fetch profile");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setVolunteer(data);
      } catch (err) {
        console.error("Error fetching volunteer:", err);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteer();
  }, [API_URL]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteer((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile via /api/me
  const handleSaveProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(volunteer),
      });

      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        alert("Error updating profile: " + (errorData.error || ""));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Volunteer Profile</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Basic Information</h3>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={volunteer.name || ""}
          onChange={handleChange}
          className={styles.inputField}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={volunteer.email || ""}
          onChange={handleChange}
          className={styles.inputField}
        />

        <input
          type="text"
          name="phone_nr"
          placeholder="Phone"
          value={volunteer.phone_nr || ""}
          onChange={handleChange}
          className={styles.inputField}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={volunteer.address || ""}
          onChange={handleChange}
          className={styles.inputField}
        />

        <input
          type="text"
          name="post_nr"
          placeholder="Postal Code"
          value={volunteer.post_nr || ""}
          onChange={handleChange}
          className={styles.inputField}
        />

        <input
          type="text"
          name="routine"
          placeholder="Routine"
          value={volunteer.routine || ""}
          onChange={handleChange}
          className={styles.inputField}
        />

        <input
          type="text"
          name="photo"
          placeholder="Profile Picture URL"
          value={volunteer.photo || ""}
          onChange={handleChange}
          className={styles.inputField}
        />

        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={volunteer.gender || ""}
          onChange={handleChange}
          className={styles.inputField}
        />

        <button onClick={handleSaveProfile} className={styles.button}>
          Save Profile
        </button>
      </div>
    </div>
  );
}
