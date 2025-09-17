"use client";

import VolunteerList from "@/components/VolunteerList/VolunteerList";
import styles from "../../components/VolunteerList/VolunteerList.module.css";

export default function VolunteersPage() {
  return (
    <div className={styles.container}>
      <VolunteerList />
    </div>
  );
}
