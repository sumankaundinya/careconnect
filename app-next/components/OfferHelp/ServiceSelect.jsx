"use client";

export default function ServiceSelect({
  services,
  selectedService,
  setSelectedService,
  styles,
}) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>Choose a service:</label>
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        className={styles.input}
        required
      >
        <option value="">-- Select a service --</option>
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {service.description}
          </option>
        ))}
      </select>
    </div>
  );
}
