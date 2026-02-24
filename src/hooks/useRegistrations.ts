"use client";

import { useState, useEffect, useCallback } from "react";
import { Registration } from "@/types/registration";
import { getRegistrations } from "@/lib/registration-store";

export function useRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setRegistrations(getRegistrations());
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { registrations, loading, refresh };
}
