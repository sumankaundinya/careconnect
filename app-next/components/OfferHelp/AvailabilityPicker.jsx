"use client";

export default function AvailabilityPicker({
  availableFrom,
  setAvailableFrom,
  availableTo,
  setAvailableTo,
  styles,
}) {
  return (
    <>
      <div className={styles.formGroup}>
        <label className={styles.label}>Available From:</label>
        <input
          type="datetime-local"
          value={availableFrom || ""}
          onChange={(e) => setAvailableFrom(e.target.value)}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Available To:</label>
        <input
          type="datetime-local"
          value={availableTo || ""}
          onChange={(e) => setAvailableTo(e.target.value)}
          className={styles.input}
          required
        />
      </div>
    </>
  );
}
