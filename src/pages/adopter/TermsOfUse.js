import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import shopping from "../../assets/img/shopping.svg";
import technologies from "../../assets/img/technologies.svg";
import location from "../../assets/img/location.svg";

function TermsOfUse() {
  const imgs = [shopping, technologies, location];
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  function next() {
    if (index + 1 === 3) {
      navigate("/adopter/terms/form");
    }
    setIndex(index + 1);
  }
  const frase1 =
    "Sua casa ou apartamento precisa ter proteção (telas, muros) para que o animal não fuja ou se machuque.";
  const frase2 = "Você terá gastos com a alimentação e a saúde do animal.";
  const frase3 =
    "Caso você more em um local alugado, é essencial ter certeza que é permitido ter um animal";
  const allFrases = [frase1, frase2, frase3];

  return (
    <div>
      <div className="pt-5 text-center flex flex-col items-center justify-center sm:mx-2.5 sm:mt-5 sm:rounded-lg lg:py-6 lg:my-8">
        <div className="text-secondary-blue text-lg my-10 sm:text-xl font-semibold px-1 lg:text-2xl lg:mb-2">
          Antes de começar, é importante que você saiba que:
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-5 mt-5">
            <img src={imgs[index]} alt="" />
          </div>
          <div className="w-11/12">{allFrases[index]}</div>
        </div>
        <button className="btn mt-5 w-4/5 xl:w-3/5 lg:w-3/5" onClick={() => next()}>
          Concordo
        </button>
        <Link to="/">Discordo</Link>
      </div>
    </div>
  );
}

export default TermsOfUse;
