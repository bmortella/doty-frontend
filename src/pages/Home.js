/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import banner from "../assets/img/bannerimg2.jpg";
import line from "../assets/img/linesig.jpg";
import line2 from "../assets/img/line2.png";
import framebt from "../assets/img/framebt.jpg";
import avatarft from "../assets/img/avatarft.png";
import { HomeIcon, ClipboardIcon, UsersIcon } from "@heroicons/react/outline";

import { Link } from "react-router-dom";

const features = [
  {
    name: "1. Formulário",
    description:
      "Verifique todas as respostas do questionário padrão Doty e avalie se o possível adotante é qualificado para o animal em questão. Você pode aprová-lo ou reprová-lo e ele receberá uma notificação automática.",
    icon: ClipboardIcon,
  },
  {
    name: "2. Entrevista",
    description:
      "Agende um horário para entrevistar os possíveis adotantes aprovados na etapa de formulário para conhecê-los melhor. Após as entrevistas, você pode aprovar o adotante mais qualificado para a etapa final.",
    icon: UsersIcon,
  },
  {
    name: "3. Visita e Retirada",
    description:
      "Agende um horário com o adotante escolhido para que ele visite o abrigo, assine documentos e retire o animal. Confirme se a visita ocorreu para finalizar o processo de adoção na plataforma.",
    icon: HomeIcon,
  },
];

const navigation = [
  { name: "Sobre nós", href: "#about" },
  { name: "Como funciona", href: "#howitworks" },
];

export default function Home() {
  useEffect(() => {
    document.title = "Doty";
  }, []);

  return (
    <div>
      <div className="relative bg-[#202133] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative ml-[-45px] z-10 pl-12 pb-8 bg-[#202133] sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-34 2xl:pb-12">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-40 text-[#202133] transform translate-x-1/2  "
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100 " />
            </svg>

            <Popover>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <span className="text-4xl not-italic font-semibold font-grandstander text-white">
                        DOTY
                      </span>

                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Open main menu</span>
                          <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="font-poppins font-poppins font-medium text-[#BDBDD5]"
                      >
                        {item.name}
                      </a>
                    ))}
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Entrar
                    </a>
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-[#202133] ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <span className="ml-[35px] text-4xl not-italic font-semibold font-grandstander text-white">
                        DOTY
                      </span>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close main menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="ml-[35px] px-2 pt-2 pb-3 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2 text-base font-medium text-white hover:text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <a
                      href="#"
                      className="block w-full px-[5px] py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                    >
                      Entrar
                    </a>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <main className="mt-10 mx-auto max-w-10xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-18">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline text-white font-poppins">
                    A plataforma ideal para
                  </span>{" "}
                  <span className="block text-indigo-600 xl:inline text-[#115e59] font-poppins">
                    otimizar o seu processo de adoção
                  </span>
                </h1>
                <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Nós levamos a sério a adoção responsável e te ajudamos a
                  organizar os processos de adoção dos seus animais em um só
                  lugar.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#3B56AA] hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Comece agora
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 xl:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:pb-12 lg:h-[770px] xl:pb-4 xl:h-[678px] lg:w-full 2xl:pb-0 2xl:h-[710px] 2xl:pb-12"
            src={banner}
            alt=""
          />
        </div>
      </div>

      <div className="py-12 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <img className="  flex justify-center mx-auto " src={line} alt="" />

            <h2 className="text-5xl pt-5 text-[#3B56AA] font-extrabold text-center ">
              Sobre a Doty
            </h2>

            <p className="mb-[-45px] pt-5 pb-0 lg:absolutemt-4 max-w-5xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-gray-500 lg:mx-auto">
              Somos uma plataforma que organiza os processos de adoção dos seus
              animais. Em um só lugar você poderá acompanhar os adotantes de
              cada animal, podendo aprová-los ou reprová-los nas diferentes
              etapas do processo. Confira abaixo os principais recursos da Doty
              para otimizar o seu dia a dia:
            </p>
          </div>
        </div>
      </div>

      <div className="2xl:mx-96 lg:mx-30 mb-10">
        <dl className="bg-white md:grid md:grid-cols-3 ">
          {features.map((feature) => (
            <div key={feature.name} className="ml-[-65px] pt-10 relative  ">
              <dt>
                <div className="ml-20 flex items-center justify-center h-12 w-12 rounded-md bg-[#318478] text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="pt-5 ml-20 text-lg leading-6 font-medium text-[gray-900]">
                  {feature.name}
                </p>
              </dt>
              <dd className="mt-2 ml-20 text-base text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-[#202133] text-center" id="howitworks">
        <h2 className="text-[35px] text-white pb-5 md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl pt-5 font-extrabold lg:mb-[15px]">
          Como funciona?
        </h2>
        <img
          className="lg:mb-[15px] bg-[#202133]  flex justify-center mx-auto "
          src={line2}
          alt=""
        />

        <p className="text-white pt-5 pb-0 lg:absolutemt-4 max-w-5xl mb-[-30px] text-[20px] md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl lg:mx-auto">
          Comece a utilizar a Doty hoje mesmo e transforme o seu processo de
          adoção.
        </p>
      </div>

      <div className="bg-[#202133] h-[620px] md:h-[700px] lg:h-[900px] lg:w-full">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 ">
              <div className="lg:self-center">
                <div className="pb-5 ml-15 pb-0 mt-4 max-w-8xl text-2xl text-gray-500 lg:mx-auto mb-5 py-12 bg-[#202133]">
                  <div className="text-[15px] 2xl:ml-[-45px] mt-[-95px] md:text-[20px] lg:ml-[-25px] p-0 ml-[-12px] 2xl:max-w-8xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="xl:ml-[96px] flex items-center mb-5 flex ">
                      <div className="2xl:ml-[-75px] xl:ml-[-75px] text-white mr-4 flex items-center justify-center w-12 h-12 rounded-full border-2 ">
                        1
                      </div>
                      <p className="font-medium text-white">Crie sua conta</p>
                    </div>
                    <div className="xl:ml-[96px] flex items-center mb-5 flex ">
                      <div className="2xl:ml-[-75px] xl:ml-[-75px] text-white mr-4 flex items-center justify-center w-12 h-12 rounded-full border-2 ">
                        2
                      </div>

                      <p className="font-medium text-white">
                        Cadastre seus animais
                      </p>
                    </div>
                    <div className="xl:ml-[96px] flex items-center mb-5 flex ">
                      <div className="2xl:ml-[-75px] xl:ml-[-75px] text-white mr-4 flex items-center justify-center w-12 h-12 rounded-full border-2 ">
                        3
                      </div>

                      <p className="font-medium text-white">
                        Divulgue seu Doty link
                      </p>
                    </div>
                    <div className="xl:ml-[96px] flex items-center mb-5 flex ">
                      <div className="2xl:ml-[-75px] xl:ml-[-75px] text-white mr-4 flex items-center justify-center w-12 h-12 rounded-full border-2 ">
                        4
                      </div>

                      <p className="font-medium text-white">
                        Avalie formulários
                      </p>
                    </div>
                    <div className="xl:ml-[96px] flex items-center mb-5 flex ">
                      <div className="2xl:ml-[-75px] xl:ml-[-75px] text-white mr-4 flex items-center justify-center w-12 h-12 rounded-full border-2 ">
                        5
                      </div>

                      <p className="font-medium text-white">
                        Agende e faça entrevistas
                      </p>
                    </div>
                    <div className="xl:ml-[96px] flex items-center mb-5 flex ">
                      <div className="2xl:ml-[-75px] xl:ml-[-75px] text-white mr-4 flex items-center justify-center w-12 h-12 rounded-full border-2 ">
                        6
                      </div>

                      <p className="font-medium text-white">Agende a visita</p>
                    </div>
                    <div className="xl:ml-[96px] flex items-center mb-5 flex ">
                      <div className="2xl:ml-[-75px] xl:ml-[-75px] text-white mr-4 flex items-center justify-center w-12 h-12 rounded-full border-2 ">
                        7
                      </div>

                      <p className="font-medium text-white">
                        Finalize o processo
                      </p>
                    </div>

                    <div className="ml-[20px] md:mt-[55px] sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <Link
                          to="/signup"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#3B56AA] hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                          Comece agora
                        </Link>
                      </div>
                    </div>

                    <div className=" overflow-hidden absolute ml-15 -mt-[645px] aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                      <img
                        className="w-[0px] mt-[670px] ml-[0px] overflow-hidden 2xl:w-[800px] 2xl:ml-[1090px] 2xl:mt-[90px]  xl:w-[670px] xl:mt-[85px] xl:ml-[650px] lg:w-[700px] lg:ml-[400px] lg:mt-[90px] md:w-[500px] md:ml-[410px] md:mt-[70px]"
                        src={framebt}
                        alt="App screenshot"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-h-[500px] pb-0 pt-0 bg-indigo-600">
        <div className="mx-auto md:h-[400px] 2xl:h-[400px] xl:h-[400px] lg:h-[300px] h-[480px] lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="relative lg:-my-8">
            <div aria-hidden="true" className="" />
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
              <div className="">
                <img
                  className="object-cover lg:mt-[-55px] lg:p-5 md:h-[380px] md:w-[300px] md:p-5 p-5 w-[190px] ml-[-25px]"
                  src={avatarft}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
            <div className="mt-12 mx-auto max-w-md px-4 md:max-w-2xl md:px-6 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
              <blockquote>
                <div>
                  <svg
                    className="md:absolute md:mt-[-75px] md:ml-[235px] lg:mt-[-45px] lg:ml-[-65px] h-12 w-12 absolute mt-[-65px] text-white text-opacity-25 "
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="md:relative text-[5px] md:text-[18px] md:mt-[-340px] md:ml-[235px] lg:text-[23px] xl:text-[32px] lg:mt-[-70px] lg:ml-[-65px] md:text-[20px] text-[18px] mt-[-0px] font-medium text-white">
                    Amei usar a Doty! A plataforma tornou o processo de adoção
                    muito mais fácil e rápido. Agora consigo acompanhar todos os
                    meus processos em um lugar só.
                  </p>
                </div>
                <footer className="md:absolute lg:absolute xl:ml-[-65px] xl:mt-[25px] 2xl:mt-[40px] 2xl:ml-[-65px] lg:ml-[-65px] lg:mt-[15px] md:mt-[45px] md:ml-[235px] ml-[155px] mt-[-320px]">
                  <p className="text-base font-medium text-white">Helena</p>
                  <p className="text-base font-medium text-indigo-100">
                    Dona da ONG Cãozinho
                  </p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
