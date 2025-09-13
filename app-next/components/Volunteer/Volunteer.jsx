import React from "react";
import styles from "../Volunteer/Volunteer.module.css";
import Link from "next/link";

const Volunteer = ({ volunteer }) => {
  return (
    <div className={styles.volunteer}>
      <div className={styles.imageContainer}>
        {volunteer.photo ? (
          <img
            src={volunteer.photo}
            alt={volunteer.name}
            className={styles.volunteerImage}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>No Photo</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{volunteer.name}</h3>
        <p className={styles.address}>Address: {volunteer.address}</p>
        <p>Email: {volunteer.email}</p>
        <p>Phone: {volunteer.phone_nr}</p>
        <p>Gender: {volunteer.gender}</p>
        <p>Routine: {volunteer.routine || "Not specified"}</p>

        <Link
          href={`/volunteers/${volunteer.id}`}
          className={styles.detailsButton}
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default Volunteer;
