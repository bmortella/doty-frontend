import { Fragment, useContext, useState } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

import { Link as LinkIcon } from "react-feather";

import "../assets/styles/background.css";

const navigation = [
  { name: "Página Inicial", href: "", end: true },
  { name: "Animais Cadastrados", href: "pets", end: false },
  { name: "Adotantes", href: "adopters", end: false },
];

const userNavigation = [
  { name: "Meu Perfil", href: "dashboard/profile" },
  { name: "Sair", href: "/signout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StackedLayout() {
  const authContext = useContext(AuthContext);
  const [title, setTitle] = useState("");

  function copyLink() {
    window.navigator.clipboard.writeText(
      `${window.location.href.split("/")[2]}/guardian/${
        authContext.loggedInUser.user._id
      }`
    );
  }

  return (
    <>
      <div className="min-h-full h-full">
        <Disclosure as="nav" className="bg-primary">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-700">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <h1 className="text-[32px] font-grandstander uppercase text-white">
                        Doty
                      </h1>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            end={item.end}
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                              classNames(
                                isActive
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )
                            }
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            {authContext.loggedInUser.user.avatar ? (
                              <img
                                className="h-8 w-8 rounded-full"
                                src={authContext.loggedInUser.user.avatar}
                                alt=""
                              />
                            ) : (
                              <a
                                className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 rounded-full hover:bg-gray-600"
                                href="#"
                              >
                                {authContext.loggedInUser.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join(".")
                                  .toUpperCase()}
                              </a>
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={
                        "block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  {/* <button
                    className="btn font-normal text-sm inline-flex justify-center items-center bg-secondary-blue"
                    onClick={copyLink}
                  >
                    <LinkIcon className="mr-2" size={20} />
                    Copiar link do processo de adoção
                  </button> */}
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {authContext.loggedInUser.user.avatar ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={authContext.loggedInUser.user.avatar}
                          alt=""
                        />
                      ) : (
                        <a
                          className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full hover:bg-gray-600"
                          href="#"
                        >
                          {authContext.loggedInUser.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join(".")
                            .toUpperCase()}
                        </a>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {authContext.loggedInUser.user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {authContext.loggedInUser.user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-primary pb-52">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between">
              <h1 className="text-3xl font-bold text-white">{title}</h1>
              {/* <button
                className="btn font-normal text-sm hidden md:w-80 md:inline-flex justify-center items-center bg-secondary-blue"
                onClick={copyLink}
              >
                <LinkIcon className="mr-2" size={20} />
                Copiar link do processo de adoção
              </button> */}
            </div>
          </div>
        </header>
        <main className="-mt-52 relative">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md">
            <Outlet context={{ setTitle }} />
          </div>
        </main>
      </div>
    </>
  );
}
