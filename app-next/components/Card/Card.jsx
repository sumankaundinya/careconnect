import styles from "./Card.module.css";

export default function Card({ title, content, icon }) {
  return (
    <div className={styles.card}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardContent}>{content}</p>
    </div>
  );
}
