import { Link, useParams } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../contexts/authContext";

import { ArrowRight } from "react-feather";

import success from "../assets/img/success.svg";

import BannerLayout from "../components/BannerLayout";

function Welcome() {
  const authContext = useContext(AuthContext);
  const { id } = useParams();

  return (
    <BannerLayout.Layout>
      <BannerLayout.SideBanner>
        <h1 className="text-5xl font-grandstander uppercase lg:text-8xl lg:text-left">
          Doty
        </h1>
        <h2 className="text-center mt-4 leading-8 lg:text-xl lg:text-left font-normal">
          A plataforma ideal para otimizar o seu{" "}
          <span className="block text-secondary-green font-semibold">
            processo de adoção<span className="text-white font-normal">.</span>
          </span>
        </h2>
      </BannerLayout.SideBanner>
      <BannerLayout.Content>
        <img src={success} className="mb-10 mt-10 mx-auto lg:w-80" alt="" />
        <h2 className="font-semibold text-2xl text-secondary-blue">
          Oba! Ficamos muito felizes com o seu interesse
          {authContext.loggedInUser.user?.role === "guardian"
            ? "."
            : " em adotar! "}
        </h2>
        <p className="text-base mt-4 font-normal lg:px-10">
          {authContext.loggedInUser.user?.role === "guardian"
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
        {authContext.loggedInUser?.user?.role === "guardian" ? (
          <Link
            to="/guardian/welcome/registerPets"
            className="btn block lg:w-80 mt-10"
          >
            Continuar
          </Link>
        ) : (
          <Link to={`/adopter/${id}/form`} className="btn block lg:w-80 mt-10">
            Continuar
          </Link>
        )}
      </BannerLayout.Content>
    </BannerLayout.Layout>
  );
}

export default Welcome;
