"use client";

import { Suspense } from "react";
import VolunteerList from "@/components/VolunteerList/VolunteerList";
import styles from "../../components/VolunteerList/VolunteerList.module.css";

export default function VolunteersPage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading volunteers...</div>}>
        <VolunteerList />
      </Suspense>
    </div>
  );
}
