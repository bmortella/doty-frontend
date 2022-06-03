import { PlusCircle, Trash2, ArrowLeft, ArrowRight } from "react-feather";

import { Link } from "react-router-dom";

function WelcomeRegisterPet() {
  return (
    <div>
      <div className="px-4">
        <div className="text-center py-6">
          <p>
            Agora precisamos que você cadastre os cachorros disponíveis para
            adoção
          </p>
          <p className="text-sm text-neutral mt-1">É bem rapidinho!</p>
        </div>
        <button
          type="button"
          class="w-full text-primary bg-white border border-primary focus:ring-4 focus:outline-none focus:secondary-blue rounded-lg px-5 py-2.5 inline-flex justify-center items-center mr-2 mb-2"
        >
          <PlusCircle className="mr-2" size={20} />
          Adicionar Cachorro
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md rounded-lg mt-4 border border-gray-200">
        <table class="w-full text-sm text-left text-neutral">
          <thead class="text-xs uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 ">
                Nome
              </th>
              <th scope="col" class="px-6 py-3">
                Sexo
              </th>
              <th scope="col" class="px-6 py-3">
                Porte
              </th>
              <th scope="col" class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b odd:bg-white even:bg-gray-50">
              <th scope="row" class="px-6 py-4 text-primary">
                Pipoca
              </th>
              <td class="px-6 py-4">Macho</td>
              <td class="px-6 py-4">Pequeno</td>
              <td class="px-4 py-4">
                <button>
                  <Trash2 className="text-gray-600" />
                </button>
              </td>
            </tr>
            <tr class="bg-white border-b odd:bg-white even:bg-gray-50">
              <th scope="row" class="px-6 py-4 text-primary">
                Torresmo
              </th>
              <td class="px-6 py-4">Macho</td>
              <td class="px-6 py-4">Grande</td>
              <td class="px-4 py-4">
                <button>
                  <Trash2 className="text-gray-600" />
                </button>
              </td>
            </tr>
            <tr class="bg-white border-b odd:bg-white even:bg-gray-50">
              <th scope="row" class="px-6 py-4 text-primary">
                Enrico
              </th>
              <td class="px-6 py-4">Macho</td>
              <td class="px-6 py-4">Pequeno</td>
              <td class="px-4 py-4">
                <button>
                  <Trash2 className="text-gray-600" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-nowrap justify-between mx-4">
          <button className="inline-flex justify-center items-center text-neutral py-4">
            <ArrowLeft className="text-gray-600 mr-2" />
            Anterior
          </button>
          <button className="inline-flex justify-center items-center text-neutral py-4">
            Próximo
            <ArrowRight className="text-gray-600 ml-2" />
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full mt-8 px-4">
        <Link
          to="/login"
          className="block lg:w-80 text-center bg-primary text-white disabled:bg-neutral focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-base px-4 py-2.5 mr-2 mb-2 focus:outline-none"
        >
          Finalizar Cadastro
        </Link>
        <Link
          to="/login"
          className="block lg:w-80 text-center bg-white disabled:bg-neutral focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-base px-4 py-2.5 mr-2 mb-2 focus:outline-none"
        >
          Pular
        </Link>
      </div>
    </div>
  );
}

export default WelcomeRegisterPet;
