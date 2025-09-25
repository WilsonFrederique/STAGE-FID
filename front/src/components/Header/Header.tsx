import React, {useContext, useState} from 'react'

import Logo from '../../assets/images/logoFID.png'
import Profil from '../../assets/images/Profil.png'

import { Link } from 'react-router-dom'
import SearachBox from '../SearachBox/SearachBox';
import UserAvatarImg from '../userAvatarImg/UserAvatarImg';

import Button from '@mui/material/Button';

import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FaUser } from "react-icons/fa6";
import { IoShieldHalfSharp } from "react-icons/io5";
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import { MyContext } from '../../App'

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [isOpenNotificationDrop, setisOpenNotificationDrop] = useState(false);
    const openMyAcc = Boolean(anchorEl);
    const openNotifications = Boolean(isOpenNotificationDrop);


    const context = useContext(MyContext)

    const handleOpenMyAccDrop = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMyAccDrop = () => {
        setAnchorEl(null);
    };

    const handleOpenNotificationsMyAccDrop = () => {
        setisOpenNotificationDrop(true)
    };
    const handleCloseNotificationsMyAccDrop = () => {
        setisOpenNotificationDrop(false)
    };

    return (
        <>
            <header className='d-flex align-items-center'>
                <div className="container-fluid w-100">
                    <div className="row d-flex align-items-center w-100 ">
                        <div className="col-sm-2 part1">
                            <Link to="/" className='d-flex align-items-center logoFID'>
                                <img src={Logo} alt="Logo" />
                                {/* <span className="ms-0 text-logo">FID</span> */}
                            </Link>
                        </div>

                        {/* Responsive */}
                        {
                            context.windowWidth> 992 && 
                                <div className="col-sm-3 d-flex align-items-center part2 padding res-hide">
                                    <Button className='rounded-circle me-3' onClick={() => context.setIsToggleSidebar(!context.isToggleSidebar)}>
                                        {context.isToggleSidebar ? <MdMenuOpen /> : <MdOutlineMenu />}
                                    </Button>
                                    <SearachBox />
                                </div>      
                        }

                        <div className="col-sm-7 d-flex align-items-center justify-content-end part3 ps-1">
                            <Button className="rounded-circle me-3" onClick={()=>context.setThemeMode(!context.themeMode)}> 
                                <MdOutlineLightMode /> 
                            </Button>
                            
                            <Button className="rounded-circle me-3"> <MdOutlineMailOutline /> </Button>

                            <div className="dropdownWrapper position-relative">
                                <div className="d-flex align-items-center">
                                    <Button className="rounded-circle me-3" onClick={handleOpenNotificationsMyAccDrop}> <FaRegBell /> </Button>

                                    <Button 
                                        className="rounded-circle me-3 menu-2" 
                                        onClick={context.toggleNav}
                                        >
                                        <IoMenu />
                                    </Button>
                                </div>
                                <Menu
                                    anchorEl={isOpenNotificationDrop}
                                    className='notifications dropdown_list'
                                    id="notifications"
                                    open={openNotifications}
                                    onClose={handleCloseNotificationsMyAccDrop}
                                    onClick={handleCloseNotificationsMyAccDrop}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: 'hidden', // Empêche le menu de s'étendre en dehors
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <div className="head ps-3 pb-0">
                                        <h4>Orders (12)</h4>
                                    </div>

                                    <Divider className='mb-1' />

                                    <div className="ps-2 py-2 p-2 pt-3 mb-0 w-100">
                                        <Button className='btn btn-primary w-100'>Voir toutes les notifications</Button>
                                    </div>
                                </Menu>

                            </div>


                            {
                                context.isLogin !== true ? <Link to={'/login'}><Button className="btn-blue btn-lg btn-round">Sign In</Button></Link> 
                                : 
                                <div className="myAccWrapper">
                                    <Button className="myAcc d-flex align-items-center" onClick={handleOpenMyAccDrop} >
                                        
                                        {/* Avatar */}
                                        <UserAvatarImg img={Profil} />

                                        <div className="userInfo res-hide">
                                            <h4>Walle Fred</h4>
                                            <p className='mb-0'>Administrateur</p>
                                        </div>
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={openMyAcc}
                                        onClose={handleCloseMyAccDrop}
                                        onClick={handleCloseMyAccDrop}
                                        slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            },
                                        },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                        <ListItemIcon>
                                            <FaUser />
                                        </ListItemIcon>
                                        Mon compte
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                        <ListItemIcon>
                                            <IoShieldHalfSharp />
                                        </ListItemIcon>
                                        Réinitialiser le mot de passe
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Se déconnecter
                                        </MenuItem>
                                    </Menu>
                                </div>
                            }                            


                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
