'use client'
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { auth, db } from "@/app/firebase/firebase";
import { Password } from "primereact/password";

import {collection, query, where, getDocs, getDoc, doc, setDoc, deleteDoc} from 'firebase/firestore'

const Page = () => {
  const [formData, setForm] = useState({
    name: '',
    code: 0
  });


  // Listener sur le formulaire
  const handleForm = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await setDoc(doc(collection(db,'etablissement')),formData);

      setForm({ name: '', code: 0 });
      alert('Données ajoutées avec succès!');
    } catch (error) {
      console.error(error);
      alert('Une erreur s\'est produite lors de l\'ajout des données.');
    }
  };

  return (
    <div>
      <div className="flex grid m-0 h-full p-2">
        <div className="col-8 flex flex-col">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="field flex flex-col w-full px-3">
              <label htmlFor="name">Nom</label>
              <InputText
                className="w-full"
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleForm}
              />
            </div>
            <div className="field flex flex-col w-full px-3">
              <label htmlFor="code">Code établissement</label>
              <InputNumber
                className="w-full"
                name="code"

                useGrouping={false}
                required
                value={formData.code}
                onValueChange={handleForm}
              />
             
            </div>
            <div className="mb-auto px-3 w-full">
              <Button label="Ajouter" className="w-full" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
