import React from 'react';
import { IoBarChartOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { CiBoxes } from "react-icons/ci";
import { LuCalendarClock } from "react-icons/lu";
import { PiHandshakeDuotone } from "react-icons/pi";
import { VscNotebook } from "react-icons/vsc";


const SideBar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-logo">
                    <img src="../src/assets/lotus-icon.png" alt="" />
                </div>
                <div className="sidebar-container">
                    <ul>
                        <li>
                            <a href="#">
                                <IoBarChartOutline className="icon" /> <span className="text">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <CiBoxes className="icon" /> <span className="text">Produtos</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <LuCalendarClock className="icon" /> <span className="text">Agendamentos</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <IoMdPerson className="icon" /> <span className="text">Perfil</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <PiHandshakeDuotone className="icon" /> <span className="text">Pagamentos</span>
                            </a>
                        </li>
                        <li>
                            {/* <a href="#">
                                <VscNotebook className="icon" /> <span className="text">Contact</span>
                            </a> */}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SideBar;