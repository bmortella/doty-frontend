import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/authContext";
import api from "../../../apis/api";
import {
  Mail,
  Phone,
  Instagram,
  MapPin,
  ThumbsUp,
  ThumbsDown,
} from "react-feather";

import { Disclosure } from "@headlessui/react";

function AdopterProfile() {
  const { id } = useParams();
  const [process, setProcess] = useState({});

  const authContext = useContext(AuthContext);

  useEffect(() => {
    document.title = "Doty - Processo de Adoção";
    async function getProcess() {
      try {
        const response = await api.get(`/adoptionProcess/process/${id}`);
        setProcess(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
    getProcess();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-secondary-blue font-semibold text-[22px]">
          {process.adopter?.name}
        </h1>
        <div className="hidden md:flex text-base text-neutral mt-1">
          <div className="inline-flex items-center">
            <Mail className="mr-2" />
            {process.adopter?.email}
          </div>
          <div className="inline-flex items-center ml-4">
            <Phone className="mr-2" />
            {process.adopter?.phone}
          </div>
          <div className="inline-flex items-center ml-4">
            <MapPin className="mr-2" />
            {process.process?.["0"].address}
          </div>
          <div className="inline-flex items-center ml-4">
            <Instagram className="mr-2" />
            {process.process?.["0"].instagram}
          </div>
        </div>
        <div className="mt-7">
          <p className="text-neutral text-sm mb-2">Seu processo:</p>
          <div>
            <div class="overflow-hidden bg-gray-400 rounded-full">
              <div class="w-1/3 h-4 bg-[#219653] rounded-full" />
            </div>
            <ol class="grid grid-cols-3 mt-4 text-sm font-medium text-gray-500">
              <li class="flex items-center justify-start text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" />
              </li>
              <li class="flex items-center justify-center text-blue-600">
                <path stroke-linecap="round" stroke-linejoin="round" />
                <path stroke-linecap="round" stroke-linejoin="round" />
              </li>
              <li class="flex items-center justify-end">
                <path stroke-linecap="round" stroke-linejoin="round" />
              </li>
            </ol>
          </div>
        </div>
        <div>
          <div className="border-2 py-4 px-6 rounded-md mt-5">
            <Disclosure>
              <Disclosure.Button className="flex flex-col text-[14px] mb-4 font-[400]">
                Formulário
                <p className="text-xs text-gray-400">Etapa inicial de adoção</p>
              </Disclosure.Button>
              <Disclosure.Panel>
                <p className="text-gray-600 font-[400] text-sm mb-2">
                  <span className="text-[#3B56AA] font-semibold">
                    Animal escolhido:{" "}
                  </span>
                  {process.pet?.name}
                </p>
                <p className="text-gray-600 font-[400] text-sm mb-2">
                  <span className="text-[#3B56AA] font-semibold">
                    Se já teve animais e quantos:{" "}
                  </span>
                  {process.process?.["0"].everHadAPet}
                </p>
                <p className="text-gray-600 font-[400] text-sm mb-2">
                  <span className="text-[#3B56AA] font-semibold">
                    Ambiente onde o animal irá morar:{" "}
                  </span>
                  {process.process?.["0"].houseType}
                </p>
                <p className="text-gray-600 font-[400] text-sm mb-2">
                  <span className="text-[#3B56AA] font-semibold">
                    Espaço do local:{" "}
                  </span>
                  {process.process?.["0"].petAccess}
                </p>
                <p className="text-gray-600 font-[400] text-sm mb-2">
                  <span className="text-[#3B56AA] font-semibold">
                    Horas que passa em casa:{" "}
                  </span>
                  {process.process?.["0"].timeSpentAtHome}
                </p>
                <p className="text-gray-600 font-[400] text-sm mb-6">
                  <span className="text-[#3B56AA] font-semibold">
                    Acesso do animal no local:{" "}
                  </span>
                  {process.process?.["0"].petAccess}
                </p>
                <div className="flex">
                  <button className="btn w-28 bg-[#219653] inline-flex justify-center items-center">
                    <ThumbsUp className="mr-2" size={20} />
                    Aprovar
                  </button>
                  <button className="btn w-28 bg-error inline-flex justify-center items-center">
                    <ThumbsDown className="mr-2" size={20} />
                    Reprovar
                  </button>
                </div>
              </Disclosure.Panel>
            </Disclosure>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdopterProfile;
