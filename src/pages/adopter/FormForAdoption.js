import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import success from "../../assets/img/success.svg";
import instagramPost from "../../assets/img/instagram-post.svg";
import location from "../../assets/img/location.svg";
import selfie from "../../assets/img/selfie.svg";
import frame1 from "../../assets/img/Frame 1.svg";
import noCommentsYet from "../../assets/img/No comments yet.svg";
import frame178 from "../../assets/img/Frame 178.svg";
import designer from "../../assets/img/designer.svg";
import Coding from "../../assets/img/Coding.svg";

function FormForAdoption() {
  const imgs = [
    success,
    instagramPost,
    location,
    selfie,
    frame1,
    noCommentsYet,
    frame178,
    designer,
    Coding,
  ];
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  function next() {
    if (index + 1 === imgs.length) {
      navigate("/");
    }
    setIndex(index + 1);
  }
  const frase1 =
    ["Qual o nome do animal que você pretende adotar?", "Me conte qual animal você quer como melhor amigo."];
  const frase2 = ["Você já teve algum animal antes? Se sim, quantos?", "Queremos te conhecer melhor! Caso não tenha tido animais, fique tranquilo, essa questão não é desclassificatória."];
  const frase3 =
    ["O animal irá morar em casa, apartamento ou outro ambiente?", "Queremos te conhecer melhor! Fique tranquilo, essa questão não é desclassificatória."];
  const frase4 = ["Quantas pessoas vão morar com o animal?", "Queremos te conhecer melhor! Fique tranquilo, essa questão não é desclassificatória."];

  const allFrases = [frase1, frase2, frase3, frase4];
  return (
    <div>
      <div>
        <div>
          <div>
            <div>Titulo</div>
            <div>Subtitulo</div>
          </div>
          <div>
            <div>Input da resposta</div>
          </div>
        </div>
        <button>Concordo</button>
        <button>Voltar</button>
      </div>
      <div>
        <img alt="" />
      </div>
    </div>
  );
}

export default FormForAdoption;
