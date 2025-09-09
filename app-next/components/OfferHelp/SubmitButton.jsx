"use client";

export default function SubmitButton({ handleSubmit, styles }) {
  return (
    <button type="submit" className={styles.button}>
      Submit
    </button>
  );
}
