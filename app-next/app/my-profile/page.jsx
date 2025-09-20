"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VolunteerProfileForm from "@/components/VolunteerProfile/VolunteerProfileForm";
import OfferHelpForm from "@/components/OfferHelp/OfferHelpForm";
import { useAuthStore } from "@/store/useAuthStore";

export default function MyProfilePage() {
  const { user, token } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!token || !user) {
      router.push("/login");
    } else if (user.role !== "VOLUNTEER") {
      router.push("/");
    } else {
      setIsCheckingAuth(false);
    }
  }, [user, token, router]);

  if (isCheckingAuth || !user || user.role !== "VOLUNTEER") {
    return null;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>My Profile</h1>

      <VolunteerProfileForm />
      <OfferHelpForm />
    </div>
  );
}
