import { useEffect, useContext, useState, useMemo } from "react";
import { useOutletContext, Link } from "react-router-dom";

import { AuthContext } from "../../../contexts/authContext";

import Card from "../../../components/Card";

import api from "../../../apis/api";

import {
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  XCircle,
  CheckCircle,
} from "react-feather";

const processesPerPage = 10;

function GuardianHome() {
  const { setTitle } = useOutletContext();
  const authContext = useContext(AuthContext);

  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    setTitle(`Olá, ${authContext.loggedInUser.user.name}!`);
    document.title = "Doty - Dashboard";

    async function getProcesses() {
      try {
        const response = await api.get(
          `/adoptionProcess/${authContext.loggedInUser.user._id}`
        );
        setProcesses(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProcesses();
  }, []);

  // Pagination
  const [page, setPage] = useState(0);

  const currentTableData = useMemo(() => {
    const firstPageIndex = page * processesPerPage;
    const lastPageIndex = firstPageIndex + processesPerPage;
    return processes.slice(firstPageIndex, lastPageIndex);
  }, [page, processes]);

  function formatDate(date) {
    date = new Date(date);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <div>
        <h2 className="text-secondary-blue text-[22px] font-semibold">
          Resumo
        </h2>
      </div>
      <div className="flex flex-wrap md:flex-nowrap md:justify-around mt-9">
        <div className="w-full md:w-1/3">
          <Card
            title="Pessoas no processo de Formulário"
            text={
              processes.filter(
                (process) => process.stage === 0 && process.status === "PENDING"
              ).length
            }
          />
        </div>
        <div className="w-full my-4 md:w-1/3 md:mx-6 md:my-0">
          <Card
            title="Pessoas no processo de Entrevista"
            text={
              processes.filter(
                (process) => process.stage === 1 && process.status === "PENDING"
              ).length
            }
          />
        </div>
        <div className="w-full md:w-1/3">
          <Card
            title="Pessoas no processo de Visita"
            text={
              processes.filter(
                (process) => process.stage === 2 && process.status === "PENDING"
              ).length
            }
          />
        </div>
      </div>
      <div className="mt-9">
        <h2 className="text-secondary-blue text-[22px] font-semibold">
          Lista de Adotantes
        </h2>
      </div>
      <div className="relative overflow-x-auto rounded-lg shadow-sm border border-gray-200 mt-8">
        <table className="w-full text-sm text-left text-neutral">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do Animal
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">
                Data de Entrada
              </th>
              <th scope="col" className="py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((process) => (
              <tr
                className="bg-white border-b odd:bg-white even:bg-gray-50"
                key={process.adopter._id}
              >
                <th scope="row" className="px-6 py-4 text-primary">
                  {process.adopter.name}
                </th>
                <td className="px-6 py-4">{process.pet.name}</td>
                <td className="px-6 py-4">
                  {process.status === "PENDING" && (
                    <div className="inline-flex items-center">
                      <AlertCircle className="text-[#F2C94C] mr-2" />
                      Aprovação Pendente
                    </div>
                  )}
                  {process.status === "REJECTED" && (
                    <div className="inline-flex items-center">
                      <XCircle className="text-[#EB5757] mr-2" />
                      Reprovado
                    </div>
                  )}
                  {process.status === "APPROVED" && (
                    <div className="inline-flex items-center">
                      <CheckCircle className="text-[#219653] mr-2" />
                      Aprovado
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  {formatDate(process.started)}
                </td>
                <td className="px-6 py-4 md:w-8">
                  <div className="flex items-center">
                    <Link
                      to={`adopters/${process.adopter._id}`}
                      className="md:mr-8 text-[#1973E8] font-medium"
                    >
                      Detalhes
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-nowrap justify-between mx-4">
          <button
            className="inline-flex justify-center items-center text-neutral py-4 disabled:text-gray-300 group text-sm"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <ArrowLeft
              className="text-gray-600 mr-2 group-disabled:text-gray-400"
              size={20}
            />
            Anterior
          </button>
          <button
            className="inline-flex justify-center items-center text-neutral py-4 disabled:text-gray-300 group text-sm"
            disabled={
              page === Math.ceil(processes.length / processesPerPage) - 1 ||
              processes.length === 0
            }
            onClick={() => setPage(page + 1)}
          >
            Próximo
            <ArrowRight
              className="text-gray-600 ml-2 group-disabled:text-gray-400"
              size={20}
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default GuardianHome;
