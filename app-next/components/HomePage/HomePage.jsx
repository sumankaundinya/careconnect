import Link from "next/link";
import styles from "./Homepage.module.css";
import Card from "../Card/Card";

export default function Homepage() {
  const featureCards = [
    {
      title: "Request Assistance",
      content:
        "Elderly people can request help for groceries, transportation, or daily needs.",
    },
    {
      title: "Offer Help",
      content:
        "Volunteers and caregivers can provide support to those who need it.",
    },
    {
      title: "Community Support",
      content:
        "Build meaningful connections and strengthen the local community.",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroCard}>
          <h1>CareConnect</h1>
          <p>Connecting elderly people with helpers in their community</p>
          <div className={styles["button-group"]}>
            <Link
              href="/volunteers"
              className={`${styles.button} ${styles.request}`}
            >
              Volunteers
            </Link>
            <Link
              href="/offer-help"
              className={`${styles.button} ${styles.offer}`}
            >
              Offer Help
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        {featureCards.map((card, index) => (
          <Card key={index} title={card.title} content={card.content} />
        ))}
      </section>
    </div>
  );
}
