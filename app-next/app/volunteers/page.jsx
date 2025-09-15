"use client";

import VolunteerList from "@/components/VolunteerList/VolunteerList";
import styles from "../../components/VolunteerList/VolunteerList.module.css";

export default function VolunteersPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Volunteers</h1>
      <VolunteerList />
    </div>
  );
}
