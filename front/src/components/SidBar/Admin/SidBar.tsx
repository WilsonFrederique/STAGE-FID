import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaAngleRight } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaSearchDollar } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";

const SidBar = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [isToggleSubmenuProjet, setIsToggleSubmenuProjet] = useState(false);
    const [isToggleSubmenuUsers, setIsToggleSubmenuUsers] = useState(false);
    const [isToggleSubmenuSuivi, setIsToggleSubmenuSuivi] = useState(false);
    const [isToggleSubmenuPrestataires, setIsToggleSubmenuPrestataires] = useState(false);
    const [isToggleSubmenuContratPaiement, setIsToggleSubmenuContratPaiement] = useState(false);
    const [isToggleSubmenuDocumentation, setIsToggleSubmenuDocumentation] = useState(false);
    const [isToggleSubmenuReporting, setIsToggleSubmenuReporting] = useState(false);
    const [isToggleSubmenuAudit, setIsToggleSubmenuAudit] = useState(false);

    // Charger l'état depuis localStorage au montage du composant
    useEffect(() => {
        const savedActiveTab = localStorage.getItem('activeTab');
        const savedToggleSubmenuProjet = localStorage.getItem('isToggleSubmenuProjet');
        const savedToggleSubmenuUsers = localStorage.getItem('isToggleSubmenuUsers');
        const savedToggleSubmenuSuivi = localStorage.getItem('isToggleSubmenuSuivi');
        const savedToggleSubmenuPrestataires = localStorage.getItem('isToggleSubmenuPrestataires');
        const savedToggleSubmenuContratPaiement = localStorage.getItem('isToggleSubmenuContratPaiement');
        const savedToggleSubmenuDocumentation = localStorage.getItem('isToggleSubmenuDocumentation');
        const savedToggleSubmenuReporting = localStorage.getItem('isToggleSubmenuReporting');
        const savedToggleSubmenuAudit = localStorage.getItem('isToggleSubmenuAudit');

        if (savedActiveTab) setActiveTab(parseInt(savedActiveTab));
        if (savedToggleSubmenuProjet) setIsToggleSubmenuProjet(savedToggleSubmenuProjet === 'true');
        if (savedToggleSubmenuUsers) setIsToggleSubmenuUsers(savedToggleSubmenuUsers === 'true');
        if (savedToggleSubmenuSuivi) setIsToggleSubmenuSuivi(savedToggleSubmenuSuivi === 'true');
        if (savedToggleSubmenuPrestataires) setIsToggleSubmenuPrestataires(savedToggleSubmenuPrestataires === 'true');
        if (savedToggleSubmenuContratPaiement) setIsToggleSubmenuContratPaiement(savedToggleSubmenuContratPaiement === 'true');
        if (savedToggleSubmenuDocumentation) setIsToggleSubmenuDocumentation(savedToggleSubmenuDocumentation === 'true');
        if (savedToggleSubmenuReporting) setIsToggleSubmenuReporting(savedToggleSubmenuReporting === 'true');
        if (savedToggleSubmenuAudit) setIsToggleSubmenuAudit(savedToggleSubmenuAudit === 'true');
    }, []);

    const isOpenSubmenu = (index: number) => {
        // Réinitialiser tous les sous-menus
        setIsToggleSubmenuProjet(false);
        setIsToggleSubmenuUsers(false);
        setIsToggleSubmenuSuivi(false);
        setIsToggleSubmenuPrestataires(false);
        setIsToggleSubmenuContratPaiement(false);
        setIsToggleSubmenuDocumentation(false);
        setIsToggleSubmenuReporting(false);
        setIsToggleSubmenuAudit(false);

        // Activer le sous-menu correspondant à l'index
        switch(index) {
            case 1:
                setIsToggleSubmenuProjet(!isToggleSubmenuProjet);
                break;
            case 2:
                setIsToggleSubmenuUsers(!isToggleSubmenuUsers);
                break;
            case 3:
                setIsToggleSubmenuSuivi(!isToggleSubmenuSuivi);
                break;
            case 4:
                setIsToggleSubmenuPrestataires(!isToggleSubmenuPrestataires);
                break;
            case 5:
                setIsToggleSubmenuContratPaiement(!isToggleSubmenuContratPaiement);
                break;
            case 6:
                setIsToggleSubmenuDocumentation(!isToggleSubmenuDocumentation);
                break;
            case 7:
                setIsToggleSubmenuReporting(!isToggleSubmenuReporting);
                break;
            case 8:
                setIsToggleSubmenuAudit(!isToggleSubmenuAudit);
                break;
        }

        // Mettre à jour l'onglet actif
        setActiveTab(index);

        // Sauvegarder dans localStorage
        localStorage.setItem('activeTab', index.toString());
        localStorage.setItem('isToggleSubmenuProjet', (index === 1 ? !isToggleSubmenuProjet : false).toString());
        localStorage.setItem('isToggleSubmenuUsers', (index === 2 ? !isToggleSubmenuUsers : false).toString());
        localStorage.setItem('isToggleSubmenuSuivi', (index === 3 ? !isToggleSubmenuSuivi : false).toString());
        localStorage.setItem('isToggleSubmenuPrestataires', (index === 4 ? !isToggleSubmenuPrestataires : false).toString());
        localStorage.setItem('isToggleSubmenuContratPaiement', (index === 5 ? !isToggleSubmenuContratPaiement : false).toString());
        localStorage.setItem('isToggleSubmenuDocumentation', (index === 6 ? !isToggleSubmenuDocumentation : false).toString());
        localStorage.setItem('isToggleSubmenuReporting', (index === 7 ? !isToggleSubmenuReporting : false).toString());
        localStorage.setItem('isToggleSubmenuAudit', (index === 8 ? !isToggleSubmenuAudit : false).toString());
    } 

    return (
        <>
            <div className="sidebar">
                <div className="sidebar-content">
                    <ul className="list-unstyled">
                        {/* Accueil */}
                        <li>
                            <Link to="">
                                <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} onClick={() => isOpenSubmenu(0)}>
                                    <span className='icon'><MdOutlineDashboard /></span>
                                    Accueil 
                                    <span className='arrow'><FaAngleRight /></span>
                                </Button>
                            </Link>
                        </li>

                        {/* Gestion des Projets */}
                        <li>
                            <Button className={`w-100 ${activeTab === 1 ? 'active' : ''}`} onClick={() => isOpenSubmenu(1)}>
                                <span className='icon'><FaFolderOpen /></span>
                                Gestion des Projets   
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                            <div className={`submenuWrapper ${activeTab === 1 && isToggleSubmenuProjet ? 'colapse' : 'colapsed'}`}>
                                <ul className="submenu">
                                    <li><Link to="/projetListes">Projets par région</Link></li>
                                    <li><Link to="/projets-retard">Projets en retard</Link></li>
                                    <li><Link to="/projets-risque">Projets à haut risque</Link></li>
                                    <li><Link to="/projets-budget">Budget consommé vs prévu</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Gestion des Utilisateurs */}
                        <li>
                            <Button className={`w-100 ${activeTab === 2 ? 'active' : ''}`} onClick={() => isOpenSubmenu(2)}>
                                <span className='icon'><FaUsers /></span>
                                Utilisateurs  
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                            <div className={`submenuWrapper ${activeTab === 2 && isToggleSubmenuUsers ? 'colapse' : 'colapsed'}`}>
                                <ul className="submenu">
                                    <li><Link to="/creer-utilisateur">Créer un utilisateur</Link></li>
                                    <li><Link to="/liste-utilisateurs">Lister tous les utilisateurs</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Suivi Des Étapes */}
                        <li>
                            <Button className={`w-100 ${activeTab === 3 ? 'active' : ''}`} onClick={() => isOpenSubmenu(3)}>
                                <span className='icon'><FaClipboardCheck /></span>
                                Suivi Des Étapes
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                            <div className={`submenuWrapper ${activeTab === 3 && isToggleSubmenuSuivi ? 'colapse' : 'colapsed'}`}>
                                <ul className="submenu">
                                    <li><Link to="/planification-etapes">Planification des étapes</Link></li>
                                    <li><Link to="/avancement-detaille">Avancement détaillé</Link></li>
                                    <li><Link to="/validation-etapes">Validation des étapes terminées</Link></li>
                                    <li><Link to="/alertes-retard">Alertes de retard par étape</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Gestion des prestataires */}
                        <li>
                            <Button className={`w-100 ${activeTab === 4 ? 'active' : ''}`} onClick={() => isOpenSubmenu(4)}>
                                <span className='icon'><FaHandshake /></span>
                                Prestataires
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                            <div className={`submenuWrapper ${activeTab === 4 && isToggleSubmenuPrestataires ? 'colapse' : 'colapsed'}`}>
                                <ul className="submenu">
                                    <li><Link to="/liste-prestataires">Liste des prestataires</Link></li>
                                    <li><Link to="/evaluation-prestataires">Évaluation</Link></li>
                                    <li><Link to="/contrats-prestataires">Contrats</Link></li>
                                    <li><Link to="/suivi-prestations">Suivi</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Contrats & Paiements */}
                        <li>
                            <Button className={`w-100 ${activeTab === 5 ? 'active' : ''}`} onClick={() => isOpenSubmenu(5)}>
                                <span className='icon'><FaSearchDollar /></span>
                                Contrats & Paiements
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                            <div className={`submenuWrapper ${activeTab === 5 && isToggleSubmenuContratPaiement ? 'colapse' : 'colapsed'}`}>
                                <ul className="submenu">
                                    <li><Link to="/creer-contrat">Créer un contrat</Link></li>
                                    <li><Link to="/suivi-contrats">Suivi des contrats</Link></li>
                                    <li><Link to="/gestion-paiements">Gestion des paiements</Link></li>
                                    <li><Link to="/alertes-echeance">Alertes d'échéance</Link></li>
                                    <li><Link to="/historique-financier">Historique financier par contrat</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Documentation */}
                        <li>
                            <Button className={`w-100 ${activeTab === 6 ? 'active' : ''}`} onClick={() => isOpenSubmenu(6)}>
                                <span className='icon'><FaFileAlt /></span>
                                Documentation
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                            <div className={`submenuWrapper ${activeTab === 6 && isToggleSubmenuDocumentation ? 'colapse' : 'colapsed'}`}>
                                <ul className="submenu">
                                    <li><Link to="/documents-projets">Documents projets</Link></li>
                                    <li><Link to="/modeles-documents">Modèles de documents</Link></li>
                                    <li><Link to="/archivage">Archivage</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Reporting & Analyse */}
                        <li>
                            <Button className={`w-100 ${activeTab === 7 ? 'active' : ''}`} onClick={() => isOpenSubmenu(7)}>
                                <span className='icon'><FaChartLine /></span>
                                Reporting & Analyse
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                            <div className={`submenuWrapper ${activeTab === 7 && isToggleSubmenuReporting ? 'colapse' : 'colapsed'}`}>
                                <ul className="submenu">
                                    <li><Link to="/rapports-performance">Rapports de performance</Link></li>
                                    <li><Link to="/analyses-tendances">Analyse des retards</Link></li>
                                    <li><Link to="/tableaux-bord">Impact des projets</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Audit & Traçabilité */}
                        <li>
                            <Button className={`w-100 ${activeTab === 8 ? 'active' : ''}`} onClick={() => isOpenSubmenu(8)}>
                                <span className='icon'><FaUserCheck /></span>
                                Audit & Traçabilité
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                            <div className={`submenuWrapper ${activeTab === 8 && isToggleSubmenuAudit ? 'colapse' : 'colapsed'}`}>
                                <ul className="submenu">
                                    <li><Link to="/logs-activites">Logs d'activités</Link></li>
                                    <li><Link to="/audits-securite">Audits de sécurité</Link></li>
                                    <li><Link to="/traçabilite-modifications">Traçabilité des modifications</Link></li>
                                </ul>
                            </div>
                        </li>

                        {/* Notifications */}
                        <li>
                            <Link to="/notifications">
                                <Button className={`w-100 ${activeTab === 10 ? 'active' : ''}`} onClick={() => isOpenSubmenu(10)}>
                                    <span className='icon'><IoMdNotificationsOutline /></span>
                                    Notifications 
                                    <span className='arrow'><FaAngleRight /></span>
                                </Button>
                            </Link>
                        </li>

                        {/* Paramètres */}
                        <li>
                            <Link to="/parametres">
                                <Button className={`w-100 ${activeTab === 11 ? 'active' : ''}`} onClick={() => isOpenSubmenu(11)}>
                                    <span className='icon'><IoSettingsOutline /></span>
                                    Paramètres 
                                    <span className='arrow'><FaAngleRight /></span>
                                </Button>
                            </Link>
                        </li>

                        {/* Fréquence */}
                        {/* <li>
                            <Link to="/frequence">
                                <Button className={`w-100 ${activeTab === 9 ? 'active' : ''}`} onClick={() => isOpenSubmenu(9)}>
                                    <span className='icon'><FaBroadcastTower /></span>
                                    Fréquence
                                    <span className='arrow'><FaAngleRight /></span>
                                </Button>
                            </Link>
                        </li> */}
                    </ul>
                </div>

                <div className="logoutWrapper">
                    <div className="logoutBox">
                        <Button variant="contained"><IoMdLogOut /> Déconnexion</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SidBar