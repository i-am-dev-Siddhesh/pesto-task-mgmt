import Link from 'next/link';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FiMenu as Icon } from 'react-icons/fi';

type MenuBarMobileProps = {
    setter: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuBarMobile: React.FC<MenuBarMobileProps> = ({ setter }) => {
    return (
        <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-black flex [&>*]:my-auto px-2">
            <button
                className="text-4xl flex text-white"
                onClick={() => {
                    setter((oldVal) => !oldVal);
                }}
            >
                <Icon />
            </button>
            <Link href="/login" passHref>
                <p className="text-3xl flex text-white">
                    <FaUser />
                </p>
            </Link>
        </nav>
    );
};

export default MenuBarMobile;
