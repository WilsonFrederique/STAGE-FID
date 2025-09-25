import { useState, MouseEvent } from 'react'
import Button from '@mui/material/Button';
import { MdWorkOutline } from "react-icons/md";

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
      <Button 
        className="dashboardBox" 
        style={{
          backgroundImage: `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`
        }}
      >
        <span className="chart">
          <MdWorkOutline />
        </span>

        <div className="d-flex w-100">
          <div className="col1 mb-0">
            <h4 className='text-white'>Projets Totaux</h4>
            <span className='text-white'>42</span>
          </div>

          <div className="ms-auto">
            <div className="icon">
              {props.icon}
            </div>
          </div>
        </div>

        <div className="align-items-center w-100 bottomEle">
          <div className="flex items-center justify-between text-gray-100">
              <span>En cours: 24</span>
              <span>Terminés: 12</span>
              <span>En attente: 6</span>
          </div>
      </div>
      </Button>
    </>
  )
}

export default DashboardBox