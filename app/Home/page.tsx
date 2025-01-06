"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import Menu from "@/components/Menu";
import Coin from "@/components/Coin";
import YourAccount from "@/components/YourAccount";
import Event from "@/components/popover/Event";
import Store from "@/components/popover/Store";
import Pictures from "@/components/popover/Pictures";
import Account from "@/components/popover/Account";
import TopNav from "@/components/topNav";
import { createClient } from "@supabase/supabase-js";

// Dynamically import the Map component without server-side rendering (SSR)
const Map = dynamic(() => import("../../components/Map"), { ssr: true });

export default function Home() {
  const { data: session } = useSession();

  // Redirect to login if the session is not available
  if (!session) {
    redirect("/Login");
  }

  // Initialize Supabase client
  const supabaseAuth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: "next_auth" } }
  );

  const [active, setActive] = useState("home");
  const [center, setCenter] = useState<[number, number]>([
    -1.6282904, 49.6299822,
  ]); // Initial map center
  const [typeAuthResolved, setTypeAuthResolved] = useState<string | null>(null);

  // Utility functions
  const prenom = () => {
    const nameParts = session?.user?.name?.split(" ");
    return nameParts ? nameParts[0] : "François";
  };

  const nom = () => {
    const nameParts = session?.user?.name?.split(" ");
    return nameParts ? nameParts[1].toUpperCase() : "SOLEIL";
  };

  const email = () => session?.user?.email ?? "";

  const pseudo = () => {
    const firstChar = prenom().charAt(0).toLowerCase();
    const lastName = nom();
    const sizeNom = lastName.length;

    if (sizeNom <= 6) {
      return firstChar + lastName.toLowerCase();
    } else {
      return firstChar + lastName.slice(0, 6).toLowerCase();
    }
  };

  const imgProfil = () => session?.user?.image ?? "/images/profile.png";

  // Function to fetch typeAuth from Supabase
  const fetchTypeAuth = async () => {
    const userName = session?.user?.name;
    if (!userName) {
      console.error("User name is missing");
      return null;
    }

    try {
      // Request for retrieving typeAuth from Supabase
      const { data, error } = await supabaseAuth
        .from("accounts")
        .select("type, users!inner(name)")
        .eq("users.name", userName)
        .single();

      if (error) {
        console.error("Error fetching typeAuth:", error.message || error);
        return null;
      }

      console.log("Fetched typeAuth:", data); // For debugging
      return data?.type ?? null; // Return null type if not found
    } catch (err) {
      console.error("Unexpected error fetching typeAuth:", err);
      return null;
    }
  };

  useEffect(() => {
    const resolveTypeAuth = async () => {
      const type = await fetchTypeAuth();
      setTypeAuthResolved(type);
    };

    resolveTypeAuth();
  }, [session?.user?.name]); // Effect depends on session's user name

  const handleClickActive = (a: string) => {
    setActive(a);
  };

  const updateCenter = (newCenter: [number, number]) => {
    setCenter(newCenter);
  };

  return (
    <>
      <YourAccount nom={session.user?.name ?? ""} />
      <Menu active={active} handleClickActive={handleClickActive} />
      {active === "home" && <TopNav onCenterChange={updateCenter} />}
      <Map
        zoom={2}
        bounds={[
          [-5.1535428, 42.5314237],
          [7.3190333, 51.0605319],
        ]}
        center={center}
      />
      {active === "calendar" && <Event />}
      {active === "coin" && <Store />}
      {active === "picture" && <Pictures />}
      {active === "account" && (
        <Account
          active={active}
          handleClickActive={handleClickActive}
          nom={nom()}
          prenom={prenom()}
          pseudo={pseudo()}
          email={email()}
          imgProfile={imgProfil()}
          typeAuth={typeAuthResolved ?? "unknown"} // Default to "unknown" if not resolved
        />
      )}
      <Coin active={active} handleClickActive={handleClickActive} />
      <Image
        src="/images/soupex.png"
        width={75}
        height={75}
        alt="Logo Soupex"
        className="absolute z-50 bottom-3 right-3"
      />
    </>
  );
}
