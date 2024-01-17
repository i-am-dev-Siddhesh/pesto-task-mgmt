import React, { useState, ReactNode } from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar.component';
import MenuBarMobile from './MenuBarMobile.component';

type LayoutProps = {
  pageTitle?: string;
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ pageTitle, children }) => {
  let titleConcat = 'Pesto tech';
  if (pageTitle) titleConcat = pageTitle + ' | ' + titleConcat;

  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Head>
        <title>{titleConcat}</title>
      </Head>
      <div className="min-h-screen">
        <div className="flex">
          <MenuBarMobile setter={setShowSidebar} />
          <Sidebar show={showSidebar} setter={setShowSidebar} />
          <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen mx-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
