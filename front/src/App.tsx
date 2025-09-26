import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Admin/Dashboard/DashboardIndex";
import Header from "./components/Header/Header";
import SidBar from "./components/SidBar/Admin/SidBar";

import Enseignants from "./pages/Admin/Enseignants/Enseignants";
import EnseignantsDetail from "./pages/Admin/Enseignants/Components/EnseignantsDetail/EnseignantsDetail";

import ProjetListes from "./pages/Admin/Projets/ProjetListes";
import BudgetVS from "./pages/Admin/Projets/BudgetVS";
import MatiersFrm from "./pages/Admin/MatiersFRM/MatiersFrm";


const MyContext = createContext();

export default function App() {
  // Initialisation des états avec localStorage
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme !== null ? savedTheme === 'light' : true;
  });

  const [isOpenNav, setIsOpenNav] = useState(() => {
    try {
      const saved = localStorage.getItem('isOpenNav');
      return saved === "true"; // Assure que c’est bien un booléen
    } catch {
      return false;
    }
  });

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Gestion du thème
  useEffect(() => {
    const themeClass = themeMode ? 'light' : 'dark';
    const oppositeClass = themeMode ? 'dark' : 'light';
    
    document.body.classList.remove(oppositeClass);
    document.body.classList.add(themeClass);
    localStorage.setItem('themeMode', themeClass);
  }, [themeMode]);


  // Gestion du resize de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeNav = () => {
    setIsOpenNav(false);
    localStorage.setItem('isOpenNav', "false");
  };
  
  const openNav = () => {
    setIsOpenNav(true);
    localStorage.setItem('isOpenNav', "true");
  };
  
  const toggleNav = () => {
    setIsOpenNav(prev => {
      const newState = !prev;
      localStorage.setItem('isOpenNav', newState.toString());
      return newState;
    });
  };

  const toggleTheme = () => {
    setThemeMode(prev => !prev);
  };

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    themeMode,
    setThemeMode: toggleTheme,
    windowWidth,
    isOpenNav,
    setIsOpenNav,
    toggleNav,
    openNav,
    closeNav
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {isHideSidebarAndHeader !== true && <Header />}

        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <>
              <div 
                className={`sidebarOverlay d-none ${isOpenNav && 'show'}`} 
                onClick={closeNav}
              />
              <div 
                className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""} ${isOpenNav ? 'open' : ''}`}
              >
                <SidBar />
              </div>
            </>
          )}

          <div className={`content ${isHideSidebarAndHeader && 'full'} ${isToggleSidebar && "toggle"}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              <Route path="/enseignants" element={<Enseignants />} />
              <Route path="/enseignants/details" element={<EnseignantsDetail />} />

              <Route path="/projetListes" element={<ProjetListes />} />
              <Route path="/budgetVS" element={<BudgetVS />} />
              <Route path="/matiereFrm" element={<MatiersFrm />} />

            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export { MyContext };