"use client";

import React from "react";
import styles from "./SortControl.module.css";

const SortControl = ({ sortKey, setSortKey }) => {
  return (
    <div className={styles.sortControls}>
      <label>
        Sort by:
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="">-- None --</option>
          <option value="name">Name</option>
          <option value="address">Location</option>
          <option value="availability">Availability</option>
        </select>
      </label>
    </div>
  );
};

export default SortControl;
