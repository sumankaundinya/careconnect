"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./VolunteerList.module.css";
import Volunteer from "../Volunteer/Volunteer";
import SortControl from "../SortControl/SortControl";

export default function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sortKey, setSortKey] = useState(searchParams.get("sortKey") || "");

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/volunteers`);

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

  if (loading) return <p className={styles.loading}>Loading volunteers...</p>;
  if (!volunteers.length)
    return <p className={styles.empty}>No volunteers found.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Available Volunteers</h2>
      <SortControl sortKey={sortKey} setSortKey={setSortKey} />
      <div className={styles.grid}>
        {sortedVolunteers.map((volunteer) => (
          <Volunteer key={volunteer.id} volunteer={volunteer} />
        ))}
      </div>
    </div>
  );
}
