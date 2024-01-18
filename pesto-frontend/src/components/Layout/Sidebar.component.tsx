import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaBuilding, FaUser } from 'react-icons/fa';
import CreateTaskModal from '../Modal/CreateUpdateTaskModal';
import UserProfile from '../UserProfile/index.component';
import { removeBearerToken } from '@/src/utils/tokenUtils';

type MenuItemProps = {
  icon: React.ReactNode;
  name: string;
  route: string;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, name, route, setter }) => {
  const router = useRouter();

  const colorClass =
    router.pathname === route ? 'text-white' : 'text-white/50 hover:text-white';

  return (
    <Link
      href={route}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
      legacyBehavior
    >
      <div
        className={`flex cursor-pointer gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <p>{name}</p>
      </div>
    </Link>
  );
};

type SidebarProps = {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({ show, setter }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const className =
    'bg-black w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40';
  const appendClass = show ? ' ml-0' : ' ml-[-250px] md:ml-0';

  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    removeBearerToken();
    router.push('/signin');
  };
  return (
    <>
      <div
        className={`${className}${appendClass} flex flex-col justify-between`}
      >
        <div className="flex flex-col mt-10 gap-2">
          <MenuItem
            name="Home"
            route="/"
            icon={<FaBuilding />}
            setter={setter}
          />
          <MenuItem
            name="Profile"
            route="/profile"
            icon={<FaUser />}
            setter={setter}
          />
          <button type="button" className="py-2.5 px-5 mt-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center gap-2 mx-5"  onClick={handleOpen}><FaUser />Create Task</button>
           
        </div>
        <div className="mb-5 mx-5 flex flex-col gap-2">
          <UserProfile name="Siddhesh" profileUrl="" />
          <button
            type="button"
            className=" w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleLogout}
          >
            Logoout
          </button>
        </div>
      </div>
      <CreateTaskModal isOpen={isOpen} onClose={handleClose} />
      {show ? <ModalOverlay /> : <></>}
    </>
  );
};

export default Sidebar;
