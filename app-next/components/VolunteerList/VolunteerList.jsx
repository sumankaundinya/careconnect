"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./VolunteerList.module.css";
import Volunteer from "../Volunteer/Volunteer";
import SortControl from "../SortControl/SortControl";

const mockVolunteers = [
  {
    id: 1,
    name: "Anna Smith",
    email: "anna@example.com",
    address: "Copenhagen",
    photo: "/images/volunteer1.jpg",
    services: ["Shopping", "Cooking"],
    availability: "Weekdays, 9am - 1pm",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    address: "Aarhus",
    photo: "/images/volunteer2.jpg",
    services: ["Gardening", "Companionship"],
    availability: "Weekends, 4pm - 8pm",
  },
];

export default function VolunteersList() {
  const [volunteers, setVolunteers] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sortKey, setSortKey] = useState(searchParams.get("sortKey") || "");

  useEffect(() => {
    setVolunteers(mockVolunteers);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (sortKey) params.set("sortKey", sortKey);
    router.replace(`?${params.toString()}`);
  }, [sortKey, router]);

  const sortedVolunteers = sortKey
    ? [...volunteers].sort((a, b) =>
        (a[sortKey] || "")
          .toString()
          .localeCompare((b[sortKey] || "").toString())
      )
    : volunteers;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Available Volunteers</h2>
      <SortControl sortKey={sortKey} setSortKey={setSortKey} />
      <div className={styles.grid}>
        {sortedVolunteers.map((v) => (
          <Volunteer key={v.id} volunteer={v} />
        ))}
      </div>
    </div>
  );
}
