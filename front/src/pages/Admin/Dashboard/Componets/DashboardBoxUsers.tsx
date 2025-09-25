import { useState, MouseEvent } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { HiDotsVertical } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import { FaBroadcastTower } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";

interface DashboardBoxProps {
  color?: [string, string];
  grow?: boolean;
  icon?: React.ReactNode;
}

const DashboardBox = (props: DashboardBoxProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;
    
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button className="dashboardBox" style={{
                backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
            }}>
                <span className="chart"><LuUsers /></span>

                <div className="d-flex w-100">
                    <div className="col1 mb-0">
                        <h4 className='text-white'>Utilisateurs Connectés</h4>
                        <span className='text-white'>18</span>
                    </div>

                    <div className="ms-auto">
                        <div className="icon">
                            {props.icon}
                        </div>
                    </div>
                </div>

                <div className="align-items-center w-100 bottomEle">
                    <div className="">
                        <div className="flex items-center space-x-1">
                            <div className="flex -space-x-4">
                                <img className="w-6 h-6 rounded-full border-2 border-white" src="http://static.photos/people/200x200/1" alt="User" />
                                <img className="w-6 h-6 rounded-full border-2 border-white" src="http://static.photos/people/200x200/2" alt="User" />
                                <img className="w-6 h-6 rounded-full border-2 border-white" src="http://static.photos/people/200x200/3" alt="User" />
                            </div>
                            <span className="text-gray-100">+15 autres</span>
                        </div>
                    </div>
                </div>
            </Button>
        </>
    )
}

export default DashboardBox