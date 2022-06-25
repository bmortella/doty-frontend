import React, { useEffect, useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Disclosure } from "@headlessui/react";
import api from "../../apis/api";
import { Calendar, Clock } from "react-feather";

function AdopterDashboard() {
  const { setTitle } = useOutletContext();
  const authContext = useContext(AuthContext);
  const [adopterInfo, setAdopterInfo] = useState({});
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [adoptionTime, setAdoptionTime] = useState("");
  const [adoptionDate, setAdoptionDate] = useState("");

  useEffect(() => {
    async function getAdopter() {
      try {
        const response = await api.get(
          `/adoptionProcess/process/${authContext.loggedInUser.user._id}`
        );
        setAdopterInfo(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
    getAdopter();
  }, []);

  useEffect(() => {
    setTitle(`Olá, ${authContext.loggedInUser.user.name.split(" ", 1)}! `);
    document.title = "Doty - Meus processos";
  });

  async function submitInterviewDate() {
    try {
      let updateData = {
        _id: adopterInfo._id,
        stage: 1,
        status: "PENDING",
        process: adopterInfo.process,
      };
      updateData.process["1"].date = interviewDate;
      updateData.process["1"].time = interviewTime;
      updateData.process["1"].awaiting = "GUARDIAN";
      await api.put("/adoptionProcess/", updateData);
      setAdopterInfo({ ...adopterInfo, process: updateData.process });
    } catch (err) {
      console.error(err);
    }
  }

  async function submitAdoptionDate() {
    try {
      let updateData = {
        _id: adopterInfo._id,
        stage: 2,
        status: "PENDING",
        process: adopterInfo.process,
      };
      updateData.process["2"].date = adoptionDate;
      updateData.process["2"].time = adoptionTime;
      updateData.process["2"].awaiting = "GUARDIAN";
      await api.put("/adoptionProcess/", updateData);
      setAdopterInfo({ ...adopterInfo, process: updateData.process });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="flex flex-col">
        <div>Seu processo:</div>
        <div>
          <div>
            <div class="overflow-hidden bg-gray-400 rounded-full">
              <div class={`w-/3 h-2 bg-[#219653] rounded-full`} />
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
        <div className="flex flex-row">
          <div className="flex flex-col w-full">
            <div className="border-2 py-4 px-6 rounded-md mt-5">
              <Disclosure>
                <Disclosure.Button className="flex flex-col text-[14px] mb-4 font-[400]">
                  Formulário
                  <p className="text-xs text-gray-400">
                    Etapa inicial de adoção
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="text-[#3B56AA] font-[600]">
                  <p className="text-gray-600 font-[400] text-sm mb-2">
                    <span className="text-[#3B56AA] font-semibold">
                      Animal escolhido:{" "}
                    </span>
                    {adopterInfo.pet?.name}
                  </p>
                  <p className="text-gray-600 font-[400] text-sm mb-2">
                    <span className="text-[#3B56AA] font-semibold">
                      Se já teve animais e quantos:{" "}
                    </span>
                    {adopterInfo.process?.["0"].everHadAPet}
                  </p>
                  <p className="text-gray-600 font-[400] text-sm mb-2">
                    <span className="text-[#3B56AA] font-semibold">
                      Ambiente onde o animal irá morar:{" "}
                    </span>
                    {adopterInfo.process?.["0"].houseType}
                  </p>
                  <p className="text-gray-600 font-[400] text-sm mb-2">
                    <span className="text-[#3B56AA] font-semibold">
                      Espaço do local:{" "}
                    </span>
                    {adopterInfo.process?.["0"].petAccess}
                  </p>
                  <p className="text-gray-600 font-[400] text-sm mb-2">
                    <span className="text-[#3B56AA] font-semibold">
                      Horas que passa em casa:{" "}
                    </span>
                    {adopterInfo.process?.["0"].timeSpentAtHome}
                  </p>
                  <p className="text-gray-600 font-[400] text-sm mb-6">
                    <span className="text-[#3B56AA] font-semibold">
                      Acesso do animal no local:{" "}
                    </span>
                    {adopterInfo.process?.["0"].petAccess}
                  </p>
                </Disclosure.Panel>
              </Disclosure>
            </div>
            <div className="border-2 py-4 px-6 rounded-md mt-10">
              <Disclosure>
                <Disclosure.Button className="flex flex-col text-[14px]">
                  Entrevista
                  <p className="text-xs text-gray-400 mb-4">
                    Segunda etapa da adoção
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="ml-2 font-[400]">
                  <div className="bg-[#F4F3FF] p-4 rounded-md flex flex-col">
                    {adopterInfo.process?.["1"]?.awaiting === "ADOPTER" && (
                      <>
                        <p className="text-neutral text-xs">
                          Selecione o dia e horário de sua preferência para
                          conversar com @ Doador@
                        </p>
                        <div className="text-sm mt-6 flex flex-col">
                          Selecionar o dia
                          <input
                            className="border-2 w-11/12 lg:w-8/12 xl:w-6/12 mb-5 ml-1 pl-1 rounded-md"
                            placeholder="Formato: DD/MM/AAAA"
                            type="date"
                            onChange={(e) => setInterviewDate(e.target.value)}
                          />
                          Selecionar horário
                          <input
                            className="border-2 w-11/12 lg:w-8/12 xl:w-6/12 mb-1 ml-1 pl-1 rounded-md"
                            placeholder="Formato: '00:00hrs'"
                            onChange={(e) => setInterviewTime(e.target.value)}
                          ></input>
                        </div>
                        <button
                          className="btn mb-0 mt-6 w-72"
                          onClick={() => submitInterviewDate()}
                        >
                          Enviar Horário para Aprovação
                        </button>
                      </>
                    )}
                    {adopterInfo.process?.["1"]?.awaiting !== "ADOPTER" && (
                      <>
                        <p className="text-neutral text-xs">
                          Dia e horário para conversar com @ Doador@
                        </p>
                        <div className="inline-flex items-center mt-6">
                          <Calendar />
                          <p className="text-primary ml-2 text-sm">
                            {adopterInfo.process?.["1"]?.date}{" "}
                          </p>
                        </div>
                        <div className="inline-flex items-center mt-6">
                          <Clock />
                          <p className="text-primary ml-2 text-sm">
                            {adopterInfo.process?.["1"]?.time}
                          </p>
                        </div>
                      </>
                    )}
                    {adopterInfo.process?.["1"]?.awaiting !== "ADOPTER" && (
                      <>
                        <p className="text-neutral text-xs">
                          Dia e horário para conversar com @ Doador@
                        </p>
                        <div className="inline-flex items-center mt-6">
                          <Calendar />
                          <p className="text-primary ml-2 text-sm">
                            {adopterInfo.process?.["1"]?.date}{" "}
                          </p>
                        </div>
                        <div className="inline-flex items-center mt-6">
                          <Clock />
                          <p className="text-primary ml-2 text-sm">
                            {adopterInfo.process?.["1"]?.time}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </Disclosure.Panel>
              </Disclosure>
            </div>
            <div className="border-2 py-4 px-6 rounded-md my-10">
              <Disclosure>
                <Disclosure.Button className="flex flex-col text-[14px]">
                  Visita e Retirada
                  <p className="text-xs text-gray-400 mb-4">
                    Ultima etapa da adoção
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="ml- font-[400]">
                  <div>
                    Selecione dia e horário de sua preferência para visitação do
                    abrigo, assinatura de documentos e retirada do animal
                    sugerido.
                    <div className="border-2 rounded-md text-sm mt-2 flex flex-col">
                      Selecionar o dia
                      <input
                        className="border-2 w-11/12 lg:w-8/12 xl:w-6/12 mb-1 ml-1 pl-1 rounded-md"
                        placeholder="Formato: DD/MM/AAAA"
                        type="date"
                        onChange={(e) => setAdoptionDate(e.target.value)}
                      ></input>
                      Selecionar horário
                      <input
                        className="border-2 w-11/12 lg:w-8/12 xl:w-6/12 mb-1 ml-1 pl-1 rounded-md"
                        placeholder="Formato: '00:00hrs'"
                        onChange={(e) => setAdoptionTime(e.target.value)}
                      ></input>
                    </div>
                    <button
                      className="bg-gray-800 text-white rounded-md mt-2 px-4 py-2"
                      onClick={() => submitAdoptionDate()}
                    >
                      Enviar Horário para Aprovação
                    </button>
                  </div>
                  <div>
                    {/* O dia e horário de sua preferência para visitação do abrigo,
                    assinatura de documentos e retirada do animal foi
                    selecionado. */}
                    {/* <div className="my-1 flex flex-row font-[600]">
                      {" "}
                      <Calendar size={24} className="mr-2" />
                      {adopterInfo?.process?.["2"].date}
                    </div>
                    <div className="my-1 flex flex-row font-[600]">
                      {" "}
                      <Clock size={24} className="mr-2" />
                      {adopterInfo?.process?.["2"].time}
                    </div> */}
                  </div>
                </Disclosure.Panel>
              </Disclosure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdopterDashboard;
