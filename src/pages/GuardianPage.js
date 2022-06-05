import React from "react";
import { useState, useEffect } from "react";
import { ArrowRight, Mail, Phone, UserPlus } from "react-feather";
import { useParams } from "react-router-dom";
import api from "../apis/api";

function GuardianPage() {
  const { id } = useParams();
  const [guardianInfo, setGuardianInfo] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  useEffect(() => {
    async function getGuardian() {
      try {
        const response = await api.get(`/guardian/${id}`);
        setGuardianInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getGuardian();
  }, []);
  return (
    <div className="flex flex-col bg-secondary-white">
      <div className="bg-primary h-46 text-white flex flex-col items-center justify-around py-2 sm:py-4">
        <div className="flex flex-row text-spread items-center">
          <div className="text-6xl font-grandstander mx-4 ml-3.5 2xl:mr-14 xl:mx-10 lg:mx-8 lg:text-7xl md:mr-12 sm:mx-6">
            DOTY
          </div>
          <div className="text-sm justify-center items-center text-center 2xl:text-xl xl:text-xl lg:text-lg md:text-lg sm:text-lg">
            A plataforma de adoção parceira da{" "}
            <p className="text-secondary-green font-bold text-base lg:text-xl">
              {guardianInfo.name}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center text-center justify-center">
          <UserPlus className="h-20 sm:h-25 lg:h-30" />
          <div className="flex flex-col items-center justify-center text-center lg:mt-3">
            <div className="font-bold text-lg sm:text-xl">
              {guardianInfo.name}
            </div>
          </div>
          <div className="flex flex-row my-2">
            <div className="flex flex-row">
              <div>
                <div className="text-sm flex flex-row items-center text-center justify-start sm:text-base font-medium mr-8 lg:text-lg lg:font-medium lg:ml-15 lg:mr-10">
                  {" "}
                  <Phone className="h-4 sm:h-5" /> {guardianInfo.phone}
                </div>
              </div>
              <div>
                <div className="text-sm flex flex-row justify-end items-center text-center sm:text-base font-medium lg:text-lg lg:font-medium lg:ml-20">
                  {" "}
                  <Mail className="h-4 sm:h-5" /> {guardianInfo.email}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5 text-center flex flex-col items-center sm:mx-2.5 sm:mt-5 sm:border-2 sm:rounded-lg lg:py-6 lg:my-8">
            <div className="text-secondary-blue text-lg sm:text-xl font-semibold px-1 lg:text-2xl lg:mb-2">
              Oba! Ficamos muito felizes com seu interesse em adotar!
            </div>
            <div className="text-md my-6 mx-4 lg:text-lg">
              Nós levamos muito a serio a adoção responsável. Por isso, o
              processo consiste em três etapas:
            </div>
            <div className="text-secondary-green font-bold my-3.5 flex flex-row text-sm sm:text-lg sm:font-semibold lg:text-xl">
              Formulário <ArrowRight className="h-5 sm:h-7" /> Entrevista{" "}
              <ArrowRight className="h-5 sm:h-7" />
              Visita e Retirada
            </div>
            <div className="text-md my-6 mx-4 lg:text-lg">
              Para começar, precisamos confirmar algumas informações e solicitar
              alguns dos seus dados, tudo bem? Fique tranquilo! Isso deve tomar
              menos de 5 minutos e seus dados estarão em segurança.
            </div>
            <button className="bg-primary rounded text-white text-lg py-3 px-6 my-6 w-3/5">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuardianPage;
