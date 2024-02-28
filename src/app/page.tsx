"use client";

import styles from "@/app/ui/styles/login.module.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import OtpInput from "react-otp-input";

export default function Home() {
  const [otp, setOtp] = useState("");
  return (
    <div className={styles.main}>
      <div className={styles.cover}>
        <div className="flex grid m-0 h-full p-2">
          <div className="col-8 flex flex-col">
            <img
              className="mx-auto mt-auto"
              width="360"
              src="https://app.sowesign.com/assets/img/logo-sowesign.png"
              alt="logo"
            />
            <div className="text-center bg-white m-auto border-round col-11 pb-3 px-3">
              <h4 className="text-cyan-600">
                Bienvenue sur le portail SoWeSign <br />
                Vous pouvez accéder à votre portail Manager, Apprenant ou
                Formateur
              </h4>
              <span className="text-600 text-xs font-medium">
                L’utilisation des interfaces SoWeSign nécessite la saisie d’un
                code identifiant composé d’un code établissement à 4 chiffres,
                d’un identifiant à 8 chiffres et d’un code PIN à 4 chiffres.
                Vous pouvez également vous identifier avec vos identifiants
                internes propres à votre organisme si celui-ci dispose d’un
                système de connexion interne lié à SoWeSign, ou avec votre
                e-mail et votre mot de passe si votre organisme l’autorise
              </span>
            </div>
            <p className="text-white text-center">
              Copyright : SoWeSign 2022 - Mentions légales
            </p>
          </div>
          <div className="col-4 bg-white border-round opacity-80 flex flex-col align-items-center">
            <h3 className="text-center text-700">
              Entrez votre code établissement
            </h3>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<pre> </pre>}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus={true}
              inputType="tel"
              inputStyle={{
                width: "35px",
                height: "35px",
                border: "none",
                boxShadow: "inset 0 0 3px #00000080",
                backgroundColor: "white",
                fontWeight: "bold",
                fontSize: "18px",
                color: "#383838",
                borderRadius: "10px",
              }}
            />
            <p className="m-1 font-italic text-500 text-sm">
              Code établissement
            </p>
            <hr className="mt-auto" />
            <div className="field flex flex-col w-full px-3">
              <label htmlFor="">Adresse email</label>
              <InputText className="w-full" />
            </div>
            <div className="field flex flex-col w-full px-3">
              <label htmlFor="">Mot de passe</label>
              <Password className="" toggleMask feedback={false} />
            </div>
            <div className="mb-auto px-3 w-full">
              <Button label="Valider" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
