import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export type UseEnigme = {
  EnigmeData: EnigmeData;
  getidPhare: () => number;
  getidEnigme: () => number;
  getcodeLock: () => number;
  getcoordX: () => number;
  getcoordY: () => number;
  getlenghtX: () => number;
  getlenghtY: () => number;
  getname: () => string;
  getpositionLock: () => number;
  getquestion: () => string;
  gettext1: () => string;
  getanswer: () => string;
  gettext2: () => string;
};

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface EnigmeData {
  idPhare: number;
  idEnigme: number;
  codeLock: number;
  coordX: number;
  coordY: number;
  lenghtX: number;
  lenghtY: number;
  name: string;
  question: string;
  text1: string;
  answer: string;
  text2: string;
}

export function useEnigme(idPhare: number, idEnigme: number) {
  const [EnigmeData, setEnigmeData] = useState<EnigmeData>({
    idPhare: 0,
    idEnigme: 0,
    codeLock: 2,
    coordX: 0,
    coordY: 0,
    lenghtX: 10,
    lenghtY: 10,
    name: "",
    question: "",
    text1: "",
    answer: "",
    text2: "",
  });

  useEffect(() => {
    const fetchEnigmeData = async () => {
      try {
        if (idPhare >= 1) {
          const request = await supabaseData
            .from("Enigme")
            .select()
            .eq("idPhare", idPhare)
            .eq("idEnigme", idEnigme)
            .single();
          if (request.data) {
            //console.log("Requete Enigme : ", request.data);
            setEnigmeData({
              idPhare: idPhare,
              idEnigme: idEnigme,
              codeLock: request.data.codeLock,
              coordX: request.data.coordX,
              coordY: request.data.coordY,
              lenghtX: request.data.lenghtX,
              lenghtY: request.data.lenghtY,
              name: request.data.name,
              question: request.data.question,
              text1: request.data.text1,
              answer: request.data.answer,
              text2: request.data.text2,
            });
          }
        }
      } catch (e) {
        console.log("on entre dans l'erreur");
        console.error("Erreur lors de la récupération des données", e);
      }
    };
    fetchEnigmeData();
  }, [idPhare, idEnigme]);

  //methodes
  const methods = {
    getidPhare: () => EnigmeData.idPhare,
    getidEnigme: () => EnigmeData.idEnigme,
    getanswerLock: () => EnigmeData.codeLock,
    getcoordX: () => EnigmeData.coordX,
    getcoordY: () => EnigmeData.coordY,
    getlenghtX: () => EnigmeData.lenghtX,
    getlenghtY: () => EnigmeData.lenghtY,
    getname: () => EnigmeData.name,
    getquestion: () => EnigmeData.question,
    gettext1: () => EnigmeData.text1,
    getanswer: () => EnigmeData.answer,
    gettext2: () => EnigmeData.text2,
  };

  return { EnigmeData, ...methods };
}
