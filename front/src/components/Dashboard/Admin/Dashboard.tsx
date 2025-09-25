import '../../Dashboard/Admin/Dashboard.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardBoxProjet from '../../../pages/Admin/Dashboard/Componets/DashboardBoxProjet';
import DashboardBoxAlerts from '../../../pages/Admin/Dashboard/Componets/DashboardBoxAlerts';
import DashboardBoxBudget from '../../../pages/Admin/Dashboard/Componets/DashboardBoxBudget';
import DashboardBoxUsers from '../../../pages/Admin/Dashboard/Componets/DashboardBoxUsers';

import { LuUsers } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { MdWorkOutline } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import { FaGripVertical } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { CiMoneyBill } from "react-icons/ci";
import { PiWarningCircleLight } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";
import { PiSealWarningLight } from "react-icons/pi";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Chart } from "react-google-charts";

// Import Chart.js pour le graphique de progression
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Footer from '../../Footer/Footer';
import ScrollToTop from '../../Helper/ScrollToTop';

// Enregistrer les composants de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Chart data pour Google Charts
export const dataChart = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

export const dataGeo = [
    ["Country", "Popularity"],
    ["Madagascar", 100],
];

const chartOptions = {
    backgroundColor: 'transparent',
    colorAxis: { colors: ['#FFFF00', '#FFD700'] },
};

export const options = {
  'backgroundColor': 'transparent',
  'chartArea': {'width': '100%', 'height': '100%'},
};
interface Activity {
  id: number;
  project: {
    name: string;
    type: string;
    image: string;
  };
  activity: {
    title: string;
    phase: string;
  };
  user: {
    name: string;
    avatar: string;
  };
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  priority: 'low' | 'medium' | 'high';
}

// Données pour le graphique de progression
const progressChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: "Taux d'avancement",
      data: [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
      backgroundColor: 'rgba(167, 119, 227, 0.1)',
      borderColor: 'rgba(167, 119, 227, 1)',
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'rgba(167, 119, 227, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
    },
  ],
};

const progressChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleColor: '#fff',
      bodyColor: '#fff',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        color: '#6B7280',
      },
      grid: {
        color: 'rgba(107, 114, 128, 0.1)',
      },
    },
    x: {
      ticks: {
        color: '#6B7280',
      },
      grid: {
        color: 'rgba(107, 114, 128, 0.1)',
      },
    },
  },
};

const Dashboard: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
      setAnchorEl(null);
  };

  // États pour les activités
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      project: {
        name: "Site Web ABC",
        type: "Développement",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=40&h=40&fit=crop&crop=center"
      },
      activity: {
        title: "Tâche terminée: Page d'accueil",
        phase: "Phase 2"
      },
      user: {
        name: "Jean Dupont",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      },
      date: "Il y a 10 min",
      status: "completed",
      priority: "high"
    },
    {
      id: 2,
      project: {
        name: "App Mobile XYZ",
        type: "Design",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=40&h=40&fit=crop&crop=center"
      },
      activity: {
        title: "Validation des maquettes",
        phase: "Phase 1"
      },
      user: {
        name: "Marie Martin",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
      },
      date: "Il y a 1 heure",
      status: "in-progress",
      priority: "medium"
    },
    {
      id: 3,
      project: {
        name: "Système ERP",
        type: "Intégration",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=40&h=40&fit=crop&crop=center"
      },
      activity: {
        title: "Bug corrigé: Module RH",
        phase: "Phase 3"
      },
      user: {
        name: "Pierre Lambert",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
      },
      date: "Il y a 3 heures",
      status: "completed",
      priority: "low"
    },
    {
      id: 4,
      project: {
        name: "Campagne Marketing",
        type: "Marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=40&h=40&fit=crop&crop=center"
      },
      activity: {
        title: "Analyse des performances",
        phase: "Phase 4"
      },
      user: {
        name: "Sophie Bernard",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
      },
      date: "Il y a 5 heures",
      status: "in-progress",
      priority: "high"
    },
    {
      id: 5,
      project: {
        name: "Base de Données",
        type: "Infrastructure",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=40&h=40&fit=crop&crop=center"
      },
      activity: {
        title: "Migration des données",
        phase: "Phase 2"
      },
      user: {
        name: "Thomas Moreau",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
      },
      date: "Il y a 1 jour",
      status: "pending",
      priority: "medium"
    },
    {
      id: 6,
      project: {
        name: "API Restful",
        type: "Développement",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=40&h=40&fit=crop&crop=center"
      },
      activity: {
        title: "Documentation technique",
        phase: "Phase 1"
      },
      user: {
        name: "Lucie Petit",
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=32&h=32&fit=crop&crop=face"
      },
      date: "Il y a 2 jours",
      status: "completed",
      priority: "low"
    },
    {
      id: 7,
      project: {
        name: "Interface Admin",
        type: "Design",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=40&h=40&fit=crop&crop=center"
      },
      activity: {
        title: "Tests utilisateurs",
        phase: "Phase 3"
      },
      user: {
        name: "David Leroy",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=32&h=32&fit=crop&crop=face"
      },
      date: "Il y a 3 jours",
      status: "in-progress",
      priority: "high"
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);

  // Filtrer les activités basées sur la recherche
  const filteredActivities = activities.filter(activity =>
    activity.project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentActivities = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  // Drag and Drop functions
  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    
    if (draggedItemId === null || draggedItemId === targetId) return;

    const draggedIndex = activities.findIndex(a => a.id === draggedItemId);
    const targetIndex = activities.findIndex(a => a.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newActivities = [...activities];
    const [movedItem] = newActivities.splice(draggedIndex, 1);
    newActivities.splice(targetIndex, 0, movedItem);

    setActivities(newActivities);
    setDraggedItemId(null);
  };

  return (
    <>
      <div className="right-content w-100">
        {/* Box */}
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBoxProjet color={["#1da256","#48d483"]} icon={<MdWorkOutline />} grow={true} />
              <DashboardBoxAlerts color={["#c012e2","#eb64fe"]} icon={<IoWarningOutline />} />
              <DashboardBoxBudget color={["#2c78e5","#60aff5"]} icon={<CiMoneyBill />} />
              <DashboardBoxUsers color={["#e1950e","#f3cd29"]} icon={<LuUsers />} />
            </div>
          </div>

          <div className="col-md-4 ps-0 topPart2">
            <div className="box graphBox">
                <div className="d-flex align-items-center w-100 bottomEle">
                    <h6 className="text-white mb-0 mt-0">Géolocalisation</h6>
                    <div className="ms-auto">
                        <Button className="ms-auto toggleIcon" onClick={handleClick}><HiDotsVertical /></Button>
                        <Menu
                            className='boxdown_menu'
                            MenuListProps={{
                            'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            slotProps={{
                            paper: {
                                style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                                },
                            },
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <IoIosTimer /> Dernier Jour
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <IoIosTimer /> Dernière Semaine
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <IoIosTimer /> Dernier Mois
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <IoIosTimer /> Dernière Année
                            </MenuItem>
                        </Menu>
                    </div>
                </div>

                <div className="text-white fw-bold">
                    <Chart
                        chartType="GeoChart"
                        width="100%"
                        height="100%"
                        data={dataGeo}
                        options={chartOptions}
                    />
                </div>
            </div>
          </div>
        </div>

        {/* Charts and Alerts - Version React */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-4">
          {/* Progress Chart */}
          <div className="p-6 bg-white rounded-xl shadow-soft">
              <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray dark">Taux d'Avancement</h2>
                  <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">+12%</span>
                      <span className="text-sm text-gray-500">vs mois dernier</span>
                  </div>
              </div>
              <div className="h-64">
                  <Line data={progressChartData} options={progressChartOptions} />
              </div>
          </div>

          {/* Recent Alerts */}
          <div className="p-6 bg-white rounded-xl shadow-soft">
              <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-gray dark">Alertes Récentes</h2>
                  <button className="text-sm font-medium text-purple-600 hover:text-purple-700">Voir tout</button>
              </div>
              <div className="space-y-4">
                  <div className="bg-dark-1 flex items-start p-3 border border-red-100 rounded-lg bg-red-50">
                      <div className="flex-shrink-0 mt-1">
                        <PiWarningCircleLight />
                      </div>
                      <div className="ml-3">
                          <p className="text-sm font-medium text-red-800">Retard critique sur Projet X</p>
                          <p className="text-xs text-red-600">Délai dépassé de 7 jours</p>
                          <p className="mt-1 text-xs text-gray-500">Il y a 2 heures</p>
                      </div>
                  </div>
                  <div className="flex bg-dark-2 items-start p-3 border border-yellow-100 rounded-lg bg-yellow-50">
                      <div className="flex-shrink-0 mt-1">
                        <IoWarningOutline />
                      </div>
                      <div className="ml-3">
                          <p className="text-sm font-medium text-yellow-800">Dépassement budgétaire</p>
                          <p className="text-xs text-yellow-600">Projet Y: +15% du budget</p>
                          <p className="mt-1 text-xs text-gray-500">Il y a 5 heures</p>
                      </div>
                  </div>
                  <div className="flex bg-dark-3 items-start p-3 border border-blue-100 rounded-lg bg-blue-50">
                      <div className="flex-shrink-0 mt-1">
                        <PiSealWarningLight />
                      </div>
                      <div className="ml-3">
                          <p className="text-sm font-medium text-blue-800">Nouvelle demande client</p>
                          <p className="text-xs text-blue-600">Client ABC: Modification majeure</p>
                          <p className="mt-1 text-xs text-gray-500">Aujourd'hui, 09:24</p>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        {/* Card pour les Activités */}
        <div className="card-bg card shadow border-0 p-4 mt-4 activities-card">
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6'>
                <h3 className="text-xl font-bold text-color mb-2 sm:mb-0">Activité Récente</h3>
                <Link to="">
                    <Button className='bg-btn btn-purple btn-lg shadow-sm hover:shadow-md transition-shadow'>
                        + Ajouter une activité
                    </Button>
                </Link>
            </div>

            {/* Table */}
            {/* En-tête du tableau avec statistiques - Version Ultra Responsive */}
              <div className="tete1 bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <MdWorkOutline className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">Activités Récentes</h3>
                      <p className="text-purple-100 text-xs sm:text-sm">
                        {filteredActivities.length} activité(s) trouvée(s)
                      </p>
                    </div>
                  </div>
                  
                  {/* Statistiques responsive */}
                  <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:space-x-4">
                    <div className="text-center p-2 sm:p-0 bg-white/10 rounded-lg sm:bg-transparent">
                      <div className="text-white text-xs sm:text-sm font-medium">Terminé</div>
                      <div className="text-green-300 font-bold text-sm sm:text-base">
                        {activities.filter(a => a.status === 'completed').length}
                      </div>
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-white/20"></div>
                    <div className="text-center p-2 sm:p-0 bg-white/10 rounded-lg sm:bg-transparent">
                      <div className="text-white text-xs sm:text-sm font-medium">En cours</div>
                      <div className="text-blue-300 font-bold text-sm sm:text-base">
                        {activities.filter(a => a.status === 'in-progress').length}
                      </div>
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-white/20"></div>
                    <div className="text-center p-2 sm:p-0 bg-white/10 rounded-lg sm:bg-transparent">
                      <div className="text-white text-xs sm:text-sm font-medium">En attente</div>
                      <div className="text-yellow-300 font-bold text-sm sm:text-base">
                        {activities.filter(a => a.status === 'pending').length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barre de contrôle avancée */}
              <div className="tete2 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4">
                <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
                  {/* Recherche avancée */}
                  <div className="flex-1 w-full">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IoSearchOutline className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        className="block w-full pl-10 pr-20 sm:pr-24 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl leading-5 bg-input backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 shadow-sm text-sm sm:text-base"
                        placeholder="Rechercher..."
                        aria-label="Rechercher une activité"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                      {searchTerm && (
                        <button 
                          className="absolute inset-y-0 right-12 sm:right-20 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                          onClick={() => setSearchTerm('')}
                        >
                          <CiCircleRemove className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      )}
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <span className="text-xs text-gray-500 bg-resultat px-2 py-1 rounded-md mr-2 hidden sm:block">
                          {filteredActivities.length} résultat(s)
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              
              <div className="container-tbl">
                <div className="overflow-x-auto">               
                  {/* Tableau responsive ultra-moderne - Version Ultra Responsive */}
                  <div className="relative">
                    {/* Version Desktop (LG+) */}
                    <div className="hidden lg:block">
                      <table className="w-full">
                        <thead className='bg-theader'>
                          <tr className="from-gray-50 to-gray-100/80 border-gray-200">
                            <th className="w-12 px-4 sm:px-6 py-3 text-left">
                              <div className="flex items-center justify-center">
                                <FaGripVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                              </div>
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left">
                              <div className="flex items-center space-x-1 sm:space-x-2 group cursor-pointer">
                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Projet</span>
                              </div>
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left">
                              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Activité</span>
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left">
                              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Utilisateur</span>
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left">
                              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</span>
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left">
                              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</span>
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left">
                              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Priorité</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {currentActivities.length > 0 ? (
                            currentActivities.map((activity) => (
                              <tr 
                                key={activity.id}
                                className="bgLigne group hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 transition-all duration-200 transform hover:scale-[1.002]"
                                draggable
                                onDragStart={(e) => handleDragStart(e, activity.id)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, activity.id)}
                              >
                                <td className="px-4 sm:px-6 py-3">
                                  <div className="flex justify-center">
                                    <div className="drag-handle cursor-grab active:cursor-grabbing p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                      <FaGripVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                                    </div>
                                  </div>
                                </td>
                                
                                <td className="px-4 sm:px-6 py-3">
                                  <div className="flex items-center space-x-2 sm:space-x-4">
                                    <div className="relative">
                                      <img 
                                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl object-cover shadow-lg ring-1 sm:ring-2 ring-white ring-offset-1 sm:ring-offset-2"
                                        src={activity.project.image} 
                                        alt={activity.project.name}
                                        onError={(e) => {
                                          e.currentTarget.src = `https://via.placeholder.com/32x32/6366f1/ffffff?text=${activity.project.name.charAt(0)}`;
                                        }}
                                      />
                                      <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-1 sm:border-2 border-white flex items-center justify-center">
                                        <MdWorkOutline className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                      </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="description-cell1 font-semibold text-gray-900 truncate text-sm sm:text-base group-hover:text-purple-600 transition-colors">
                                        {activity.project.name}
                                      </p>
                                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                                        {activity.project.type}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                
                                <td className="px-4 sm:px-6 py-3">
                                  <div>
                                    <p className="description-cell1 font-medium text-gray-900 text-sm sm:text-base group-hover:text-gray-700 transition-colors">
                                      {activity.activity.title}
                                    </p>
                                    <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                                      <span className="color inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {activity.activity.phase}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                
                                <td className="px-4 sm:px-6 py-3">
                                  <div className="flex items-center space-x-2 sm:space-x-3">
                                    <div className="img-user relative">
                                      <img 
                                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover shadow-md ring-1 sm:ring-2"
                                        src={activity.user.avatar} 
                                        alt={activity.user.name}
                                        onError={(e) => {
                                          e.currentTarget.src = `https://via.placeholder.com/32x32/6366f1/ffffff?text=${activity.user.name.charAt(0)}`;
                                        }}
                                      />
                                    </div>
                                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                                      {activity.user.name}
                                    </span>
                                  </div>
                                </td>
                                
                                <td className="px-4 sm:px-6 py-3">
                                  <div className="flex flex-col space-y-0.5 sm:space-y-1">
                                    <span className="text-xs sm:text-sm font-medium text-gray-900">
                                      {activity.date}
                                    </span>
                                  </div>
                                </td>
                                
                                <td className="description-cell1 px-4 sm:px-6 py-3">
                                  <span className={`inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold ${
                                    activity.status === 'completed' ? 'bg-green-100' :
                                    activity.status === 'in-progress' ? 'bg-blue-100' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {activity.status === 'completed' ? '✅' :
                                    activity.status === 'in-progress' ? '🔄' : '⏳'}
                                    <span className="hidden sm:inline ml-1 color">
                                      {activity.status === 'completed' ? 'Terminé' :
                                      activity.status === 'in-progress' ? 'En cours' : 'En attente'}
                                    </span>
                                  </span>
                                </td>
                                
                                <td className="px-4 sm:px-6 py-3">
                                  <span className={`inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold ${
                                    activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                                    activity.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {activity.priority === 'high' ? '🔥' :
                                    activity.priority === 'medium' ? '⚡' : '💧'}
                                    <span className="hidden sm:inline ml-1 color">
                                      {activity.priority === 'high' ? 'Élevée' :
                                      activity.priority === 'medium' ? 'Moyenne' : 'Basse'}
                                    </span>
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={8} className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                                <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
                                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                                    <IoSearchOutline className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                                  </div>
                                  <div className="text-center">
                                    <p className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Aucune activité trouvée</p>
                                    <p className="text-gray-500 text-xs sm:text-sm max-w-md">
                                      Aucune activité ne correspond à vos critères de recherche.
                                    </p>
                                  </div>
                                  <button 
                                    onClick={() => setSearchTerm('')}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-xs sm:text-sm hover:shadow-lg transition-all duration-200"
                                  >
                                    Réinitialiser la recherche
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Version Tablette (MD-LG) */}
                    <div className="hidden md:block lg:hidden">
                      <div className="space-y-2 p-3 sm:p-4">
                        {currentActivities.length > 0 ? (
                          currentActivities.map((activity) => (
                            <div 
                              key={activity.id}
                              className="bgLigne rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-3 sm:p-4 group grid grid-cols-2 gap-3"
                              draggable
                              onDragStart={(e) => handleDragStart(e, activity.id)}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, activity.id)}
                            >
                              {/* Colonne 1: Projet et Utilisateur */}
                              <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                  <div className="drag-handle cursor-grab active:cursor-grabbing p-1">
                                    <FaGripVertical className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                  </div>
                                  <img 
                                    className="w-10 h-10 rounded-lg object-cover"
                                    src={activity.project.image} 
                                    alt={activity.project.name}
                                  />
                                  <div>
                                    <p className="font-semibold text-gray-900 text-sm">{activity.project.name}</p>
                                    <p className="text-xs text-gray-500">{activity.project.type}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2 pl-7">
                                  <img 
                                    className="w-6 h-6 rounded-full object-cover"
                                    src={activity.user.avatar} 
                                    alt={activity.user.name}
                                  />
                                  <span className="text-sm font-medium text-gray-900">{activity.user.name}</span>
                                </div>
                              </div>

                              {/* Colonne 2: Détails et Actions */}
                              <div className="space-y-3">
                                <div>
                                  <p className="font-medium text-gray-900 text-sm mb-1">{activity.activity.title}</p>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                      {activity.activity.phase}
                                    </span>
                                    <span className="text-xs text-gray-500">{activity.date}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex space-x-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                      activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                                      activity.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                      'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {activity.status === 'completed' ? '✅ Terminé' :
                                      activity.status === 'in-progress' ? '🔄 En cours' : '⏳ En attente'}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                      activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                                      activity.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                                      'bg-green-100 text-green-800'
                                    }`}>
                                      {activity.priority === 'high' ? '🔥' :
                                      activity.priority === 'medium' ? '⚡' : '💧'}
                                    </span>
                                  </div>
                                  
                                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 text-gray-400 hover:text-purple-600">
                                      <FaRegEdit className="w-3 h-3" />
                                    </button>
                                    <button className="p-1 text-gray-400 hover:text-red-600">
                                      <CiCircleRemove className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <IoSearchOutline className="w-6 h-6 text-purple-400" />
                            </div>
                            <p className="font-semibold text-gray-900 text-sm mb-1">Aucune activité trouvée</p>
                            <button 
                              onClick={() => setSearchTerm('')}
                              className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg text-xs"
                            >
                              Réinitialiser
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Version Mobile (XS-MD) */}
                    <div className="md:hidden">
                      <div className="space-y-2 p-2">
                        {currentActivities.length > 0 ? (
                          currentActivities.map((activity) => (
                            <div 
                              key={activity.id}
                              className="bgLigne rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-3 group"
                              draggable
                              onDragStart={(e) => handleDragStart(e, activity.id)}
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, activity.id)}
                            >
                              {/* En-tête Mobile */}
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <div className="drag-handle cursor-grab active:cursor-grabbing p-1">
                                    <FaGripVertical className="w-3 h-3 text-gray-400" />
                                  </div>
                                  <img 
                                    className="w-8 h-8 rounded-lg object-cover"
                                    src={activity.project.image} 
                                    alt={activity.project.name}
                                  />
                                  <div>
                                    <p className="font-semibold text-gray-900 text-sm">{activity.project.name}</p>
                                    <p className="text-xs text-gray-500">{activity.project.type}</p>
                                  </div>
                                </div>
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="p-1 text-gray-400 hover:text-purple-600">
                        <FaRegEdit className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Contenu Mobile */}
                  <div className="space-y-2 pl-7">
                    <div>
                      <p className="font-medium text-gray-900 text-xs mb-1">{activity.activity.title}</p>
                      <div className="mb-4 flex items-center space-x-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                          {activity.activity.phase}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img 
                          className="w-5 h-5 rounded-full object-cover"
                          src={activity.user.avatar} 
                          alt={activity.user.name}
                        />
                        <span className="text-xs font-medium text-gray-900">{activity.user.name}</span>
                      </div>
                      
                      <div className="flex space-x-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {activity.status === 'completed' ? '✅' :
                          activity.status === 'in-progress' ? '🔄' : '⏳'}
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                          activity.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {activity.priority === 'high' ? '🔥' :
                          activity.priority === 'medium' ? '⚡' : '💧'}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{activity.date}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <IoSearchOutline className="w-5 h-5 text-purple-400" />
                </div>
                <p className="font-semibold text-gray-900 text-xs mb-1">Aucune activité trouvée</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded text-xs"
                >
                  Réinitialiser
                </button>
              </div>
            )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
                {/* Pagination Ultra-Moderne et Hyper-Responsive */}
                <div className="footer-table bg-footer-tbl from-gray-50/80 to-gray-100/30 backdrop-blur-sm border-t border-gray-200/60 px-3 sm:px-6 py-4">
                  <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
                    
                    {/* Informations de pagination - Version améliorée */}
                    <div className="text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start space-x-2">
                        <div className="bg-white/60 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-gray-200/50">
                          <span className="text-xs sm:text-sm text-gray-600">
                            Affichage de{" "}
                            <span className="font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md">
                              {filteredActivities.length > 0 ? indexOfFirstItem + 1 : 0}
                            </span>{" "}
                            à{" "}
                            <span className="font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md">
                              {Math.min(indexOfLastItem, filteredActivities.length)}
                            </span>{" "}
                            sur{" "}
                            <span className="font-bold text-gray-800 bg-gray-100 px-1.5 py-0.5 rounded-md">
                              {filteredActivities.length}
                            </span>{" "}
                            activité(s)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contrôles de pagination - Version ultra-moderne */}
                    {totalPages > 1 && (
                      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
                        
                        

                        {/* Pagination principale */}
                        <div className="flex items-center space-x-1 bg-white/60 backdrop-blur-sm rounded-xl p-1 shadow-sm border border-gray-200/50">
                          
                          {/* Bouton Précédent */}
                          <button 
                            onClick={() => {
                              setCurrentPage(prev => Math.max(prev - 1, 1));
                              // Animation de feedback
                              const btn = document.querySelector('.pagination-prev');
                              if (btn) {
                                btn.classList.add('scale-95');
                                setTimeout(() => btn.classList.remove('scale-95'), 150);
                              }
                            }}
                            disabled={currentPage === 1}
                            className="pagination-prev p-2 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50 hover:text-purple-600 active:scale-95 group"
                            aria-label="Page précédente"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="sr-only">Précédent</span>
                          </button>

                          {/* Indicateur de page pour mobile */}
                          <div className="lg:hidden px-3 py-1">
                            <span className="text-sm font-semibold text-purple-600">
                              {currentPage}/{totalPages}
                            </span>
                          </div>

                          {/* Pages numérotées - Version desktop améliorée */}
                          <div className="hidden lg:flex items-center space-x-1 mx-2">
                            {[...Array(totalPages)].map((_, index) => {
                              const page = index + 1;
                              const isCurrent = page === currentPage;
                              const showPage = 
                                page === 1 || 
                                page === totalPages || 
                                Math.abs(page - currentPage) <= 1 ||
                                (page <= 3 && currentPage <= 3) ||
                                (page >= totalPages - 2 && currentPage >= totalPages - 2);

                              if (!showPage) {
                                if (page === currentPage - 2 || page === currentPage + 2) {
                                  return (
                                    <span key={page} className="px-2 py-1 text-xs text-gray-400 select-none">
                                      •••
                                    </span>
                                  );
                                }
                                return null;
                              }

                              return (
                                <button
                                  key={page}
                                  onClick={() => {
                                    setCurrentPage(page);
                                    // Animation de feedback
                                    const btn = document.querySelector(`[data-page="${page}"]`);
                                    if (btn) {
                                      btn.classList.add('scale-110');
                                      setTimeout(() => btn.classList.remove('scale-110'), 150);
                                    }
                                  }}
                                  data-page={page}
                                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                                    isCurrent 
                                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25' 
                                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                                  }`}
                                  aria-current={isCurrent ? 'page' : undefined}
                                  aria-label={`Page ${page}`}
                                >
                                  {page}
                                  {isCurrent && (
                                    <span className=""></span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Bouton Suivant */}
                          <button 
                            onClick={() => {
                              setCurrentPage(prev => Math.min(prev + 1, totalPages));
                              // Animation de feedback
                              const btn = document.querySelector('.pagination-next');
                              if (btn) {
                                btn.classList.add('scale-95');
                                setTimeout(() => btn.classList.remove('scale-95'), 150);
                              }
                            }}
                            disabled={currentPage === totalPages}
                            className="pagination-next p-2 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-50 hover:text-purple-600 active:scale-95 group"
                            aria-label="Page suivante"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="sr-only">Suivant</span>
                          </button>
                        </div>

                        {/* Sélecteur de page rapide pour mobile */}
                        <div className="lg:hidden">
                          <div className="relative">
                            <select 
                              value={currentPage}
                              onChange={(e) => setCurrentPage(Number(e.target.value))}
                              className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl pl-3 pr-8 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 shadow-sm"
                            >
                              {[...Array(totalPages)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                  Page {index + 1}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Contrôles rapides pour grand écran */}
                        <div className="hidden xl:flex items-center space-x-2">
                          <span className="text-xs text-gray-500 font-medium">Aller à:</span>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => setCurrentPage(1)}
                              disabled={currentPage === 1}
                              className="bg-resultat px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-30"
                            >
                              Première
                            </button>
                            <button
                              onClick={() => setCurrentPage(totalPages)}
                              disabled={currentPage === totalPages}
                              className="bg-resultat px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-30"
                            >
                              Dernière
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Barre de progression visuelle */}
                  {totalPages > 1 && (
                    <div className="mt-3 lg:mt-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 font-medium">Progression:</span>
                        <div className="flex-1 bg-gray-300 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${(currentPage / totalPages) * 100}%` }}
                          ></div>
                        </div>
                        <span className="color-pour-cent text-xs font-semibold text-gray-700 min-w-[40px]">
                          {Math.round((currentPage / totalPages) * 100)}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            <ScrollToTop />

            <div>
              <Footer />
            </div>
      </div>
    </>
  )
}

export default Dashboard;