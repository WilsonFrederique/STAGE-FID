import { useState, MouseEvent } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { FaFolderOpen } from "react-icons/fa";
import MenuItem from '@mui/material/MenuItem';

import { HiDotsVertical } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";

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
                <span className="chart"><IoWarningOutline /></span>

                <div className="d-flex w-100">
                    <div className="col1 mb-0">
                        <h4 className='text-white'>Projets en Alerte</h4>
                        <span className='text-white'>5</span>
                    </div>

                    <div className="ms-auto">
                        <div className="icon">
                            {props.icon}
                        </div>
                    </div>
                </div>

                <div className="align-items-center w-100 bottomEle">
                    <div className="">
                        <div className="flex items-center justify-between text-gray-200">
                            <span>Retard: 3</span>
                            <span>Budget: 2</span>
                        </div>
                    </div>
                </div>
            </Button>
        </>
    )
}

export default DashboardBox