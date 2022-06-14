import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function InputForm(props) {
  const schema = yup
    .object({
      [props.name]: yup.string().required("Este campo é obrigatório"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({ resolver: yupResolver(schema) });

  function onSubmit(data) {
    props.next(data);
    reset();
  }

  return (
    <>
      <h1 className="text-secondary-blue font-semibold text-[22px]">
        {props.title}
      </h1>
      <p className="text-base mt-2">{props.subtitle}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex flex-col"
        id="selectForm"
      >
        <div className="mt-6">
          <input
            type="text"
            id={props.name}
            placeholder="Responda aqui"
            className="block py-2.5 px-0 w-full text-sm text-neutral border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0"
            {...register(props.name)}
          />
          {errors[props.name]?.message && (
            <p className="mt-2 text-sm text-error">
              {errors[props.name].message}
            </p>
          )}
        </div>
      </form>
      <div className="mt-28">
        <button
          type="submit"
          className="btn"
          form="selectForm"
          disabled={!isDirty}
        >
          Próximo
        </button>
        <button
          type="button"
          className="btn btn-outline border-0"
          onClick={props.back}
        >
          Voltar
        </button>
      </div>
    </>
  );
}

export default InputForm;
