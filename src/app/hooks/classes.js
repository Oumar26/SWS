import { db } from "@/app/firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc
} from "firebase/firestore";

export const classesHook = () => {
  const classesCollectionRef = collection(db, "classes");
  const getClasses = async () => {
    const q = query(classesCollectionRef);

    try {
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const val = doc.data();
        const { name, year } = val;
        val.data = { name, year };
        val.id = doc.id;
        return val;
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des codes d'établissements:",
        error
      );
      return []; // Retourne un tableau vide en cas d'erreur
    }
  };
  const addClass = async (data) => {
    return await setDoc(doc(classesCollectionRef), data);
  };

  return { getClasses, addClass };
};
