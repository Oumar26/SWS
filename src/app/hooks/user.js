import { db } from "@/app/firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const userHook = () => {
  const usersCollectionRef = collection(db, "users");
  const q = query(usersCollectionRef);
  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const val = doc.data();
        const name = val.prenom + " " + val.nom;
        val.key = val.id;
        val.data = { name, year: val.year };
        val.children = [];
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

  const getUser = async (id) => {
    return (
      await getDocs(query(usersCollectionRef, where("class", "==", id)))
    ).docs.map((item) => {
      const val = item.data();
      val.data = { name: val.prenom + " " + val.nom };
      return val;
    });
  };

  return { getUsers, getUser };
};
