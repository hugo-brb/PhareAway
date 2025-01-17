/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { signOut } from "next-auth/react";
import { useLighthouse } from "./lighthouse";

export type UsePlayer = {
  playerData: PlayerData;
  getPrenom: () => string;
  getNom: () => string;
  getMail: () => string;
  getPseudo: () => string;
  getIsOAuth: () => boolean;
  getBeacoins: () => number;
  getPhareended: () => Array<number>;
  getPhareendedName: (id: number) => string;
  getDlcUnlocked: () => Array<number>;
  getIsAsso: () => boolean;
  getIsAdmin: () => boolean;
  setPrenom: (prenom: string) => Promise<void>;
  setNom: (nom: string) => Promise<void>;
  setMail: (mail: string) => Promise<void>;
  setPseudo: (pseudo: string) => Promise<void>;
  setBeacoins: (beacoins: number) => Promise<void>;
  setPhareended: (Phareended: Array<number>) => Promise<void>;
  setDlcUnlocked: (DlcUnlocked: Array<number>) => Promise<void>;
  setPassword: (password: string) => Promise<void>;
  deletePlayer: () => Promise<void>;
  updatePlayerInfo: (updates: Partial<PlayerData>) => Promise<void>;
};

// Configuration Supabase
const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  { db: { schema: "next_auth" } }
);

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface PlayerData {
  user: {
    id: number;
    mail: string;
    name: string;
    pseudo: string;
    isOAuth: boolean;
  };
  beacoins: number;
  phareended: Array<number>;
  DlcUnlocked: Array<number>;
  isAsso: boolean;
  isAdmin: boolean;
}

export function usePlayer(email: string) {
  const [playerData, setPlayerData] = useState<PlayerData>({
    user: {
      id: -1,
      mail: "",
      name: "Test Test",
      pseudo: "",
      isOAuth: true,
    },
    beacoins: 0,
    phareended: [],
    DlcUnlocked: [],
    isAsso: false,
    isAdmin: false,
  });

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        if (email) {
          const requestAuth = await supabaseAuth
            .from("users")
            .select()
            .eq("email", email)
            .single();
          if (requestAuth.data) {
            const userId = requestAuth.data.id;
            const requestData = await supabaseData
              .from("users")
              .select()
              .eq("id", userId);
            setPlayerData({
              user: {
                id: userId,
                mail: email,
                name: requestAuth?.data?.name || "",
                pseudo: requestAuth?.data?.pseudo || "",
                isOAuth: requestAuth?.data?.isOAuth,
              },
              beacoins: requestData.data?.[0]?.beacoin ?? 0,
              phareended: requestData.data?.[0]?.phareended || [],
              DlcUnlocked: requestData.data?.[0]?.DlcUnlocked || [],
              isAsso: requestData.data?.[0]?.isAsso,
              isAdmin: requestData.data?.[0]?.isAdmin,
            });
          }
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des données :", e);
      }
    };

    fetchPlayerData();
  }, [email]);

  // Getters
  const methods = {
    getPrenom: () => playerData.user.name.split(" ")[0],
    getNom: () => playerData.user.name.split(" ")[1]?.toUpperCase() || "",
    getMail: () => playerData.user.mail,
    getPseudo: () => playerData.user.pseudo,
    getIsOAuth: () => playerData.user.isOAuth,
    getBeacoins: () => playerData.beacoins,
    getPhareended: () => {
      return playerData.phareended;
    },
    getPhareendedName: (id: number) => {
      return useLighthouse(id).getName();
    },

    getDlcUnlocked: () => playerData.DlcUnlocked,
    getIsAsso: () => playerData.isAsso,
    getIsAdmin: () => playerData.isAdmin,

    // Setters pour les informations de base
    setPrenom: async (prenom: string) => {
      const newName = `${prenom} ${playerData.user.name.split(" ")[1]}`;
      await supabaseAuth
        .from("users")
        .update({ name: newName })
        .eq("id", playerData.user.id);
      setPlayerData((prev) => ({
        ...prev,
        user: { ...prev.user, name: newName },
      }));
    },

    setNom: async (nom: string) => {
      const newName = `${playerData.user.name.split(" ")[0]} ${nom}`;
      await supabaseAuth
        .from("users")
        .update({ name: newName })
        .eq("id", playerData.user.id);
      setPlayerData((prev) => ({
        ...prev,
        user: { ...prev.user, name: newName },
      }));
    },

    setMail: async (mail: string) => {
      await supabaseAuth
        .from("users")
        .update({ email: mail })
        .eq("id", playerData.user.id);
      setPlayerData((prev) => ({
        ...prev,
        user: { ...prev.user, mail },
      }));
    },

    setPseudo: async (pseudo: string) => {
      await supabaseAuth
        .from("users")
        .update({ pseudo })
        .eq("id", playerData.user.id);
      setPlayerData((prev) => ({
        ...prev,
        user: { ...prev.user, pseudo },
      }));
    },

    setPassword: async (password: string) => {
      try {
        const response = await fetch("/api/setPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            userId: playerData.user.id, // Utilise l'ID du joueur
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Mot de passe mis à jour avec succès.");
        } else {
          console.error(
            "Erreur lors de la mise à jour du mot de passe:",
            data.error
          );
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    },

    // Setters pour les statistiques du joueur
    setBeacoins: async (addbeacoins: number) => {
      await supabaseData
        .from("users")
        .update({ beacoin: playerData.beacoins + addbeacoins })
        .eq("id", playerData.user.id);
      setPlayerData((prev) => ({
        ...prev,
        beacoins: playerData.beacoins + addbeacoins,
      }));
    },

    setPhareended: async (phareended: Array<number>) => {
      try {
        // Met à jour les données dans Supabase
        const { error } = await supabaseData
          .from("users")
          .update({ phareended }) // Colonne à mettre à jour
          .eq("id", playerData.user.id); // Condition pour trouver le bon utilisateur

        if (error) {
          console.error(
            "Erreur lors de la mise à jour de Supabase:",
            error.message
          );
          return;
        }

        // Met à jour l'état local
        setPlayerData((prev) => ({
          ...prev,
          phareended,
        }));
      } catch (err) {
        console.error("Erreur inattendue:", err);
      }
    },

    setDlcUnlocked: async (DlcUnlocked: Array<number>) => {
      try {
        // Met à jour les données dans Supabase
        const { error } = await supabaseData
          .from("users")
          .update({ DlcUnlocked }) // Colonne à mettre à jour
          .eq("id", playerData.user.id); // Condition pour trouver le bon utilisateur

        if (error) {
          console.error(
            "Erreur lors de la mise à jour de Supabase:",
            error.message
          );
          return;
        }

        // Met à jour l'état local
        setPlayerData((prev) => ({
          ...prev,
          DlcUnlocked,
        }));
      } catch (err) {
        console.error("Erreur inattendue:", err);
      }
    },

    // Méthodes de gestion du compte
    deletePlayer: async () => {
      try {
        await supabaseAuth.from("users").delete().eq("id", playerData.user.id);
        await signOut({
          redirect: false,
        });
      } catch (e) {
        console.error("Erreur lors de la suppression :", e);
        throw e;
      }
    },

    // Méthode pour mettre à jour plusieurs champs à la fois
    updatePlayerInfo: async (updates: Partial<PlayerData>) => {
      try {
        // Mise à jour des champs dans la table auth
        if (updates.user) {
          await supabaseAuth
            .from("users")
            .update({
              name: updates.user.name,
              email: updates.user.mail,
              pseudo: updates.user.pseudo,
            })
            .eq("id", playerData.user.id);
        }

        // Mise à jour des champs dans la table data
        const dataUpdates = {
          beacoins: updates.beacoins,
          nbPhareFinished: updates.phareended,
          DlcUnlocked: updates.DlcUnlocked,
          isAsso: updates.isAsso,
          isAdmin: updates.isAdmin,
        };

        await supabaseData
          .from("users")
          .update(dataUpdates)
          .eq("id", playerData.user.id);

        // Mise à jour de l'état local
        setPlayerData((prev) => ({
          ...prev,
          ...updates,
        }));
      } catch (e) {
        console.error("Erreur lors de la mise à jour :", e);
        throw e;
      }
    },
  };

  return { playerData, ...methods };
}
