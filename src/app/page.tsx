"use client";

import styles from "@/app/ui/styles/login.module.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '@/app/firebase/firebase'
import OtpInput from "react-otp-input";
import { redirect } from 'next/navigation'
import {Schools } from './hooks/Schools'

export default function Home() {
  const [otp, setOtp] = useState("");
  const [errorOtp, setErreurOtp] = useState(false)
  const [visibleOtpMsg, setVisibleOtpMsg] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [isRealOtp, setIsRealOtp] = useState(false)
  const [validation, setValidation] = useState("");
  const [reDirect,setReDirect] = useState(false)
  const [codesSchools, setCodesSchools] = useState([])

  const {getSchoolsCodes} = Schools()


  const [formData, setForm]= useState({
    email: "",
    password:""
  })


    useEffect(() => {
      const fetchSchoolsCodes = async () => {
        try {
          const codes = await getSchoolsCodes();
          setCodesSchools(codes);
        } catch (error) {
          console.error("Erreur lors de la récupération des codes d'établissements:", error);
        }
      };
    
      fetchSchoolsCodes();
    }, []);
    

   
 

    //check si le code d'établissement existe
  const verifyOtp = (otp:number) => {
   
      if (codesSchools.includes(Number(otp))) {
        console.log('OTP correct !');
        setErreurOtp(false)
        setIsRealOtp(true)
        setFormVisible(true)

      } else {
        console.log('OTP incorrect !');
        setErreurOtp(true)  
        setIsRealOtp(false)


      }
    
    
  
  }
  

  //listener sur le champ OTP
  function handleChangeOtp(newOtp: any){
    setOtp(newOtp);
    if (newOtp.length === 4) {
      verifyOtp(newOtp);
      setVisibleOtpMsg(true)
    }
  }

  //listener sur le formulaire de connexion
  function handleForm(event){
    const {name, value}= event.target

    setForm(prev =>{
        return({
            ...prev,
            [name]: value
        })
    })
  }  


  //submit form
  async function handleSubmit(e){
    e.preventDefault();
    try {
        const response = await signInWithEmailAndPassword(auth, formData.email, formData.password);
       
        console.log(auth);

        localStorage.setItem("user", response.user.uid)

        setReDirect(true)

    } catch (error) {
     
        if(error.code === "auth/invalid-credential") {
            setValidation("Email ou mot de passe incorrecte")
        }
        //console.error(error);
    }
   
}

if(reDirect){
redirect("/dashboard");
}

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
          <div
            className={
              "col-4 border-round flex flex-col align-items-center " +
              styles.rightPane
            }
          >
            <h3 className="text-center text-700">
              Entrez votre code établissement
            </h3>
            <OtpInput
              value={otp}
              onChange={handleChangeOtp}
              numInputs={4}
              renderSeparator={<pre> </pre>}
              renderInput={(props) => 
              <input {...props} 
              disabled={isRealOtp} // Désactiver le champ si l'OTP est vérifié
              style={{
                ...props.style,
                backgroundColor: isRealOtp ? '#dddddd' : 'white', // Griser le champ s'il est vérifié
              }}
              />}
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

            {
              visibleOtpMsg ? 
              ( errorOtp ? 
                <p className="m-1 font-italic text-500 text-sm text-red-500	"> Code établissement incorrect</p>
                  :
                  <p className="m-1 font-italic text-500 text-sm text-green-500"> Code établissement correct </p>
                  
                )
                :
              ""
            }
              

            <hr className="mt-auto" />

            <form onSubmit={handleSubmit}>
            <div className="field flex flex-col w-full px-3">
              <label htmlFor="">Adresse email</label>
              <InputText className="w-full" type="email" required disabled = { formVisible ? false:true } name="email" value={formData.email} onChange={handleForm}  />
            </div>
            <div className="field flex flex-col w-full px-3">
              <label htmlFor="">Mot de passe</label>
              <Password className="" toggleMask feedback={false} required disabled = { formVisible ? false:true } name="password" value={formData.password} onChange={handleForm} />
            </div>
            <div className="mb-auto px-3 w-full">
              <Button label="Valider" className="w-full" disabled = { formVisible ? false:true }/>
            </div>
            </form>

           
            {validation.length > 0 ?
                <p className="text-red-500"> {validation}</p>
                :
                ""  
              }
            

          </div>
        </div>
      </div>
    </div>
  );
}
