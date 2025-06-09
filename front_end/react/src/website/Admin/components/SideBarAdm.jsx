import React from 'react';
import { IoBarChartOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { CiBoxes } from "react-icons/ci";
import { LuCalendarClock } from "react-icons/lu";
import { PiHandshakeDuotone } from "react-icons/pi";
import { BiLogOut } from 'react-icons/bi';
import { MdListAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const SideBarAdm = () => {
    const navigate = useNavigate();
    const Logout = (event) => {
        event.preventDefault();
        sessionStorage.clear();
        localStorage.clear();
        navigate('/'); 
    };    
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-logo">
                    <img src="/assets/lotus-icon.png"lt="Lotus Icon" style={{ width: "55px", height: "auto" }} />
                </div>
                <div className="sidebar-container">
                    <ul>
                        <li>
                            <a href="Dashboard">
                                <IoBarChartOutline className="icon" /> <span className="text">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/painel-de-kpis">
                                <MdListAlt className="icon" /> <span className="text">Painel de KPIs</span>
                            </a>
                        </li>
                        <li>
                            <a href="/produtosAdm">
                                <CiBoxes className="icon" /> <span className="text">Produtos</span>
                            </a>
                        </li>
                        <li>
                            <a href="/agendamento-servicoAdm">
                                <LuCalendarClock className="icon" /> <span className="text">Agendamentos</span>
                            </a>
                        </li>
                        <li>
                            <a href="/Usuarios">	
                                <IoMdPerson className="icon" /> <span className="text">Usuarios</span>
                            </a>
                        </li>
                        <li>
                            <a href="pedidosAdm">
                                <PiHandshakeDuotone className="icon" /> <span className="text">Pedidos</span>
                            </a>
                        </li>
                       <li>
                            <a onClick={Logout}>
                                <BiLogOut className="icon" /> <span className="text">Sair</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SideBarAdm;