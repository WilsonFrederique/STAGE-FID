import React, { useState } from 'react';
import './BudgetVS.css';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiPieChart, FiDownload, FiCalendar, FiUser, FiBarChart2 } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import ScrollToTop from '../../../components/Helper/ScrollToTop';
import Footer from '../../../components/Footer/Footer';
import { Chip, emphasize, styled } from '@mui/material';

// Définir StyledBreadcrumb comme dans votre premier composant
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
}) as typeof Chip;

// Types TypeScript
interface BudgetData {
    name: string;
    budget: number;
    dépenses: number;
}

interface PieData {
    name: string;
    value: number;
    color: string;
}

interface Metric {
    title: string;
    value: string;
    trend: string;
    positive: boolean;
    icon: React.ReactElement;
    color: string;
}

interface Project {
    projet: string;
    budget: number;
    dépenses: number;
    statut: 'respecté' | 'dépassé';
}

interface ProjectCategory {
    nom: string;
    budget: number;
    depense: number;
}

interface ProjectDetails {
    description: string;
    chefProjet: string;
    dateDebut: string;
    dateFin: string;
    progression: number;
    budgetInitial: number;
    depensesActuelles: number;
    economie: number;
    categories: ProjectCategory[];
}

interface ProjectDetailsMap {
    [key: string]: ProjectDetails;
}

// Données mock pour les graphiques
const budgetData: BudgetData[] = [
    { name: 'Jan', budget: 40000, dépenses: 32000 },
    { name: 'Fév', budget: 45000, dépenses: 38000 },
    { name: 'Mar', budget: 50000, dépenses: 42000 },
    { name: 'Avr', budget: 48000, dépenses: 45000 },
    { name: 'Mai', budget: 52000, dépenses: 48000 },
    { name: 'Jun', budget: 55000, dépenses: 52000 },
];

const pieData: PieData[] = [
    { name: 'Développement', value: 35, color: '#0858f7' },
    { name: 'Marketing', value: 25, color: '#00c49f' },
    { name: 'Infrastructure', value: 20, color: '#ffbb28' },
    { name: 'Formation', value: 15, color: '#ff8042' },
    { name: 'Autres', value: 5, color: '#8884d8' }
];

// Données pour le modal
const projectDetails: ProjectDetailsMap = {
    "Site E-commerce": {
        description: "Développement d'une plateforme e-commerce complète avec système de paiement intégré",
        chefProjet: "Marie Dubois",
        dateDebut: "15/01/2024",
        dateFin: "15/06/2024",
        progression: 85,
        budgetInitial: 25000,
        depensesActuelles: 22000,
        economie: 3000,
        categories: [
            { nom: "Développement", budget: 15000, depense: 13000 },
            { nom: "Design", budget: 5000, depense: 4500 },
            { nom: "Marketing", budget: 5000, depense: 4500 }
        ]
    },
    "Application Mobile": {
        description: "Application mobile cross-platform pour iOS et Android",
        chefProjet: "Jean Martin",
        dateDebut: "01/02/2024",
        dateFin: "01/08/2024",
        progression: 60,
        budgetInitial: 45000,
        depensesActuelles: 48000,
        economie: -3000,
        categories: [
            { nom: "Développement", budget: 30000, depense: 32000 },
            { nom: "Design", budget: 8000, depense: 9000 },
            { nom: "Tests", budget: 7000, depense: 7000 }
        ]
    },
    "Refonte CRM": {
        description: "Refonte complète du système de gestion de la relation client",
        chefProjet: "Pierre Lambert",
        dateDebut: "01/03/2024",
        dateFin: "01/09/2024",
        progression: 45,
        budgetInitial: 30000,
        depensesActuelles: 28000,
        economie: 2000,
        categories: [
            { nom: "Développement", budget: 20000, depense: 18000 },
            { nom: "Formation", budget: 5000, depense: 5000 },
            { nom: "Migration", budget: 5000, depense: 5000 }
        ]
    },
    "Migration Cloud": {
        description: "Migration des infrastructures vers le cloud Azure",
        chefProjet: "Sophie Moreau",
        dateDebut: "15/02/2024",
        dateFin: "15/07/2024",
        progression: 70,
        budgetInitial: 35000,
        depensesActuelles: 37000,
        economie: -2000,
        categories: [
            { nom: "Infrastructure", budget: 25000, depense: 27000 },
            { nom: "Sécurité", budget: 7000, depense: 7000 },
            { nom: "Formation", budget: 3000, depense: 3000 }
        ]
    },
    "Formation Équipe": {
        description: "Programme de formation continue pour l'équipe de développement",
        chefProjet: "Thomas Bernard",
        dateDebut: "01/01/2024",
        dateFin: "31/12/2024",
        progression: 75,
        budgetInitial: 15000,
        depensesActuelles: 12000,
        economie: 3000,
        categories: [
            { nom: "Formations", budget: 10000, depense: 8000 },
            { nom: "Matériel", budget: 3000, depense: 2500 },
            { nom: "Certifications", budget: 2000, depense: 1500 }
        ]
    }
};

// Props pour le composant Modal
interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

// Composant Modal
const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    if (!project) return null;

    const details = projectDetails[project.projet];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{project.projet} - Détails</h2>
                    <button className="modal-close" onClick={onClose}>
                        <IoClose />
                    </button>
                </div>
                
                <div className="modal-body">
                    <div className="modal-grid">
                        {/* Informations générales */}
                        <div className="modal-section">
                            <h3 className="section-title">
                                <FiUser className="section-icon" />
                                Informations Générales
                            </h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Description</span>
                                    <span className="info-value">{details?.description || "Non spécifié"}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Chef de Projet</span>
                                    <span className="info-value">{details?.chefProjet || "Non assigné"}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Période</span>
                                    <span className="info-value">
                                        {details?.dateDebut || "N/A"} - {details?.dateFin || "N/A"}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Progression</span>
                                    <div className="progress-container">
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill" 
                                                style={{ width: `${details?.progression || 0}%` }}
                                            ></div>
                                        </div>
                                        <span className="progress-text">{details?.progression || 0}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Métriques financières */}
                        <div className="modal-section">
                            <h3 className="section-title">
                                <FiDollarSign className="section-icon" />
                                Métriques Financières
                            </h3>
                            <div className="metrics-grid-modal">
                                <div className="metric-modal">
                                    <span className="metric-label">Budget Initial</span>
                                    <span className="metric-value">{project.budget.toLocaleString()} €</span>
                                </div>
                                <div className="metric-modal">
                                    <span className="metric-label">Dépenses Actuelles</span>
                                    <span className="metric-value">{project.dépenses.toLocaleString()} €</span>
                                </div>
                                <div className="metric-modal">
                                    <span className="metric-label">Écart</span>
                                    <span className={`metric-value ${project.dépenses > project.budget ? 'negative' : 'positive'}`}>
                                        {(project.dépenses - project.budget).toLocaleString()} €
                                    </span>
                                </div>
                                <div className="metric-modal">
                                    <span className="metric-label">Taux d'Utilisation</span>
                                    <span className="metric-value">
                                        {((project.dépenses / project.budget) * 100).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Graphique des dépenses par catégorie */}
                        <div className="modal-section full-width">
                            <h3 className="section-title">
                                <FiBarChart2 className="section-icon" />
                                Répartition des Dépenses par Catégorie
                            </h3>
                            <div className="chart-container-modal">
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={details?.categories || []}>
                                        <XAxis dataKey="nom" />
                                        <YAxis />
                                        <Tooltip 
                                            formatter={(value: number) => [`${value} €`, '']}
                                            labelFormatter={(label: string) => `Catégorie: ${label}`}
                                        />
                                        <Legend />
                                        <Bar dataKey="budget" fill="#0858f7" name="Budget" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="depense" fill="#00c49f" name="Dépense" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Évolution mensuelle */}
                        <div className="modal-section full-width">
                            <h3 className="section-title">
                                <FiCalendar className="section-icon" />
                                Évolution Mensuelle
                            </h3>
                            <div className="chart-container-modal">
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={budgetData}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip 
                                            formatter={(value: number) => [`${value} €`, '']}
                                            labelFormatter={(label: string) => `Mois: ${label}`}
                                        />
                                        <Legend />
                                        <Line 
                                            type="monotone" 
                                            dataKey="budget" 
                                            stroke="#0858f7" 
                                            strokeWidth={3} 
                                            dot={{ fill: '#0858f7', strokeWidth: 2, r: 4 }} 
                                            activeDot={{ r: 6, fill: '#0858f7' }}
                                        />
                                        <Line 
                                            type="monotone" 
                                            dataKey="dépenses" 
                                            stroke="#00c49f" 
                                            strokeWidth={3} 
                                            dot={{ fill: '#00c49f', strokeWidth: 2, r: 4 }} 
                                            activeDot={{ r: 6, fill: '#00c49f' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>
                        Fermer
                    </button>
                    <button className="btn-primary">
                        Exporter le Rapport
                    </button>
                </div>
            </div>
        </div>
    );
};

const BudgetVS: React.FC = () => {
    const [timeRange, setTimeRange] = useState<string>('6mois');
    const [activeFilter, setActiveFilter] = useState<string>('tous');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const totalBudget = budgetData.reduce((sum: number, item: BudgetData) => sum + item.budget, 0);
    const totalDépenses = budgetData.reduce((sum: number, item: BudgetData) => sum + item.dépenses, 0);
    const économies = totalBudget - totalDépenses;
    const tauxUtilisation = ((totalDépenses / totalBudget) * 100).toFixed(1);

    const handleProjectView = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const metrics: Metric[] = [
        {
            title: "Budget Total",
            value: `${(totalBudget / 1000).toFixed(0)}K €`,
            trend: "+12%",
            positive: true,
            icon: <FiDollarSign />,
            color: "#0858f7"
        },
        {
            title: "Dépenses Total",
            value: `${(totalDépenses / 1000).toFixed(0)}K €`,
            trend: "+8%",
            positive: true,
            icon: <FiTrendingUp />,
            color: "#00c49f"
        },
        {
            title: "Économies",
            value: `${(économies / 1000).toFixed(0)}K €`,
            trend: "+15%",
            positive: true,
            icon: <FiTrendingDown />,
            color: "#ff6b6b"
        },
        {
            title: "Taux d'Utilisation",
            value: `${tauxUtilisation}%`,
            trend: "-2%",
            positive: false,
            icon: <FiPieChart />,
            color: "#ffbb28"
        }
    ];

    const projects: Project[] = [
        { projet: "Site E-commerce", budget: 25000, dépenses: 22000, statut: "respecté" },
        { projet: "Application Mobile", budget: 45000, dépenses: 48000, statut: "dépassé" },
        { projet: "Refonte CRM", budget: 30000, dépenses: 28000, statut: "respecté" },
        { projet: "Migration Cloud", budget: 35000, dépenses: 37000, statut: "dépassé" },
        { projet: "Formation Équipe", budget: 15000, dépenses: 12000, statut: "respecté" }
    ];

    // Filtrer les projets selon le filtre actif
    const filteredProjects = projects.filter((project: Project) => {
        if (activeFilter === 'tous') return true;
        if (activeFilter === 'dépassé') return project.statut === 'dépassé';
        if (activeFilter === 'respecté') return project.statut === 'respecté';
        return true;
    });

    return (
        <div className="edt-container">
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 header-card">
                    <h5 className="mb-0">Gestion des Projets - Budget VS Réalité</h5>
                    <div className="header-controls">
                        <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumb_">
                            <a href="/">
                                <StyledBreadcrumb
                                    className="StyledBreadcrumb"
                                    component="a"
                                    label="Accueil"
                                    icon={<HomeIcon fontSize="small" />}
                                />
                            </a>
                            <StyledBreadcrumb
                                className="StyledBreadcrumb"
                                label="Projets"
                                icon={<ExpandMoreIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb
                                className="StyledBreadcrumb"
                                label="Budget VS Réalité"
                            />
                        </Breadcrumbs>
                    </div>
                </div>

                {/* Recherche et Filtres */}
                <div className="card shadow border-0 p-3 mt-4">
                    <div className="search-filter-container">
                        <div className="search-container">
                            <form className="search-form">
                                <input 
                                    type="text" 
                                    className="search-input"
                                    placeholder="Rechercher un projet..."
                                    aria-label="Rechercher un projet"
                                />
                                <button className="search-button" type="button" aria-label="Lancer la recherche">
                                    <IoSearchOutline className="search-icon" />
                                </button>
                            </form>
                        </div>
                        
                        <div className="filter-controls">
                            <div className="time-range-selector">
                                <select 
                                    value={timeRange} 
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTimeRange(e.target.value)}
                                    className="time-select"
                                >
                                    <option value="1mois">1 Mois</option>
                                    <option value="3mois">3 Mois</option>
                                    <option value="6mois">6 Mois</option>
                                    <option value="1an">1 An</option>
                                </select>
                            </div>
                            
                            <div className="filter-buttons">
                                <button 
                                    className={`filter-btn ${activeFilter === 'tous' ? 'active' : ''}`}
                                    onClick={() => setActiveFilter('tous')}
                                >
                                    Tous
                                </button>
                                <button 
                                    className={`filter-btn ${activeFilter === 'dépassé' ? 'active' : ''}`}
                                    onClick={() => setActiveFilter('dépassé')}
                                >
                                    Budget Dépassé
                                </button>
                                <button 
                                    className={`filter-btn ${activeFilter === 'respecté' ? 'active' : ''}`}
                                    onClick={() => setActiveFilter('respecté')}
                                >
                                    Budget Respecté
                                </button>
                            </div>
                            
                            <button className="export-btn">
                                <FiDownload className="export-icon" />
                                Exporter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Métriques Rapides */}
                <div className="metrics-grid">
                    {metrics.map((metric: Metric, index: number) => (
                        <div key={index} className="metric-card">
                            <div className="metric-icon" style={{ backgroundColor: `${metric.color}20` }}>
                                {metric.icon}
                            </div>
                            <div className="metric-content">
                                <h3 className="metric-value">{metric.value}</h3>
                                <p className="metric-title">{metric.title}</p>
                            </div>
                            <div className={`metric-trend ${metric.positive ? 'positive' : 'negative'}`}>
                                {metric.trend}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Graphiques */}
                <div className="charts-container">
                    <div className="chart-card main-chart">
                        <div className="chart-header">
                            <h3>Budget vs Dépenses (en €)</h3>
                            <div className="chart-legend">
                                <div className="legend-item">
                                    <div className="legend-color budget"></div>
                                    <span>Budget</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color dépenses"></div>
                                    <span>Dépenses</span>
                                </div>
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={budgetData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip 
                                        formatter={(value: number) => [`${value} €`, '']}
                                        labelFormatter={(label: string) => `Mois: ${label}`}
                                    />
                                    <Legend />
                                    <Bar dataKey="budget" fill="#0858f7" name="Budget" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="dépenses" fill="#00c49f" name="Dépenses" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="chart-card pie-chart">
                        <div className="chart-header">
                            <h3>Répartition du Budget</h3>
                        </div>
                        <div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }: { name: string; percent: number }) => 
                                            `${name} ${(percent * 100).toFixed(0)}%`
                                        }
                                    >
                                        {pieData.map((entry: PieData, index: number) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Tableau des Projets */}
                <div className="card shadow border-0 p-3 mt-4 projects-table">
                    <div className="table-header">
                        <h3>Détail des Projets</h3>
                        <div className="table-summary">
                            {filteredProjects.length} projet(s) trouvé(s)
                        </div>
                    </div>
                    
                    <div className="table-responsive">
                        <table className="budget-table">
                            <thead>
                                <tr>
                                    <th>Projet</th>
                                    <th>Budget Alloué</th>
                                    <th>Dépenses Réelles</th>
                                    <th>Écart</th>
                                    <th>Statut</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((projet: Project, index: number) => (
                                    <tr key={index}>
                                        <td className="project-name">{projet.projet}</td>
                                        <td className="budget-amount">{projet.budget.toLocaleString()} €</td>
                                        <td className="expense-amount">{projet.dépenses.toLocaleString()} €</td>
                                        <td className={`variance ${projet.dépenses > projet.budget ? 'negative' : 'positive'}`}>
                                            {(projet.dépenses - projet.budget).toLocaleString()} €
                                        </td>
                                        <td>
                                            <span className={`status-badge ${projet.statut}`}>
                                                {projet.statut === 'respecté' ? 'Respecté' : 'Dépassé'}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className="action-btn view" 
                                                onClick={() => handleProjectView(projet)}
                                                title="Voir les détails du projet"
                                            >
                                                <FaRegEye />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <ProjectModal project={selectedProject} onClose={closeModal} />
                )}

                <div>
                  <ScrollToTop />
                  <Footer />
                </div>
            </div>
        </div>
    );
};

export default BudgetVS;