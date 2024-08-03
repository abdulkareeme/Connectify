/* eslint-disable no-unused-vars */
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Navbar = () => {
  const navLinks = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Shop",
      link: "/shop",
    },
    {
      label: "Favorite",
      link: "/favorite",
    },
  ];

  return (
    <>
      <nav className="relative z-20 flex shrink-0 items-center space-x-2 bg-layer-2 py-3 px-4 sm:px-6">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2.5 font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
        >
          {/* <MenuAlt1Icon className="h-6 w-6" /> */}
        </button>
        <a href="#">
          {/* Logo */}
          <div className="h-7 text-heading">
            <svg
              viewBox="0 0 40 34"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full"
            >
              <path
                d="M9.15527e-05 33.3334H27.2917L40 22.1876H12.9167L9.15527e-05 33.3334Z"
                fillOpacity="0.5"
              />
              <path
                d="M40.0003 22.1874H12.7086L0.000320435 11.1457H27.0836L40.0003 22.1874Z"
                fillOpacity="0.7"
              />
              <path d="M9.15527e-05 11.1459H27.2917L40 5.34058e-05H12.9167L9.15527e-05 11.1459Z" />
            </svg>
          </div>
        </a>
        <div className="flex flex-1 space-x-1.5 px-4">
          <a
            href="#"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-secondary bg-secondary px-3 py-2 text-xs font-semibold text-white shadow-sm hover:border-secondary-accent hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-orange-400/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:border-secondary disabled:hover:bg-secondary disabled:hover:text-white dark:focus:ring-white/80"
          >
            Overview
          </a>
          <a
            href="#"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-transparent bg-transparent px-3 py-2 text-xs font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
          >
            Reports
          </a>
          <a
            href="#"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-transparent bg-transparent px-3 py-2 text-xs font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
          >
            Users
          </a>
          <a
            href="#"
            className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-transparent bg-transparent px-3 py-2 text-xs font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
          >
            Permissions
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <label
              htmlFor="search"
              className="sr-only block text-sm font-semibold text-heading"
            >
              Search
            </label>
            <div className="relative flex">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-shrink-0 items-center pl-4 focus-within:z-20">
                {/* <SearchIcon className="h-5 w-5 text-text" /> */}
              </div>
              <input
                id="search"
                name="search"
                placeholder="Search"
                className="block w-full rounded-xl border-2 border-layer-3 bg-muted-1 px-4 py-2.5 pl-11 pr-14 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex flex-shrink-0 items-center pr-4 focus-within:z-20">
                <kbd className="rounded-md bg-muted-3 px-2 py-1 font-sans text-sm text-text">
                  ⌘ K
                </kbd>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2.5 font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
            >
              {/* <BellIcon className="h-6 w-6" /> */}
            </button>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2.5 font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
            >
              {/* <MoonIcon className="h-6 w-6" /> */}
            </button>
            <Menu as="div" className="relative">
              <Menu.Button type="button">
                <img
                  src="/assets/avatars/nicholas-turner.png"
                  alt="avatar"
                  className="inline-block h-8 w-8 rounded-full"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-layer-3 py-3 shadow-xl focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-muted-1 text-heading" : "text-text"
                        } flex w-full cursor-pointer items-center px-4 py-2 text-sm font-semibold`}
                      >
                        Profile
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-muted-1 text-heading" : "text-text"
                        } flex w-full cursor-pointer items-center px-4 py-2 text-sm font-semibold`}
                      >
                        Settings
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-muted-1 text-heading" : "text-text"
                        } flex w-full cursor-pointer items-center px-4 py-2 text-sm font-semibold`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
