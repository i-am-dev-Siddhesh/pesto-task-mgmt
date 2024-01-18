import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaBuilding, FaUser } from 'react-icons/fa';
import CreateTaskModal from '../Modal/CreateUpdateTaskModal';
import UserProfile from '../UserProfile/index.component';

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
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
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
  return (
    <>
      <div
        className={`${className}${appendClass} flex flex-col justify-between`}
      >
        <div className="flex flex-col mt-5">
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
          <button
            className="bg-white-500 text-white pl-6 flex items-center gap-2"
            onClick={handleOpen}
          >
            <div className="text-xl flex [&>*]:mx-auto w-[30px]">
              {' '}
              <FaUser />
            </div>
            Create Task{' '}
          </button>
        </div>
        <div className="mb-5 mx-5">
          <UserProfile name="Siddhesh" profileUrl="" />
        </div>
      </div>
      <CreateTaskModal isOpen={isOpen} onClose={handleClose} />
      {show ? <ModalOverlay /> : <></>}
    </>
  );
};

export default Sidebar;
