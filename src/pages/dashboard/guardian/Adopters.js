import { useEffect, useMemo, useState, useContext } from "react";
import { useOutletContext, Link } from "react-router-dom";

import { AuthContext } from "../../../contexts/authContext";

import api from "../../../apis/api";

import { ArrowLeft, ArrowRight } from "react-feather";

const adoptersPerPage = 10;

function Adopters() {
  const { setTitle } = useOutletContext();
  const authContext = useContext(AuthContext);

  const [adopters, setAdopters] = useState([]);

  useEffect(() => {
    setTitle("Adotantes");
    document.title = "Doty - Adotantes";

    async function getAdopters() {
      try {
        const response = await api.get(
          `/adoptionProcess/${authContext.loggedInUser.user._id}`
        );
        setAdopters(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAdopters();
  }, []);

  // Pagination
  const [page, setPage] = useState(0);

  const currentTableData = useMemo(() => {
    const firstPageIndex = page * adoptersPerPage;
    const lastPageIndex = firstPageIndex + adoptersPerPage;
    return adopters.slice(firstPageIndex, lastPageIndex);
  }, [page, adopters]);

  return (
    <>
      <div className="relative overflow-x-auto rounded-lg shadow-sm border border-gray-200">
        <table className="w-full text-sm text-left text-neutral">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                NOME DO ANIMAL
              </th>
              <th scope="col" className="px-6 py-3">
                TELEFONE
              </th>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">
                EMAIL
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
                <td className="px-6 py-4">{process.adopter.phone}</td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  {process.adopter.email}
                </td>
                <td className="px-6 py-4 md:w-8">
                  <div className="flex items-center">
                    <Link
                      to={process.adopter._id}
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
              page === Math.ceil(adopters.length / adoptersPerPage) - 1 ||
              adopters.length === 0
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

export default Adopters;
