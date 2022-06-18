import React, { useState } from "react";
import { useEffect, useParams } from "react-router-dom";
import api from "../apis/api";

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
    <div>
      <div>
        <div>
          <div>DOTY</div>
          <div>Notificação + perfil</div>
        </div>
        <div>
          <div>Olá, **Nome da pessoa**</div>
          <div>
            Filtro do animal
            <div>Nome do animal</div>
            <div>Menu dropdown</div>
          </div>
        </div>
      </div>
      <div>
        Formulário com as infos dos processos
        <div>Seu processo: + barrinha de progresso</div>
        <div>Formulários + status tudo como dropdown</div>
        <div>Entrevista + status tudo com dropdown</div>
        <div>Visita e Retirada + status tudo com dropdown</div>
      </div>
    </div>
  );
}

export default AdopterDashboard;
