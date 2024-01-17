import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaUser } from 'react-icons/fa';

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

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div className="p-2 flex"></div>
                <div className="flex flex-col">
                    <MenuItem name="Home" route="/" icon={<FaUser />} setter={setter} />
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    );
};

export default Sidebar;
