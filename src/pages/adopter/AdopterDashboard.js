import React, {
  useState,
  useEffect,
  navigation,
  authContext,
  userNavigation,
} from "react";
import "../../assets/styles/background.css";
import { useParams } from "react-router-dom";
import api from "../../apis/api";

function AdopterDashboard() {
  const { id } = useParams();
  const [adopterInfo, setAdopterInfo] = useState({
    formStatus: "",
    interviewStatus: "",
    visitAndAdoptionStatus: "",
  });
  useEffect(() => {
    async function getAdopter() {
      try {
        const response = await api.get(`/adopter/${id}/`);
        setAdopterInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getAdopter();
  }, []);

  return (
    <div className="flex flex-col bg-primary h-screen">
      <div className="  text-white">
        <div className="flex flex-row justify-evenly text-[32px] mb-14">
          <div>DOTY</div>
          <div>Ntf + perfil</div>
        </div>
        <div className="flex flex-row justify-evenly mb-9">
          <div className="text-3xl">Olá, **1ºNome da pessoa**!</div>
          <div className="text-[14px]">
            Nome do animal
            <div>Menu dropdown</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col border-2 bg-white rounded-lg mx-2 text-[14px] px-5 py-6">
        Formulário com as infos dos processos
        <div>Seu processo: </div>
        <div>barrinha de progresso</div>
        <div className="mt-10">
          <div className="mb-10">Formulários + status tudo como dropdown</div>
          <div className="mb-10">Entrevista + status tudo com dropdown</div>
          <div className="mb-10">Visita e Retirada + status tudo com dropdown</div>
        </div>
      </div>
    </div>
  );
}

export default AdopterDashboard;
