import { useState, useEffect, useRef } from 'react';
import './EnseignantsLists.css';
import { Link } from 'react-router-dom';
import Profil from '../../../../../assets/images/Profil.png';

import { CiMenuKebab } from "react-icons/ci";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import { MdMode, MdDelete, MdGridView, MdList, MdExpandMore, MdExpandLess } from "react-icons/md";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { FiFilter, FiChevronLeft, FiChevronRight, FiSliders, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RiUserStarFill, RiArrowUpDownLine } from "react-icons/ri";

const EnseignantsLists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('Tous');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedEnseignant, setSelectedEnseignant] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRows, setExpandedRows] = useState([]);
  const itemsPerPage = 8;

  const menuRef = useRef(null);
  const filterRef = useRef(null);

  // Fermer les menus en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Données simulées pour la démonstration
  const enseignantsData = Array(24).fill("").map((_, index) => ({
    id: index + 1,
    nom: `Nom ${index + 1}`,
    prenom: `Prénom ${index + 1}`,
    grade: ['Professeur', 'Maître de conférences', 'Docteur'][index % 3],
    department: ['Informatique', 'Mathématiques', 'Physique'][index % 3],
    email: `enseignant${index + 1}@universite.fr`,
    telephone: `+33 ${Math.floor(100000000 + Math.random() * 900000000)}`,
    image: Profil,
    cours: ['Algorithmique', 'IA', 'Web Development'][index % 3],
    note: (4 + Math.random()).toFixed(1),
    statut: index % 5 === 0 ? 'Inactif' : 'Actif',
    dateEmbauche: `202${index % 3}-0${index % 9 + 1}-${index % 28 + 1}`
  }));

  // Filtrage et pagination
  const filteredEnseignants = enseignantsData.filter(enseignant => 
    `${enseignant.nom} ${enseignant.prenom} ${enseignant.grade} ${enseignant.department}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGrade === 'Tous' || enseignant.grade === selectedGrade)
  );

  // Tri des données
  const sortedEnseignants = [...filteredEnseignants];
  if (sortConfig.key) {
    sortedEnseignants.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const totalPages = Math.ceil(sortedEnseignants.length / itemsPerPage);
  const currentEnseignants = sortedEnseignants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Réinitialiser la page quand le filtre change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedGrade]);

  const grades = ['Tous', 'Professeur', 'Maître de conférences', 'Docteur'];
  const departments = ['Tous', 'Informatique', 'Mathématiques', 'Physique'];

  const openDetailModal = (enseignant) => {
    setSelectedEnseignant(enseignant);
    setShowDetailModal(true);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleRowExpansion = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  return (
    <div className="enseignants-lists-container">
      <div className="enseignants-header">
        <div className="header-title">
          <div className="title-icon-container">
            <PiChalkboardTeacherBold className='title-icon' />
          </div>
          <div>
            <h1>Corps Enseignant</h1>
            <p className="header-subtitle">Gérez et consultez votre équipe pédagogique</p>
          </div>
        </div>
        
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              aria-label="Vue grille"
            >
              <MdGridView />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
              aria-label="Vue liste"    
            >
              <MdList />
            </button>
          </div>
          
          <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
            <button 
              className="menu-toggle primary-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <CiMenuKebab />
              <span>Actions</span>
            </button>
            <div className="dropdown-content">
              <Link to="/enseignantsFRM">
                <p>Ajouter un enseignant</p>
              </Link>
              <hr />
              <Link to="/enseignants/details/tous">
                <p>Liste en détail</p>
              </Link>
              <hr />
              <a href="#">
                <p>Exporter les données</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon total">
            <PiChalkboardTeacherBold />
          </div>
          <div className="stat-info">
            <h3>{enseignantsData.length}</h3>
            <p>Enseignants au total</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon professors">
            <RiUserStarFill />
          </div>
          <div className="stat-info">
            <h3>{enseignantsData.filter(e => e.grade === 'Professeur').length}</h3>
            <p>Professeurs</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon departments">
            <FiSliders />
          </div>
          <div className="stat-info">
            <h3>{new Set(enseignantsData.map(e => e.department)).size}</h3>
            <p>Départements</p>
          </div>
        </div>
      </div>

      <div className="enseignants-controls">
        <div className="search-container">
          <IoIosSearch className="search-icon" />
          <input 
            type="text" 
            placeholder='Rechercher par nom, prénom, grade ou département...' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <IoIosClose />
            </button>
          )}
        </div>
        
        <div className="controls-right">
          <div className="filter-container" ref={filterRef}>
            <button 
              className="filter-toggle"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FiFilter />
              <span>Filtres</span>
            </button>
            
            <div className={`filter-dropdown ${isFilterOpen ? 'active' : ''}`}>
              <div className="filter-section">
                <div className="filter-title">Grade</div>
                {grades.map(grade => (
                  <div 
                    key={grade} 
                    className={`filter-option ${selectedGrade === grade ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedGrade(grade);
                    }}
                  >
                    {grade}
                  </div>
                ))}
              </div>
              
              <div className="filter-section">
                <div className="filter-title">Département</div>
                {departments.map(dept => (
                  <div 
                    key={dept} 
                    className={`filter-option ${selectedGrade === dept ? 'selected' : ''}`}
                    onClick={() => {
                      // Implémenter le filtre par département
                    }}
                  >
                    {dept}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button className="primary-btn">
            <FiSliders />
            <span>Options <span className='none'>avancées</span></span>
          </button>
        </div>
      </div>

      {filteredEnseignants.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div className="enseignants-grid">
              {currentEnseignants.map(enseignant => (
                <div key={enseignant.id} className="enseignant-card">
                  <div className="card-content">
                    <div className="enseignant-avatar">
                      <img src={enseignant.image} alt={enseignant.nom} />
                      <div className={`online-indicator ${enseignant.statut === 'Actif' ? 'active' : 'inactive'}`}></div>
                    </div>
                    
                    <div className="enseignant-info">
                      <h3>{enseignant.nom} {enseignant.prenom}</h3>
                      <p className="grade">{enseignant.grade}</p>
                      <p className="department">{enseignant.department}</p>
                      <div className="enseignant-meta">
                        <span className="rating">
                          <RiUserStarFill /> {enseignant.note}/5
                        </span>
                        <span className="course-count">
                          {enseignant.cours}
                        </span>
                      </div>
                    </div>
                    
                    <div className="card-actions">
                      <button 
                        className="action-btn"
                        onClick={() => openDetailModal(enseignant)}
                      >
                        <IoEyeSharp className="action-icon view" />
                      </button>
                      <button className="action-btn">
                        <MdMode className="action-icon" />
                      </button>
                      <button className="action-btn">
                        <MdDelete className="action-icon delete" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <span className="email">{enseignant.email}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="enseignants-table-container">
              <div className="table-responsive">
                <table className="enseignants-table">
                  <thead>
                    <tr>
                      <th 
                        className="sortable"
                        onClick={() => handleSort('nom')}
                      >
                        <div className="th-content">
                          <span>Enseignant</span>
                          {sortConfig.key === 'nom' && (
                            sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                          )}
                          {sortConfig.key !== 'nom' && <RiArrowUpDownLine />}
                        </div>
                      </th>
                      <th 
                        className="sortable"
                        onClick={() => handleSort('grade')}
                      >
                        <div className="th-content">
                          <span>Grade</span>
                          {sortConfig.key === 'grade' && (
                            sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                          )}
                          {sortConfig.key !== 'grade' && <RiArrowUpDownLine />}
                        </div>
                      </th>
                      <th 
                        className="sortable"
                        onClick={() => handleSort('department')}
                      >
                        <div className="th-content">
                          <span>Département</span>
                          {sortConfig.key === 'department' && (
                            sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                          )}
                          {sortConfig.key !== 'department' && <RiArrowUpDownLine />}
                        </div>
                      </th>
                      <th 
                        className="sortable"
                        onClick={() => handleSort('note')}
                      >
                        <div className="th-content">
                          <span>Note</span>
                          {sortConfig.key === 'note' && (
                            sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />
                          )}
                          {sortConfig.key !== 'note' && <RiArrowUpDownLine />}
                        </div>
                      </th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEnseignants.map(enseignant => (
                      <>
                        <tr 
                          key={enseignant.id} 
                          className={`table-row ${expandedRows.includes(enseignant.id) ? 'expanded' : ''}`}
                        >
                          <td className="enseignant-cell">
                            <div className="enseignant-info-table">
                              <img src={enseignant.image} alt={enseignant.nom} className="table-avatar" />
                              <div>
                                <div className="enseignant-name">{enseignant.nom} {enseignant.prenom}</div>
                                <div className="enseignant-email">{enseignant.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>{enseignant.grade}</td>
                          <td>{enseignant.department}</td>
                          <td>
                            <div className="rating-table">
                              <RiUserStarFill /> 
                              <span>{enseignant.note}/5</span>
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge ${enseignant.statut === 'Actif' ? 'active' : 'inactive'}`}>
                              {enseignant.statut}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button 
                                className="action-btn"
                                onClick={() => openDetailModal(enseignant)}
                              >
                                <IoEyeSharp className="action-icon view" />
                              </button>
                              <button className="action-btn">
                                <MdMode className="action-icon" />
                              </button>
                              <button className="action-btn">
                                <MdDelete className="action-icon delete" />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedRows.includes(enseignant.id) && (
                          <tr className="detail-row">
                            <td colSpan="7">
                              <div className="row-details">
                                <div className="detail-section">
                                  <h4>Informations de contact</h4>
                                  <div className="detail-grid">
                                    <div className="detail-item">
                                      <span className="detail-label">Téléphone:</span>
                                      <span className="detail-value">{enseignant.telephone}</span>
                                    </div>
                                    <div className="detail-item">
                                      <span className="detail-label">Email:</span>
                                      <span className="detail-value">{enseignant.email}</span>
                                    </div>
                                    <div className="detail-item">
                                      <span className="detail-label">Date d'embauche:</span>
                                      <span className="detail-value">{enseignant.dateEmbauche}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="detail-section">
                                  <h4>Cours enseignés</h4>
                                  <div className="course-tags">
                                    <span className="course-tag">{enseignant.cours}</span>
                                    <span className="course-tag">Algorithmique avancée</span>
                                    <span className="course-tag">Structure de données</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {totalPages > 1 && (
            <div className="pagination-container">
              <div className="pagination">
                <button 
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <FiChevronLeft />
                  <span>Précédent</span>
                </button>
                
                <div className="pagination-pages">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <span className="pagination-ellipsis">...</span>
                  )}
                </div>
                
                <button 
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <span>Suivant</span>
                  <FiChevronRight />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">
            <PiChalkboardTeacherBold />
          </div>
          <h3>Aucun enseignant trouvé</h3>
          <p>Essayez de modifier vos critères de recherche ou de filtre</p>
          <button 
            className="primary-btn"
            onClick={() => {
              setSearchTerm('');
              setSelectedGrade('Tous');
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
      
      <div className="results-info">
        Affichage de {currentEnseignants.length} sur {filteredEnseignants.length} enseignants
      </div>

      {showDetailModal && selectedEnseignant && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Détails de l'enseignant</h2>
              <button 
                className="modal-close"
                onClick={() => setShowDetailModal(false)}
              >
                <IoIosClose />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="enseignant-detail">
                <div className="detail-avatar">
                  <img src={selectedEnseignant.image} alt={selectedEnseignant.nom} />
                </div>
                
                <div className="detail-info">
                  <h3>{selectedEnseignant.nom} {selectedEnseignant.prenom}</h3>
                  <p className="detail-grade">{selectedEnseignant.grade}</p>
                  <p className="detail-department">{selectedEnseignant.department}</p>
                  
                  <div className="detail-contacts">
                    <p><strong>Email:</strong> {selectedEnseignant.email}</p>
                    <p><strong>Téléphone:</strong> {selectedEnseignant.telephone}</p>
                  </div>
                  
                  <div className="detail-courses">
                    <h4>Cours enseignés</h4>
                    <div className="course-tags">
                      <span className="course-tag">{selectedEnseignant.cours}</span>
                      <span className="course-tag">Algorithmique avancée</span>
                      <span className="course-tag">Structure de données</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="secondary-btn"
                onClick={() => setShowDetailModal(false)}
              >
                Fermer
              </button>
              <button className="primary-btn">
                Modifier le profil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnseignantsLists;