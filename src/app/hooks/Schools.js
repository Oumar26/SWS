import { db } from "@/app/firebase/firebase";
import {
    collection,
    getDocs,
    query
} from "firebase/firestore";

export const Schools = () => {
  const getSchoolsCodes = async () => {
    const schoolsCode = collection(db, "etablissement");
    const q = query(schoolsCode);

    try {
      const querySnapshot = await getDocs(q);
      const codes = [];

      querySnapshot.forEach((doc) => {
        const code = doc.data().code;
        codes.push(code);
      });

      return codes;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des codes d'établissements:",
        error
      );
      return []; // Retourne un tableau vide en cas d'erreur
    }
  };

  return { getSchoolsCodes };
};
