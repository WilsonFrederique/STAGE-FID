import React, { useState, useEffect } from 'react';
import './ProjetListes.css';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled, useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { FaEdit, FaTrash, FaRegPlusSquare, FaGripVertical } from "react-icons/fa";
import { GoMoveToTop } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { ImPrinter } from "react-icons/im";
import Pagination from '@mui/material/Pagination';
import { CiSquareInfo, CiCircleRemove } from "react-icons/ci";
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { 
  Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, MenuItem, Select, FormControl, InputLabel,
  InputAdornment, IconButton, Tooltip, Snackbar, Alert, 
  useMediaQuery
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';

// Types TypeScript
interface Projet {
  id_projet: number;
  reference: string;
  nom: string;
  description: string;
  type_projet: 'infrastructure' | 'social' | 'formation' | 'urgence';
  localisation: string;
  latitude: number | null;
  longitude: number | null;
  budget_prevue: number;
  budget_depense: number;
  date_debut_prevue: string;
  date_fin_prevue: string;
  date_debut_reelle: string | null;
  date_fin_reelle: string | null;
  etat: 'planifie' | 'en_cours' | 'suspendu' | 'termine' | 'annule';
  pourcentage_avancement: number;
  priorite: 'basse' | 'moyenne' | 'haute' | 'critique';
  date_creation: string;
  id_utilisateur_createur: number;
  id_utilisateur_responsable: number;
}

interface ProjetFormData {
  reference: string;
  nom: string;
  description: string;
  type_projet: 'infrastructure' | 'social' | 'formation' | 'urgence';
  localisation: string;
  budget_prevue: number;
  budget_depense: number;
  date_debut_prevue: Date | null;
  date_fin_prevue: Date | null;
  date_debut_reelle: Date | null;
  date_fin_reelle: Date | null;
  etat: 'planifie' | 'en_cours' | 'suspendu' | 'termine' | 'annule';
  pourcentage_avancement: number;
  priorite: 'basse' | 'moyenne' | 'haute' | 'critique';
}

// Composant Modal pour les détails
const ProjetDetailsModal: React.FC<{ projet: Projet | null; isOpen: boolean; onClose: () => void; onEdit: () => void }> = ({ 
  projet, isOpen, onClose, onEdit 
}) => {
  if (!isOpen || !projet) return null;

  const getEtatColor = (etat: string) => {
    switch (etat) {
      case 'termine': return '#10b981';
      case 'en_cours': return '#3b82f6';
      case 'planifie': return '#f59e0b';
      case 'suspendu': return '#ef4444';
      case 'annule': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case 'critique': return '#dc2626';
      case 'haute': return '#ea580c';
      case 'moyenne': return '#ca8a04';
      case 'basse': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MGA'
    }).format(amount);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-details" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Détails du projet</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <CiCircleRemove />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Référence:</span>
              <span className="detail-value">{projet.reference}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Nom:</span>
              <span className="detail-value">{projet.nom}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Type:</span>
              <span className="detail-value" style={{ textTransform: 'capitalize' }}>{projet.type_projet}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Localisation:</span>
              <span className="detail-value">
                <FaMapMarkerAlt style={{ marginRight: '8px', color: '#ef4444' }} />
                {projet.localisation}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Budget prévu:</span>
              <span className="detail-value">{formatCurrency(projet.budget_prevue)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Budget dépensé:</span>
              <span className="detail-value">{formatCurrency(projet.budget_depense)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">État:</span>
              <span 
                className="detail-value" 
                style={{ 
                  color: getEtatColor(projet.etat),
                  fontWeight: 'bold'
                }}
              >
                {projet.etat.replace('_', ' ')}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Priorité:</span>
              <span 
                className="detail-value" 
                style={{ 
                  color: getPrioriteColor(projet.priorite),
                  fontWeight: 'bold'
                }}
              >
                {projet.priorite.charAt(0).toUpperCase() + projet.priorite.slice(1)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Avancement:</span>
              <span className="detail-value">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${projet.pourcentage_avancement}%` }}
                  ></div>
                  <span className="progress-text">{projet.pourcentage_avancement}%</span>
                </div>
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date début prévue:</span>
              <span className="detail-value">
                <FaCalendarAlt style={{ marginRight: '8px', color: '#3b82f6' }} />
                {new Date(projet.date_debut_prevue).toLocaleDateString('fr-FR')}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date fin prévue:</span>
              <span className="detail-value">
                <FaCalendarAlt style={{ marginRight: '8px', color: '#3b82f6' }} />
                {new Date(projet.date_fin_prevue).toLocaleDateString('fr-FR')}
              </span>
            </div>
            {projet.date_debut_reelle && (
              <div className="detail-item">
                <span className="detail-label">Date début réelle:</span>
                <span className="detail-value">
                  <FaCalendarAlt style={{ marginRight: '8px', color: '#10b981' }} />
                  {new Date(projet.date_debut_reelle).toLocaleDateString('fr-FR')}
                </span>
              </div>
            )}
            {projet.date_fin_reelle && (
              <div className="detail-item">
                <span className="detail-label">Date fin réelle:</span>
                <span className="detail-value">
                  <FaCalendarAlt style={{ marginRight: '8px', color: '#10b981' }} />
                  {new Date(projet.date_fin_reelle).toLocaleDateString('fr-FR')}
                </span>
              </div>
            )}
            <div className="detail-item full-width">
              <span className="detail-label">Description:</span>
              <p className="detail-description">{projet.description}</p>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-action-btn secondary" onClick={onClose}>
            Fermer
          </button>
          <button className="modal-action-btn primary" onClick={onEdit}>
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant Formulaire de projet
const ProjetFormModal: React.FC<{ 
  projet: Projet | null; 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (data: ProjetFormData) => void; 
}> = ({ projet, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<ProjetFormData>({
    reference: '',
    nom: '',
    description: '',
    type_projet: 'infrastructure',
    localisation: '',
    budget_prevue: 0,
    budget_depense: 0,
    date_debut_prevue: null,
    date_fin_prevue: null,
    date_debut_reelle: null,
    date_fin_reelle: null,
    etat: 'planifie',
    pourcentage_avancement: 0,
    priorite: 'moyenne'
  });

  useEffect(() => {
    if (projet) {
      setFormData({
        reference: projet.reference,
        nom: projet.nom,
        description: projet.description,
        type_projet: projet.type_projet,
        localisation: projet.localisation,
        budget_prevue: projet.budget_prevue,
        budget_depense: projet.budget_depense,
        date_debut_prevue: projet.date_debut_prevue ? new Date(projet.date_debut_prevue) : null,
        date_fin_prevue: projet.date_fin_prevue ? new Date(projet.date_fin_prevue) : null,
        date_debut_reelle: projet.date_debut_reelle ? new Date(projet.date_debut_reelle) : null,
        date_fin_reelle: projet.date_fin_reelle ? new Date(projet.date_fin_reelle) : null,
        etat: projet.etat,
        pourcentage_avancement: projet.pourcentage_avancement,
        priorite: projet.priorite
      });
    } else {
      setFormData({
        reference: `PROJ-${Date.now()}`,
        nom: '',
        description: '',
        type_projet: 'infrastructure',
        localisation: '',
        budget_prevue: 0,
        budget_depense: 0,
        date_debut_prevue: null,
        date_fin_prevue: null,
        date_debut_reelle: null,
        date_fin_reelle: null,
        etat: 'planifie',
        pourcentage_avancement: 0,
        priorite: 'moyenne'
      });
    }
  }, [projet, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof ProjetFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNumberChange = (field: keyof ProjetFormData, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  return (
    <Dialog 
        open={isOpen} 
        onClose={onClose} 
        maxWidth="xl" 
        fullWidth 
        className="modern-form-dialog"
        PaperProps={{
            sx: {
                borderRadius: '24px',
                background: 'var(--modal-bg)',
                backgroundImage: 'linear-gradient(135deg, var(--card-bg) 0%, var(--modal-bg) 100%)',
                boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }
        }}
    >
        {/* En-tête avec gradient animé */}
        <DialogTitle className="modern-dialog-header">
            <div className="header-content">
                <div className="title-section">
                    <div className="icon-wrapper">
                        <div className="form-icon">
                            {projet ? '📊' : '🚀'}
                        </div>
                    </div>
                    <div>
                        <h2 className="dialog-main-title">
                            {projet ? "Modifier le projet" : "Nouveau projet"}
                        </h2>
                        <p className="dialog-subtitle">
                            {projet ? "Mettez à jour les informations du projet" : "Créez un nouveau projet en remplissant les champs ci-dessous"}
                        </p>
                    </div>
                </div>
                <button 
                    className="close-button" 
                    onClick={onClose}
                    aria-label="Fermer"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
            </div>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
            <DialogContent className="modern-dialog-content">
                {/* Barre de progression pour les étapes du formulaire */}
                <div className="form-progress">
                    <div className="progress-steps">
                        <div className="step active" data-step="1">
                            <div className="step-number">1</div>
                            <span className="step-label">Informations de base</span>
                        </div>
                        <div className="step" data-step="2">
                            <div className="step-number">2</div>
                            <span className="step-label">Budget & Dates</span>
                        </div>
                        <div className="step" data-step="3">
                            <div className="step-number">3</div>
                            <span className="step-label">État & Avancement</span>
                        </div>
                    </div>
                </div>

                <div className="modern-form-layout">
                    {/* Colonne principale */}
                    <div className="form-main-column">
                        {/* Section 1: Informations de base */}
                        <div className="form-section">
                            <div className="section-header">
                                <div className="section-icon">📋</div>
                                <h3 className="section-title">Informations générales</h3>
                            </div>
                            
                            <div className="responsive-grid">
                                <div className="form-group enhanced">
                                    <label className="form-label">
                                        <span className="label-text">Référence du projet</span>
                                        <span className="required-asterisk">*</span>
                                    </label>
                                    <TextField
                                        value={formData.reference}
                                        onChange={(e) => handleChange('reference', e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        required
                                        className="modern-input"
                                        placeholder="Ex: PROJ-2024-001"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <span className="input-icon">🔢</span>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <div className="input-hint">Identifiant unique du projet</div>
                                </div>

                                <div className="form-group enhanced">
                                    <label className="form-label">
                                        <span className="label-text">Nom du projet</span>
                                        <span className="required-asterisk">*</span>
                                    </label>
                                    <TextField
                                        value={formData.nom}
                                        onChange={(e) => handleChange('nom', e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        required
                                        className="modern-input"
                                        placeholder="Ex: Construction École Primaire"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <span className="input-icon">🏗️</span>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>

                                <div className="form-group enhanced">
                                    <label className="form-label">
                                        <span className="label-text">Type de projet</span>
                                        <span className="required-asterisk">*</span>
                                    </label>
                                    <FormControl fullWidth size="small">
                                        <Select
                                            value={formData.type_projet}
                                            onChange={(e) => handleChange('type_projet', e.target.value)}
                                            required
                                            className="modern-select"
                                            renderValue={(selected) => (
                                                <div className="selected-value">
                                                    <span className="type-icon">
                                                        {selected === 'infrastructure' ? '🏛️' :
                                                         selected === 'social' ? '👥' :
                                                         selected === 'formation' ? '🎓' : '🚨'}
                                                    </span>
                                                    {selected.charAt(0).toUpperCase() + selected.slice(1)}
                                                </div>
                                            )}
                                        >
                                            <MenuItem value="infrastructure">
                                                <div className="menu-item-content">
                                                    <span className="menu-icon">🏛️</span>
                                                    Infrastructure
                                                </div>
                                            </MenuItem>
                                            <MenuItem value="social">
                                                <div className="menu-item-content">
                                                    <span className="menu-icon">👥</span>
                                                    Social
                                                </div>
                                            </MenuItem>
                                            <MenuItem value="formation">
                                                <div className="menu-item-content">
                                                    <span className="menu-icon">🎓</span>
                                                    Formation
                                                </div>
                                            </MenuItem>
                                            <MenuItem value="urgence">
                                                <div className="menu-item-content">
                                                    <span className="menu-icon">🚨</span>
                                                    Urgence
                                                </div>
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="form-group enhanced">
                                    <label className="form-label">
                                        <span className="label-text">Localisation</span>
                                        <span className="required-asterisk">*</span>
                                    </label>
                                    <TextField
                                        value={formData.localisation}
                                        onChange={(e) => handleChange('localisation', e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        required
                                        className="modern-input"
                                        placeholder="Ex: Antananarivo, Madagascar"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <span className="input-icon">📍</span>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Budget et Dates */}
                        <div className="form-section">
                            <div className="section-header">
                                <div className="section-icon">💰</div>
                                <h3 className="section-title">Budget et planning</h3>
                            </div>
                            
                            <div className="responsive-grid">
                                <div className="form-group enhanced">
                                    <label className="form-label">
                                        <span className="label-text">Budget prévu</span>
                                        <span className="required-asterisk">*</span>
                                    </label>
                                    <TextField
                                        type="number"
                                        value={formData.budget_prevue}
                                        onChange={(e) => handleNumberChange('budget_prevue', e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        required
                                        className="modern-input"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Ar</InputAdornment>,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <span className="currency-label">MGA</span>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <div className="input-hint">Montant total alloué au projet</div>
                                </div>

                                <div className="form-group enhanced">
                                    <label className="form-label">
                                        <span className="label-text">Budget dépensé</span>
                                    </label>
                                    <TextField
                                        type="number"
                                        value={formData.budget_depense}
                                        onChange={(e) => handleNumberChange('budget_depense', e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        className="modern-input"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Ar</InputAdornment>,
                                        }}
                                    />
                                </div>

                                <div className="form-group enhanced">
                                    <label className="form-label">Date début prévue</label>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                                        <DatePicker
                                            value={formData.date_debut_prevue}
                                            onChange={(date) => handleChange('date_debut_prevue', date)}
                                            renderInput={(params) => (
                                                <TextField 
                                                    {...params} 
                                                    fullWidth 
                                                    size="small" 
                                                    className="modern-datepicker"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <span className="input-icon">📅</span>
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <div className="form-group enhanced">
                                    <label className="form-label">Date fin prévue</label>
                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                                        <DatePicker
                                            value={formData.date_fin_prevue}
                                            onChange={(date) => handleChange('date_fin_prevue', date)}
                                            renderInput={(params) => (
                                                <TextField 
                                                    {...params} 
                                                    fullWidth 
                                                    size="small" 
                                                    className="modern-datepicker"
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Colonne latérale pour les informations secondaires */}
                    <div className="form-sidebar">
                        {/* Section État et Priorité */}
                        <div className="sidebar-section">
                            <h4 className="sidebar-title">État du projet</h4>
                            
                            <div className="compact-form-group">
                                <label className="compact-label">État actuel</label>
                                <FormControl fullWidth size="small">
                                    <Select
                                        value={formData.etat}
                                        onChange={(e) => handleChange('etat', e.target.value)}
                                        className="compact-select"
                                        renderValue={(selected) => (
                                            <div className="status-badge" data-status={selected}>
                                                {selected.replace('_', ' ')}
                                            </div>
                                        )}
                                    >
                                        <MenuItem value="planifie">
                                            <div className="status-option" data-status="planifie">
                                                <div className="status-dot"></div>
                                                Planifié
                                            </div>
                                        </MenuItem>
                                        <MenuItem value="en_cours">
                                            <div className="status-option" data-status="en_cours">
                                                <div className="status-dot"></div>
                                                En cours
                                            </div>
                                        </MenuItem>
                                        <MenuItem value="suspendu">
                                            <div className="status-option" data-status="suspendu">
                                                <div className="status-dot"></div>
                                                Suspendu
                                            </div>
                                        </MenuItem>
                                        <MenuItem value="termine">
                                            <div className="status-option" data-status="termine">
                                                <div className="status-dot"></div>
                                                Terminé
                                            </div>
                                        </MenuItem>
                                        <MenuItem value="annule">
                                            <div className="status-option" data-status="annule">
                                                <div className="status-dot"></div>
                                                Annulé
                                            </div>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="compact-form-group">
                                <label className="compact-label">Niveau de priorité</label>
                                <FormControl fullWidth size="small">
                                    <Select
                                        value={formData.priorite}
                                        onChange={(e) => handleChange('priorite', e.target.value)}
                                        className="compact-select"
                                        renderValue={(selected) => (
                                            <div className="priority-badge" data-priority={selected}>
                                                {selected.charAt(0).toUpperCase() + selected.slice(1)}
                                            </div>
                                        )}
                                    >
                                        <MenuItem value="basse">
                                            <div className="priority-option" data-priority="basse">
                                                <div className="priority-indicator"></div>
                                                Basse
                                            </div>
                                        </MenuItem>
                                        <MenuItem value="moyenne">
                                            <div className="priority-option" data-priority="moyenne">
                                                <div className="priority-indicator"></div>
                                                Moyenne
                                            </div>
                                        </MenuItem>
                                        <MenuItem value="haute">
                                            <div className="priority-option" data-priority="haute">
                                                <div className="priority-indicator"></div>
                                                Haute
                                            </div>
                                        </MenuItem>
                                        <MenuItem value="critique">
                                            <div className="priority-option" data-priority="critique">
                                                <div className="priority-indicator"></div>
                                                Critique
                                            </div>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="compact-form-group">
                                <label className="compact-label">Avancement</label>
                                <div className="avancement-container">
                                    <TextField
                                        type="number"
                                        value={formData.pourcentage_avancement}
                                        onChange={(e) => handleNumberChange('pourcentage_avancement', e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        inputProps={{ min: 0, max: 100 }}
                                        className="avancement-input"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                    />
                                    <div className="avancement-slider">
                                        <div 
                                            className="avancement-progress" 
                                            style={{ width: `${formData.pourcentage_avancement}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dates réelles */}
                        <div className="sidebar-section">
                            <h4 className="sidebar-title">Dates réelles (optionnel)</h4>
                            
                            <div className="compact-form-group">
                                <label className="compact-label">Date début réelle</label>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                                    <DatePicker
                                        value={formData.date_debut_reelle}
                                        onChange={(date) => handleChange('date_debut_reelle', date)}
                                        renderInput={(params) => (
                                            <TextField 
                                                {...params} 
                                                fullWidth 
                                                size="small" 
                                                className="compact-datepicker"
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className="compact-form-group">
                                <label className="compact-label">Date fin réelle</label>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                                    <DatePicker
                                        value={formData.date_fin_reelle}
                                        onChange={(date) => handleChange('date_fin_reelle', date)}
                                        renderInput={(params) => (
                                            <TextField 
                                                {...params} 
                                                fullWidth 
                                                size="small" 
                                                className="compact-datepicker"
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Description (pleine largeur) */}
                <div className="form-section full-width mb">
                    <div className="section-header">
                        <div className="section-icon">📝</div>
                        <h3 className="section-title">Description du projet</h3>
                    </div>
                    
                    <div className="form-group enhanced full-width">
                        <TextField
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            fullWidth
                            variant="outlined"
                            size="small"
                            multiline
                            rows={4}
                            className="modern-textarea"
                            placeholder="Décrivez les objectifs, les bénéficiaires, et les spécificités du projet..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" className="textarea-adornment">
                                        <span className="input-icon">✏️</span>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div className="textarea-footer">
                            <span className="char-count">{formData.description.length}/500 caractères</span>
                            <span className="hint-text">Recommandé: 200-500 caractères</span>
                        </div>
                    </div>
                </div>
            </DialogContent>

            {/* Actions avec style moderne */}
            <DialogActions className="modern-dialog-actions">
                <div className="actions-container">
                    <button 
                        type="button" 
                        className="modern-btn secondary" 
                        onClick={onClose}
                    >
                        <span className="btn-icon">❌</span>
                        <span className="btn-text">Annuler</span>
                    </button>
                    
                    <div className="primary-actions">
                        <button 
                            type="button" 
                            className="modern-btn outline"
                            onClick={() => {
                                // Fonction pour réinitialiser le formulaire
                                if (!projet) {
                                    setFormData({
                                        reference: `PROJ-${Date.now()}`,
                                        nom: '',
                                        description: '',
                                        type_projet: 'infrastructure',
                                        localisation: '',
                                        budget_prevue: 0,
                                        budget_depense: 0,
                                        date_debut_prevue: null,
                                        date_fin_prevue: null,
                                        date_debut_reelle: null,
                                        date_fin_reelle: null,
                                        etat: 'planifie',
                                        pourcentage_avancement: 0,
                                        priorite: 'moyenne'
                                    });
                                }
                            }}
                        >
                            <span className="btn-icon">🔄</span>
                            <span className="btn-text">Réinitialiser</span>
                        </button>
                        
                        <button 
                            type="submit" 
                            className="modern-btn primary"
                        >
                            <span className="btn-icon">
                                {projet ? '💾' : '✨'}
                            </span>
                            <span className="btn-text">
                                {projet ? "Mettre à jour" : "Créer le projet"}
                            </span>
                            <span className="btn-badge">CTRL + S</span>
                        </button>
                    </div>
                </div>
            </DialogActions>
        </form>
    </Dialog>
  );
};

// Composant Informations du projet sélectionné
const ProjetInfoPanel: React.FC<{ projetId: number | null, selectedProjet: Projet | null }> = ({ projetId, selectedProjet }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MGA'
    }).format(amount);
  };

  const getEtatColor = (etat: string) => {
    switch (etat) {
      case 'termine': return '#10b981';
      case 'en_cours': return '#3b82f6';
      case 'planifie': return '#f59e0b';
      case 'suspendu': return '#ef4444';
      case 'annule': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div className="projet-info-container">
      <h3 className="projet-info-title">Informations du projet</h3>
      <p>Détails du projet sélectionné</p>
      <hr />
      
      {selectedProjet ? (
        <div className="projet-info-content">
          <div className="info-section">
            <h4>Informations générales</h4>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Référence:</span>
                <span className="info-value">{selectedProjet.reference}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Type:</span>
                <span className="info-value" style={{ textTransform: 'capitalize' }}>
                  {selectedProjet.type_projet}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">État:</span>
                <span 
                  className="info-value" 
                  style={{ color: getEtatColor(selectedProjet.etat), fontWeight: 'bold' }}
                >
                  {selectedProjet.etat.replace('_', ' ')}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Priorité:</span>
                <span className="info-value" style={{ textTransform: 'capitalize' }}>
                  {selectedProjet.priorite}
                </span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h4>Budget</h4>
            <div className="budget-info">
              <div className="budget-item">
                <FaMoneyBillWave className="budget-icon" />
                <div>
                  <span className="budget-label">Budget prévu:</span>
                  <span className="budget-amount">{formatCurrency(selectedProjet.budget_prevue)}</span>
                </div>
              </div>
              <div className="budget-item">
                <FaMoneyBillWave className="budget-icon spent" />
                <div>
                  <span className="budget-label">Budget dépensé:</span>
                  <span className="budget-amount">{formatCurrency(selectedProjet.budget_depense)}</span>
                </div>
              </div>
              <div className="budget-item">
                <FaMoneyBillWave className="budget-icon remaining" />
                <div>
                  <span className="budget-label">Reste à dépenser:</span>
                  <span className="budget-amount">
                    {formatCurrency(selectedProjet.budget_prevue - selectedProjet.budget_depense)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h4>Avancement</h4>
            <div className="progress-section">
              <div className="progress-bar-container large">
                <div 
                  className="progress-bar" 
                  style={{ width: `${selectedProjet.pourcentage_avancement}%` }}
                ></div>
                <span className="progress-text">{selectedProjet.pourcentage_avancement}%</span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h4>Description</h4>
            <div className="description-scrollable">
              <p>{selectedProjet.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-projet-selected">
          <p>Sélectionnez un projet pour voir ses détails</p>
        </div>
      )}
    </div>
  );
};

const ProjetListes: React.FC = () => {
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
    });

    // State pour le mode sombre
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // State pour le glisser-déposer
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Appliquer le mode sombre au body
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    // Données d'exemple pour les projets
    const [projets, setProjets] = useState<Projet[]>([
        {
            id_projet: 1,
            reference: "PROJ-2024-001",
            nom: "Construction École Primaire",
            description: "Construction d'une école primaire de 6 salles de classe avec équipements modernes dans la région d'Antananarivo. Le projet comprend la construction des bâtiments, l'installation des équipements sanitaires et la mise en place d'une bibliothèque.",
            type_projet: "infrastructure",
            localisation: "Antananarivo",
            latitude: -18.8792,
            longitude: 47.5079,
            budget_prevue: 250000000,
            budget_depense: 185000000,
            date_debut_prevue: "2024-01-15",
            date_fin_prevue: "2024-12-15",
            date_debut_reelle: "2024-02-01",
            date_fin_reelle: null,
            etat: "en_cours",
            pourcentage_avancement: 74,
            priorite: "haute",
            date_creation: "2023-11-20T08:00:00",
            id_utilisateur_createur: 1,
            id_utilisateur_responsable: 2
        },
        {
            id_projet: 2,
            reference: "PROJ-2024-002",
            nom: "Programme Nutrition Infantile",
            description: "Programme de lutte contre la malnutrition infantile dans les zones rurales. Distribution de compléments nutritionnels et formation des mères sur les pratiques alimentaires saines.",
            type_projet: "social",
            localisation: "Toliara",
            latitude: -23.3516,
            longitude: 43.6855,
            budget_prevue: 120000000,
            budget_depense: 95000000,
            date_debut_prevue: "2024-03-01",
            date_fin_prevue: "2024-11-30",
            date_debut_reelle: "2024-03-15",
            date_fin_reelle: null,
            etat: "en_cours",
            pourcentage_avancement: 79,
            priorite: "critique",
            date_creation: "2023-12-10T10:30:00",
            id_utilisateur_createur: 1,
            id_utilisateur_responsable: 3
        },
        {
            id_projet: 3,
            reference: "PROJ-2024-003",
            nom: "Formation Agricole Durable",
            description: "Formation des agriculteurs aux techniques d'agriculture durable et résiliente au changement climatique. Programme sur 6 mois avec suivi technique.",
            type_projet: "formation",
            localisation: "Fianarantsoa",
            latitude: -21.4536,
            longitude: 47.0858,
            budget_prevue: 80000000,
            budget_depense: 45000000,
            date_debut_prevue: "2024-02-01",
            date_fin_prevue: "2024-07-31",
            date_debut_reelle: "2024-02-01",
            date_fin_reelle: null,
            etat: "en_cours",
            pourcentage_avancement: 56,
            priorite: "moyenne",
            date_creation: "2023-11-15T14:20:00",
            id_utilisateur_createur: 2,
            id_utilisateur_responsable: 4
        },
        {
            id_projet: 4,
            reference: "PROJ-2024-004",
            nom: "Réponse Cyclone Urgence",
            description: "Intervention d'urgence suite au passage du cyclone. Reconstruction d'habitations et distribution de kits de première nécessité.",
            type_projet: "urgence",
            localisation: "Toamasina",
            latitude: -18.1499,
            longitude: 49.4023,
            budget_prevue: 350000000,
            budget_depense: 320000000,
            date_debut_prevue: "2024-01-10",
            date_fin_prevue: "2024-06-30",
            date_debut_reelle: "2024-01-12",
            date_fin_reelle: "2024-06-15",
            etat: "termine",
            pourcentage_avancement: 100,
            priorite: "critique",
            date_creation: "2024-01-05T09:15:00",
            id_utilisateur_createur: 3,
            id_utilisateur_responsable: 1
        },
        {
            id_projet: 5,
            reference: "PROJ-2024-005",
            nom: "Centre de Santé Communautaire",
            description: "Construction et équipement d'un centre de santé communautaire avec maternité. Formation du personnel soignant.",
            type_projet: "infrastructure",
            localisation: "Mahajanga",
            latitude: -15.7167,
            longitude: 46.3167,
            budget_prevue: 180000000,
            budget_depense: 0,
            date_debut_prevue: "2024-09-01",
            date_fin_prevue: "2025-06-30",
            date_debut_reelle: null,
            date_fin_reelle: null,
            etat: "planifie",
            pourcentage_avancement: 0,
            priorite: "haute",
            date_creation: "2024-06-01T11:00:00",
            id_utilisateur_createur: 2,
            id_utilisateur_responsable: 3
        },
        {
            id_projet: 6,
            reference: "PROJ-2024-006",
            nom: "Sensibilisation Environnementale",
            description: "Campagne de sensibilisation à la protection de l'environnement et reboisement communautaire.",
            type_projet: "social",
            localisation: "Antsiranana",
            latitude: -12.2766,
            longitude: 49.2917,
            budget_prevue: 45000000,
            budget_depense: 28000000,
            date_debut_prevue: "2024-04-01",
            date_fin_prevue: "2024-10-31",
            date_debut_reelle: "2024-04-05",
            date_fin_reelle: null,
            etat: "suspendu",
            pourcentage_avancement: 62,
            priorite: "basse",
            date_creation: "2024-02-20T16:45:00",
            id_utilisateur_createur: 4,
            id_utilisateur_responsable: 2
        }
    ]);

    // États pour la pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    // États pour la modal
    const [selectedProjet, setSelectedProjet] = useState<Projet | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    // État pour le projet sélectionné
    const [selectedProjetId, setSelectedProjetId] = useState<number | null>(null);

    // États pour la recherche et le filtrage
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterEtat, setFilterEtat] = useState('');

    // État pour les notifications
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    // Fonctions pour le glisser-déposer
    const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, id: number) => {
        setDraggedItem(id);
        setIsDragging(true);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", id.toString());
        
        setTimeout(() => {
            e.currentTarget.classList.add('dragging');
        }, 0);
    };

    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetId: number) => {
        e.preventDefault();
        setIsDragging(false);
        
        if (draggedItem === null || draggedItem === targetId) return;
        
        const draggedIndex = projets.findIndex(p => p.id_projet === draggedItem);
        const targetIndex = projets.findIndex(p => p.id_projet === targetId);
        
        if (draggedIndex === -1 || targetIndex === -1) return;
        
        const newProjets = [...projets];
        const [movedItem] = newProjets.splice(draggedIndex, 1);
        newProjets.splice(targetIndex, 0, movedItem);
        
        setProjets(newProjets);
        setDraggedItem(null);
        
        const rows = document.querySelectorAll('.projet-row');
        rows.forEach(row => row.classList.remove('dragging'));
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setDraggedItem(null);
        const rows = document.querySelectorAll('.projet-row');
        rows.forEach(row => row.classList.remove('dragging'));
    };

    // Ouvrir la modal avec les détails du projet
    const openDetailsModal = (projet: Projet) => {
        setSelectedProjet(projet);
        setIsDetailsModalOpen(true);
    };

    // Ouvrir la modal de formulaire
    const openFormModal = (projet: Projet | null = null) => {
        setSelectedProjet(projet);
        setIsFormModalOpen(true);
    };

    // Fermer les modals
    const closeModals = () => {
        setIsDetailsModalOpen(false);
        setIsFormModalOpen(false);
        setSelectedProjet(null);
    };

    // Sélectionner un projet
    const handleSelectProjet = (projetId: number) => {
        setSelectedProjetId(projetId);
        const projet = projets.find(p => p.id_projet === projetId);
        setSelectedProjet(projet || null);
    };

    // Sauvegarder un projet
    const handleSaveProjet = (data: ProjetFormData) => {
        const formatDate = (date: Date | null) => date ? date.toISOString().split('T')[0] : null;
        
        if (selectedProjet) {
            // Modification d'un projet existant
            setProjets(prev => prev.map(p => 
                p.id_projet === selectedProjet.id_projet 
                    ? { 
                        ...p, 
                        ...data,
                        date_debut_prevue: formatDate(data.date_debut_prevue) || p.date_debut_prevue,
                        date_fin_prevue: formatDate(data.date_fin_prevue) || p.date_fin_prevue,
                        date_debut_reelle: formatDate(data.date_debut_reelle),
                        date_fin_reelle: formatDate(data.date_fin_reelle)
                    } 
                    : p
            ));
            setSnackbar({ open: true, message: 'Projet modifié avec succès', severity: 'success' });
        } else {
            // Ajout d'un nouveau projet
            const newProjet: Projet = {
                id_projet: Math.max(0, ...projets.map(p => p.id_projet)) + 1,
                reference: data.reference,
                nom: data.nom,
                description: data.description,
                type_projet: data.type_projet,
                localisation: data.localisation,
                latitude: null,
                longitude: null,
                budget_prevue: data.budget_prevue,
                budget_depense: data.budget_depense,
                date_debut_prevue: formatDate(data.date_debut_prevue) || new Date().toISOString().split('T')[0],
                date_fin_prevue: formatDate(data.date_fin_prevue) || new Date().toISOString().split('T')[0],
                date_debut_reelle: formatDate(data.date_debut_reelle),
                date_fin_reelle: formatDate(data.date_fin_reelle),
                etat: data.etat,
                pourcentage_avancement: data.pourcentage_avancement,
                priorite: data.priorite,
                date_creation: new Date().toISOString(),
                id_utilisateur_createur: 1, // À remplacer par l'ID de l'utilisateur connecté
                id_utilisateur_responsable: 1 // À remplacer par l'ID de l'utilisateur responsable
            };
            setProjets(prev => [...prev, newProjet]);
            setSnackbar({ open: true, message: 'Projet ajouté avec succès', severity: 'success' });
        }
        closeModals();
    };

    // Supprimer un projet
    const handleDeleteProjet = (id: number) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
            setProjets(prev => prev.filter(p => p.id_projet !== id));
            if (selectedProjetId === id) {
                setSelectedProjetId(null);
                setSelectedProjet(null);
            }
            setSnackbar({ open: true, message: 'Projet supprimé avec succès', severity: 'success' });
        }
    };

    // Filtrer les projets
    const filteredProjets = projets.filter(projet => {
        const matchesSearch = 
            projet.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
            projet.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            projet.localisation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            projet.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesType = filterType ? projet.type_projet === filterType : true;
        const matchesEtat = filterEtat ? projet.etat === filterEtat : true;
        
        return matchesSearch && matchesType && matchesEtat;
    });

    // Calcul des éléments à afficher
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProjets.length / itemsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    // Options de filtre
    const typeOptions = Array.from(new Set(projets.map(p => p.type_projet)));
    const etatOptions = Array.from(new Set(projets.map(p => p.etat)));

    // Couleurs pour les lignes du tableau
    const rowColors = [
        'row-color-1', 'row-color-2', 'row-color-3', 'row-color-4', 'row-color-5'
    ];

    const getEtatColor = (etat: string) => {
        switch (etat) {
            case 'termine': return '#10b981';
            case 'en_cours': return '#3b82f6';
            case 'planifie': return '#f59e0b';
            case 'suspendu': return '#ef4444';
            case 'annule': return '#6b7280';
            default: return '#6b7280';
        }
    };

    const getPrioriteColor = (priorite: string) => {
        switch (priorite) {
            case 'critique': return '#dc2626';
            case 'haute': return '#ea580c';
            case 'moyenne': return '#ca8a04';
            case 'basse': return '#16a34a';
            default: return '#6b7280';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'MGA',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="edt-container">
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4 header-card">
                    <h5 className="mb-0">Gestion des Projets</h5>
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
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="search-button" type="button" aria-label="Lancer la recherche">
                                    <IoSearchOutline className="search-icon" />
                                </button>
                            </form>
                        </div>
                        
                        <div className="filter-container">
                            <FormControl size="small" className="type-filter">
                                <InputLabel id="type-filter-label">Type</InputLabel>
                                <Select
                                    className='choix' 
                                    labelId="type-filter-label"
                                    value={filterType}
                                    label="Type"
                                    onChange={(e) => setFilterType(e.target.value as string)}
                                    endAdornment={
                                        filterType && (
                                            <InputAdornment className='choix' position="end">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => setFilterType('')}
                                                    edge="end"
                                                >
                                                    <CiCircleRemove />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                >
                                    <MenuItem value="">Tous les types</MenuItem>
                                    {typeOptions.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className="filter-container">
                            <FormControl size="small" className="etat-filter">
                                <InputLabel id="etat-filter-label">État</InputLabel>
                                <Select
                                    labelId="etat-filter-label"
                                    value={filterEtat}
                                    label="État"
                                    onChange={(e) => setFilterEtat(e.target.value as string)}
                                    endAdornment={
                                        filterEtat && (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => setFilterEtat('')}
                                                    edge="end"
                                                >
                                                    <CiCircleRemove />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                >
                                    <MenuItem value="">Tous les états</MenuItem>
                                    {etatOptions.map((etat) => (
                                        <MenuItem key={etat} value={etat}>
                                            {etat.replace('_', ' ').charAt(0).toUpperCase() + etat.replace('_', ' ').slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>

                {/* Conteneur principal avec deux colonnes */}
                <div className="main-content-container">
                    {/* Colonne de gauche - Tableau des projets */}
                    <div className="projets-column">
                        <div className="card shadow border-0 p-3">
                            <div className="d-flex add-product">
                                <h3 className="hd">Liste des projets</h3>
                                <div className="action-buttons">
                                    <Tooltip title="Imprimer">
                                        <button className="action-icon" onClick={() => window.print()}>
                                            <ImPrinter className='impression' />
                                        </button>
                                    </Tooltip>
                                    <Tooltip title="Ajouter un projet">
                                        <button className="action-icon" onClick={() => openFormModal()}>
                                            <FaRegPlusSquare />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="projets-table-container mt-3">
                                <div className="table-responsive">
                                    <table className="projets-table">
                                        <thead>
                                            <tr className="projets-thead">
                                                <th className="drag-column" title="Glisser pour réorganiser l'ordre des projets">
                                                    <div className="">
                                                        <FaGripVertical className="header-icon" />
                                                    </div>
                                                </th>
                                                <th className='th'>Projet</th>
                                                <th className='th'>Budget</th>
                                                <th className='details-cell-tete'>
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="projets-tbody">
                                            {currentItems.length > 0 ? (
                                                currentItems.map((projet, index) => (
                                                <tr 
                                                    key={`${projet.id_projet}-${index}`} 
                                                    className={`projet-row ${rowColors[index % rowColors.length]} ${selectedProjetId === projet.id_projet ? 'selected' : ''} ${draggedItem === projet.id_projet ? 'dragging' : ''}`}
                                                    onClick={() => handleSelectProjet(projet.id_projet)}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, projet.id_projet)}
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e) => handleDrop(e, projet.id_projet)}
                                                    onDragEnd={handleDragEnd}
                                                >
                                                    <td 
                                                        className="drag-handle"
                                                        title="Glisser pour réorganiser"
                                                    >
                                                        <FaGripVertical />
                                                    </td>
                                                    <td className='projet-cell'> 
                                                      <div className="flex">
                                                        <div className="projet-info">
                                                          <div className="description-cellProjet projet-nom">{projet.nom}</div>
                                                          <div className="projet-reference">{projet.reference}</div>
                                                          <div className="projet-localisation">
                                                            <FaMapMarkerAlt /> {projet.localisation}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td className="budget-cell">
                                                        <div className="budget-info-compact">
                                                            <div className="budget-amount">{formatCurrency(projet.budget_prevue)}</div>
                                                            <div className="budget-progress">
                                                                <div 
                                                                    className="budget-progress-bar"
                                                                    style={{ 
                                                                        width: `${(projet.budget_depense / projet.budget_prevue) * 100}%`,
                                                                        backgroundColor: projet.budget_depense > projet.budget_prevue ? '#ef4444' : '#10b981'
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="details-cell">
                                                        <button 
                                                            className="action-btn details-btn" 
                                                            title="Voir les détails"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openDetailsModal(projet);
                                                            }}
                                                        >
                                                            <CiSquareInfo />
                                                        </button>
                                                        <button 
                                                            className="action-btn edit-btn" 
                                                            title="Modifier"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openFormModal(projet);
                                                            }}
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button 
                                                            className="action-btn delete-btn" 
                                                            title="Supprimer"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteProjet(projet.id_projet);
                                                            }}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={7} className="no-data">
                                                        Aucun projet trouvé
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {filteredProjets.length > 0 && (
                                    <div className="d-flex tableFooter">
                                        <p>
                                        Affichage de <b>{indexOfFirstItem + 1}</b> à <b>{Math.min(indexOfLastItem, filteredProjets.length)}</b> sur <b>{filteredProjets.length}</b> résultats
                                        </p>
                                        <Pagination
                                        count={totalPages}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="primary"
                                        className="pagination"
                                        showFirstButton
                                        showLastButton
                                        />
                                    </div>
                                )}                                
                            </div>
                        </div>
                    </div>

                    {/* Colonne de droite - Informations du projet */}
                    <div className="projet-info-column">
                        <div className="card shadow border-0 p-3">
                            <ProjetInfoPanel projetId={selectedProjetId} selectedProjet={selectedProjet} />
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <ProjetDetailsModal 
                    projet={selectedProjet} 
                    isOpen={isDetailsModalOpen} 
                    onClose={closeModals}
                    onEdit={() => {
                        setIsDetailsModalOpen(false);
                        setIsFormModalOpen(true);
                    }}
                />
                
                <ProjetFormModal
                    projet={selectedProjet}
                    isOpen={isFormModalOpen}
                    onClose={closeModals}
                    onSave={handleSaveProjet}
                />

                {/* Snackbar pour les notifications */}
                <Snackbar 
                    open={snackbar.open} 
                    autoHideDuration={3000} 
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert 
                        onClose={() => setSnackbar({ ...snackbar, open: false })} 
                        severity={snackbar.severity}
                        variant="filled"
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>

                <footer className="footer">
                    <div className="footer-text">
                        <p>&copy; 2025 par Gestionnaire de Projets | Tous Droits Réservés.</p>
                    </div>
                    <div className="footer-iconTop">
                        <a href="#top" onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}>
                            <GoMoveToTop />
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default ProjetListes;