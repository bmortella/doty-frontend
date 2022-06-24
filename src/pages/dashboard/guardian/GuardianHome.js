import { useEffect, useContext } from "react";
import { useOutletContext } from "react-router-dom";

import { AuthContext } from "../../../contexts/authContext";

import Card from "../../../components/Card";

function GuardianHome() {
  const { setTitle } = useOutletContext();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setTitle(`Olá, ${authContext.loggedInUser.user.name}!`);
    document.title = "Doty - Dashboard";
  }, []);

  return (
    <>
      <div>
        <h2 className="text-secondary-blue text-[22px] font-semibold">
          Resumo
        </h2>
      </div>
      <div className="flex flex-wrap md:flex-nowrap md:justify-around mt-9">
        <div className="w-full md:w-1/3">
          <Card title="Pessoas no processo de Formulário" text="34" />
        </div>
        <div className="w-full my-4 md:w-1/3 md:mx-6 md:my-0">
          <Card title="Pessoas no processo de Entrevista" text="1" />
        </div>
        <div className="w-full md:w-1/3">
          <Card title="Pessoas no processo de Visita" text="0" />
        </div>
      </div>
    </>
  );
}

export default GuardianHome;
