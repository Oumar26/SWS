import {db} from '@/app/firebase/firebase';
import {collection, query, where, getDocs, getDoc, doc, setDoc, deleteDoc} from 'firebase/firestore'



export const Users = () => {

    const getUsers = async () => {
        const schoolsCode = collection(db,'users');
        const q = query(schoolsCode);
        
        try {
            const querySnapshot = await getDocs(q);
            const users = [];

            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                users.push(userData);
            });
    
            return users
        } catch (error) {
            console.error("Erreur lors de la récupération des codes d'établissements:", error);
            return []; // Retourne un tableau vide en cas d'erreur
        }
      }    

  return {getUsers}
  
}