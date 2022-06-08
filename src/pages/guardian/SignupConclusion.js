import BannerLayout from "../../components/BannerLayout";

import success from "../../assets/img/success.svg";
import { Link as LinkIcon } from "react-feather";

import { Link } from "react-router-dom";

function SignupConclusion() {
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
          Parabéns!
        </h2>
        <p className="text-base mt-4 font-normal lg:px-10">
          Agora você pode compartilhar o seu link Doty para os possíveis
          adotantes participarem do processo de adoção. Acompanhe todos os
          processos de adoção na página inicial da plataforma.
        </p>
        <div className="flex flex-col items-center mt-8">
          <button
            className="btn md:w-80 inline-flex justify-center items-center"
            onClick={window.navigator.clipboard.writeText(
              `${window.location.href.split("/")[2]}/:id`
            )}
          >
            <LinkIcon className="mr-2" size={20} />
            Copiar Link
          </button>

          <Link
            to="/guardian/dashboard"
            className="btn btn-outline md:w-96 mt-10"
          >
            Ir para página inicial
          </Link>
        </div>
      </BannerLayout.Content>
    </BannerLayout.Layout>
  );
}

export default SignupConclusion;
