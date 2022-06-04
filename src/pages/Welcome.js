import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../contexts/authContext";

import { ArrowRight } from "react-feather";

import success from "../assets/img/success.svg";

function Welcome() {
  const authContext = useContext(AuthContext);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center">
      <div className="bg-primary h-56 text-white flex flex-col items-center justify-center lg:h-screen lg:w-3/5 lg:text-left 2xl:w-2/5">
        <h1 className="text-5xl font-grandstander uppercase lg:text-8xl lg:text-left">
          Doty
        </h1>
        <h2 className="text-center mt-4 leading-8 lg:text-xl lg:text-left font-normal">
          A plataforma ideal para otimizar o seu{" "}
          <span className="block text-secondary-green font-semibold">
            processo de adoção<span className="text-white font-normal">.</span>
          </span>
        </h2>
      </div>
      <div className="text-primary text-center md:flex md:justify-center lg:w-full">
        <div className="py-8 pt-2 px-10 2xl:w-2/3 md:flex md:flex-col md:items-center">
          <img
            src={success}
            className="mb-10 mt-10 mx-auto xl:w-8/12 2xl:6/12"
          ></img>
          <h2 className="font-semibold text-2xl text-secondary-blue">
            Oba! Ficamos muito felizes com o seu interesse
            {authContext.loggedInUser.user.role === "guardian"
              ? "."
              : " em adotar! "}
          </h2>
          <p className="text-base mt-4 font-normal lg:px-10">
            {authContext.loggedInUser.user.role === "guardian"
              ? "Nós da Doty queremos que você tenha a melhor experiência de adoção possível. Portanto, nosso processo consiste em três etapas, tudo bem?"
              : "Nós da Doty levamos muito a sério a adoção responsável. Por isso, precisamos confirmar algumas informações e solicitar alguns dos seus dados, tudo bem? Fique tranquilo! Isso deve tomar menos de 5 minutos e seus dados estarão em segurança."}
          </p>
          <div className="flex flex-nowrap mt-10 justify-around text-secondary-green font-medium text-lg md:w-5/6 xl:w-2/3">
            <p>Formulário</p>
            <ArrowRight />
            <p>Entrevista</p>
            <ArrowRight />
            <p>Visita e Retirada</p>
          </div>
          <Link
            to="/login"
            className="block w-full lg:w-80 mt-10 text-white text-center bg-primary disabled:bg-neutral focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-base px-4 py-2.5 mr-2 mb-2 focus:outline-none"
          >
            Continuar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
