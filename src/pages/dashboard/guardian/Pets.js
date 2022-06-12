import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { PlusCircle, Trash2, ArrowLeft, ArrowRight } from "react-feather";

function Pets() {
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle("Animais Cadastrados");
    document.title = "Doty - Animais Cadastrados";
  });

  const [registeredPets, setRegisteredPets] = useState([]);

  // Pagination
  const [page, setPage] = useState(0);

  const currentTableData = useMemo(() => {
    const firstPageIndex = page * 10;
    const lastPageIndex = firstPageIndex + 10;
    return registeredPets.slice(firstPageIndex, lastPageIndex);
  }, [page, registeredPets]);

  return (
    <>
      <div className="flex justify-end">
        <button type="button" className="btn mr-0 md:w-32 text-xs">
          Adicionar Animais
        </button>
      </div>
      <div className="relative overflow-x-auto rounded-lg mt-7 shadow-sm border border-gray-200">
        <table className="w-full text-sm text-left text-neutral">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Sexo
              </th>
              <th scope="col" className="px-6 py-3">
                Porte
              </th>
              <th scope="col" className="px-6 py-3 hidden lg:table-cell">
                Idade
              </th>
              <th scope="col" className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((pet) => (
              <tr
                className="bg-white border-b odd:bg-white even:bg-gray-50"
                key={pet._id}
              >
                <th scope="row" className="px-6 py-4 text-primary">
                  {pet.name}
                </th>
                <td className="px-6 py-4">{pet.sex}</td>
                <td className="px-6 py-4">{pet.size}</td>
                <td className="px-6 py-4 hidden lg:table-cell">{pet.age}</td>
                <td className="px-4 py-4">
                  <button type="button">
                    <Trash2 className="text-gray-600" />
                  </button>
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
              page === Math.ceil(registeredPets.length / 6) - 1 ||
              registeredPets.length === 0
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

export default Pets;
