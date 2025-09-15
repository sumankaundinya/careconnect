"use client";
import VolunteerDetail from "@/components/VolunteerDetail/VolunteerDetail";
import React from "react";
export default function VolunteerDetailPage({ params: paramsPromise }) {
  const params = React.use(paramsPromise);

  return <VolunteerDetail volunteerId={params.id} />;
}
