import AdoptionFormLayout from "../../components/AdoptionFormLayout";

import SelectForm from "../../components/adopter/form/SelectForm";
import InputForm from "../../components/adopter/form/InputForm";

import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

import api from "../../apis/api";

// Images
import success from "../../assets/img/success.svg";
import instagramPost from "../../assets/img/instagram-post.svg";
import location from "../../assets/img/location.svg";
import noCommentsYet from "../../assets/img/no-comments-yet.svg";
import restingCat from "../../assets/img/resting-cat.svg";
import designer from "../../assets/img/designer.svg";
import coding from "../../assets/img/coding.svg";

function FormForAdoption() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { id } = useParams();

  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log(authContext.adoptionForm);
    async function getPets() {
      try {
        const response = await api.get(`/pets/${id}`);
        setPets(response.data);
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 422) {
          navigate("/");
        }
      }
    }
    getPets();
  }, []);

  const [index, setIndex] = useState(0);

  const forms = [
    {
      form: (
        <SelectForm
          title="Qual o nome do animal que você pretende adotar?"
          subtitle="Me conte qual animal você quer como melhor amigo."
          options={pets}
          next={next}
          back={back}
          name="petId"
        />
      ),
      image: success,
    },
    {
      form: (
        <InputForm
          title="Você já teve algum animal antes? Se sim, quantos?"
          subtitle="Queremos te conhecer melhor! Caso não tenha tido animais, fique tranquilo, essa questão não é desclassificatória."
          next={next}
          back={back}
          name="everHadAPet"
        />
      ),
      image: instagramPost,
    },
    {
      form: (
        <InputForm
          title="O animal irá morar em casa, apartamento ou outro ambiente?"
          subtitle="Queremos te conhecer melhor! Fique tranquilo, essa questão não é desclassificatória."
          next={next}
          back={back}
          name="houseType"
        />
      ),
      image: location,
    },
    {
      form: (
        <InputForm
          title="Quantas horas você passa em casa por dia?"
          subtitle="Queremos te conhecer melhor! Fique tranquilo, essa questão não é desclassificatória."
          next={next}
          back={back}
          name="timeSpentAtHome"
        />
      ),
      image: noCommentsYet,
    },
    {
      form: (
        <InputForm
          title="O animal ficará em um cômodo específico ou terá acesso à casa toda?"
          subtitle="Queremos te conhecer melhor! Fique tranquilo, essa questão não é desclassificatória."
          next={next}
          back={back}
          name="petAccess"
        />
      ),
      image: restingCat,
    },
    {
      form: (
        <InputForm
          title="Qual o seu endereço completo?"
          subtitle="Queremos te conhecer melhor! Não se preocupe, essa informação é somente para sabermos onde o animal irá ficar."
          next={next}
          back={back}
          name="address"
        />
      ),
      image: designer,
    },
    {
      form: (
        <InputForm
          title="Você tem Instagram?"
          subtitle="Se sim, insira o link do seu perfil abaixo."
          next={next}
          back={back}
          name="instagram"
        />
      ),
      image: coding,
    },
  ];

  function back() {
    if (index - 1 < 0) {
      navigate(`/guardian/${id}`);
    } else {
      setIndex(index - 1);
    }
  }

  function next(data) {
    setFormData({ ...formData, ...data });
    if (index + 1 >= forms.length) {
      authContext.setAdoptionForm(formData);
      console.log(formData);
      navigate("/loginpage");
    }
    setIndex(index + 1);
  }

  return (
    <AdoptionFormLayout.Layout>
      <AdoptionFormLayout.Form>{forms[index].form}</AdoptionFormLayout.Form>
      <AdoptionFormLayout.Image src={forms[index].image} />
    </AdoptionFormLayout.Layout>
  );
}

export default FormForAdoption;
