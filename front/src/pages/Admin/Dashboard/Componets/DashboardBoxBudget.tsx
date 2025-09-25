import { useState, MouseEvent } from 'react'
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { HiDotsVertical } from "react-icons/hi";
import { CiMoneyBill } from "react-icons/ci";
import { IoIosTimer } from "react-icons/io";
import { FaUsersBetweenLines } from "react-icons/fa6";

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
                {
                    props.grow === true ? 
                    <span className="chart"><TrendingUpIcon /></span> 
                    : 
                    <span className="chart"><CiMoneyBill /></span>
                }

                <div className="d-flex w-100">
                    <div className="col1 mb-0">
                        <h4 className='text-white'>Budget</h4>
                        <span className='text-white'>99.999.999 Ar</span>
                    </div>

                    <div className="ms-auto">
                        <div className="icon">
                            {props.icon}
                        </div>
                    </div>
                </div>

                <div className="align-items-center w-100 bottomEle">
                    <div className="">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-250">Engagé</p>
                                <p className="text-sm font-medium">70.000.000 Ar</p>
                            </div>
                            <div>
                                <p className="text-gray-250">Dépensé</p>
                                <p className="text-sm font-medium">29.999.999 Ar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Button>
        </>
    )
}

export default DashboardBox