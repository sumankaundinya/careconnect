"use client";
import Link from "next/link";
import { Heart, Users, Smartphone, Utensils, Car, Home } from "lucide-react";

import styles from "./Services.module.css";
import Card from "../Card/Card";

export default function Services() {
  const services = [
    {
      title: "Personal Care Support",
      description:
        "Extra help with daily routines like dressing, bathing, or mobility beyond kommune SOSU services.",
      icon: <Heart />,
    },
    {
      title: "Companionship & Social Visits",
      description:
        "Friendly visits, conversations, reading, or walks to reduce loneliness and improve wellbeing.",
      icon: <Users />,
    },
    {
      title: "Digital Assistance",
      description:
        "Support with smartphones, tablets, NemID/MitID, e-Boks, online doctor appointments, and more.",
      icon: <Smartphone />,
    },
    {
      title: "Healthy Living & Meals",
      description:
        "Help preparing healthy meals, light exercise, or hobbies like gardening, knitting, and music.",
      icon: <Utensils />,
    },
    {
      title: "Transport & Errands",
      description:
        "Accompaniment to hospital visits, shopping, hairdresser, or community events.",
      icon: <Car />,
    },
    {
      title: "Family & Caregiver Support",
      description:
        "Short-term relief for family caregivers, or emergency backup when kommune helpers are delayed.",
      icon: <Home />,
    },
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Our Services</h1>

      <div className={styles.grid}>
        {services.map((service, index) => (
          <Card
            key={index}
            title={service.title}
            content={service.description}
            icon={service.icon}
          />
        ))}
      </div>

      <div className={styles.backLink}>
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}
