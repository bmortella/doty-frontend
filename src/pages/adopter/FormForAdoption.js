import React from "react";
import { ReactDOM } from "react-dom/client";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setLocale } from "yup";
import { AuthContext } from "../../contexts/authContext";
import api from "../../apis/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import success from "../../assets/img/success.svg";
// import instagramPost from "../../assets/img/instagram-post.svg";
// import location from "../../assets/img/location.svg";
// import selfie from "../../assets/img/selfie.svg";
// import frame1 from "../../assets/img/Frame 1.svg";
// import noCommentsYet from "../../assets/img/No comments yet.svg";
// import frame178 from "../../assets/img/Frame 178.svg";
// import designer from "../../assets/img/designer.svg";
// import Coding from "../../assets/img/Coding.svg";

function FormForAdoption() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dogosName, setDogosName] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function getDogosName() {
      try {
        const response = await api.get(`/pets/${id}`);
        setDogosName(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    getDogosName();
  }, []);

  setLocale({
    mixed: { required: "Campo obrigatório" },
    string: {
      min: "Deve conter no mínimo ${min} caracteres",
      max: "Deve conter no máximo ${max} caracteres",
    },
  });
  const schema = yup
    .object({
      name: yup.string().required(),
      animalQuantity: yup.string().required(),
      livingPlace: yup.string().required().min(4).max(24),
      peopleAmount: yup.string().required(),
      childrenAge: yup.string().required().min(1).max(48),
      hoursHome: yup.string().required().min(1).max(24),
      petsPlace: yup.string().required().min(4).max(48),
      address: yup.string().required().min(25),
      instagram: yup.string().required().min(5),
    })
    .required();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function onSubmit(data) {
    try {
      authContext.setGuardianForm(data)
      navigate(`/adopter/${id}/signup`, { replace: true }); // TODO: navegar para termos
    } catch (err) {
      // Se ha response, a API retornou uma mensagem.
      if (err.response) {
        if (err.response.data.errors?.msg === "USER_ALREADY_EXISTS") {
          setError(
            "email",
            {
              type: "custom",
              message:
                "O formulário não foi preenchido de maneira correta, por favor, refaça-o",
            },
            { shouldFocus: true }
          );
        }
      }
      // TODO: mostrar popup de erro
      //console.error(err);
    }
  }

  return (
    <div>
      <div className="flex flex-col text-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col"
          id="signup"
        >
          <div className="mb-6">
            <label
              for="name"
              className="block mb-2 text-secondary-blue text-lg my-10 sm:text-xl font-semibold px-1 lg:text-2xl lg:mb-2"
            >
              Qual o nome do animal que você pretende adotar?
            </label>
            <p className="text-base font-normal">
              Me conte qual animal você quer como melhor amigo
            </p>
            <select
              type="text"
              id="name"
              placeholder="Responda aqui"
              className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
              defaultValue=""
              {...register("name")}
            >
              {dogosName.map((dogo) => (
                <option value={dogo.name}>{dogo.name}</option>
              ))}
            </select>
            {errors.name?.message && (
              <p className="mt-2 text-sm text-error">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="animalQuantity"
              className="block mb-2 text-secondary-blue text-lg my-10 sm:text-xl font-semibold px-1 lg:text-2xl lg:mb-2"
            >
              Você já teve algum animal antes? Se sim, quantos?
            </label>
            <p>
              Queremos te conhecer melhor! Caso não tenha tido animais, fique
              tranquilo, essa questão não é desclassificatória.
            </p>
            <input
              type="text"
              id="animalQuantity"
              placeholder="Responda aqui"
              className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
              {...register("animalQuantity")}
            />
            {errors.animalQuantity?.message && (
              <p className="mt-2 text-sm text-error">
                {errors.animalQuantity.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="livingPlace"
              className="block mb-2 text-secondary-blue text-lg my-10 sm:text-xl font-semibold px-1 lg:text-2xl lg:mb-2"
            >
              O animal irá morar em casa, apartamento ou outro ambiente?
            </label>
            <p>
              Queremos te conhecer melhor! Fique tranquilo, essa questão não é
              desclassificatória
            </p>
            <input
              type="text"
              name="livingPlace"
              id="livingPlace"
              placeholder="Responda aqui"
              className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
              {...register("livingPlace")}
            />
            {errors.livingPlace?.message && (
              <p className="mt-2 text-sm text-error">
                {errors.livingPlace.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="peopleAmount"
              className="block mb-2 text-secondary-blue text-lg my-10 sm:text-xl font-semibold px-1 lg:text-2xl lg:mb-2"
            >
              Quantas pessoas vão morar com o animal?
            </label>
            <p>
              Queremos te conhecer melhor! Fique tranquilo, essa questão não é
              desclassificatória (informe o número de adultos e crianças)
            </p>
            <input
              type="text"
              name="peopleAmount"
              id="peopleAmount"
              placeholder="Responda aqui"
              className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
              {...register("peopleAmount")}
            />
            {errors.peopleAmount?.message && (
              <p className="mt-2 text-sm text-error">
                {errors.peopleAmount.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="childrenAge"
              className="block mb-2 text-secondary-blue text-lg my-10 sm:text-xl font-semibold px-1 lg:text-2xl lg:mb-2"
            >
              Qual a idade da(s) criança(s)?
            </label>
            <p>
              Queremos te conhecer melhor! Caso não tenha tido animais, fique
              tranquilo, essa questão não é desclassificatória.
            </p>
            <input
              type="text"
              name="childrenAge"
              id="childrenAge"
              placeholder="Responda aqui"
              className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
              {...register("childrenAge")}
            />
            {errors.childrenAge?.message && (
              <p className="mt-2 text-sm text-error">
                {errors.childrenAge.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="hoursHome"
              className="block mb-2 text-secondary-blue text-lg my-10 sm:text-xl font-semibold px-1 lg:text-2xl lg:mb-2"
            >
              Quantas horas você passa em casa por dia?
            </label>
            <p>
              Queremos te conhecer melhor! Fique tranquilo, essa questão não é
              desclassificatória
            </p>
            <input
              id="hoursHome"
              type="text"
              name="hoursHome"
              placeholder="Responda aqui"
              className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
              {...register("hoursHome")}
            />
            {errors.hoursHome?.message && (
              <p className="mt-2 text-sm text-error">
                {errors.hoursHome.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="petsPlace"
              className="block mb-2 text-secondary-blue text-lg my-10 sm:text-xl font-semibold px-1 lg:text-2xl lg:mb-2"
            >
              O animal ficará em um cômodo específico ou terá acesso à casa
              toda?
            </label>
            <p>
              Queremos te conhecer melhor! Fique tranquilo, essa questão não é
              desclassificatória
            </p>
            <input
              id="petsPlace"
              type="text"
              name="petsPlace"
              placeholder="Responda aqui"
              className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
              {...register("petsPlace")}
            />
            {errors.petsPlace?.message && (
              <p className="mt-2 text-sm text-error">
                {errors.petsPlace.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="address"
              className="block mb-2 text-secondary-blue text-lg my-10 sm:text-xl font-semibold px-1 lg:text-2xl lg:mb-2"
            >
              Qual o seu endereço completo?
            </label>
            <p>
              Queremos te conhecer melhor! Não se preocupe, essa informação é
              somente para sabermos onde o animal irá ficar.
            </p>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Responda aqui"
              className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
              {...register("address")}
            />
            {errors.address?.message && (
              <p className="mt-2 text-sm text-error">
                {errors.address.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              for="instagram"
              className="block mb-2 text-secondary-blue text-lg my-10 sm:text-xl font-semibold px-1 lg:text-2xl lg:mb-2"
            >
              Você tem Instagram?
            </label>
            <p>Se sim, insira o link do seu perfil abaixo.</p>
            <input
              id="instagram"
              type="text"
              name="instagram"
              placeholder="Responda aqui"
              className="text-sm text-neutral focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-0 border-b-2 border-gray-300"
              {...register("instagram")}
            />
            {errors.instagram?.message && (
              <p className="mt-2 text-sm text-error">
                {errors.instagram.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <button
              type="submit"
              form="signup"
              className="w-11/12 text-white bg-primary disabled:bg-neutral focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-base px-11 py-2.5 mr-2 mb-2 focus:outline-none"
            >
              Criar Conta
            </button>
          </div>
        </form>
        <Link to="/adopter/terms">Voltar</Link>
      </div>
    </div>
  );
}

export default FormForAdoption;
