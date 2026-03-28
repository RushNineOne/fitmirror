// ============================================================
// Données POC : grilles de tailles de 3 marques fictives
// Source : simulées d'après des données réelles de marques FR
// ============================================================

import type { Marque, Produit } from '../types'

export const MARQUES: Marque[] = [
  {
    id: 'nova',
    nom: 'NOVA Studio',
    couleur: '#00D4FF',
    grille: [
      { label: 'XS', poitrine_min: 82, poitrine_max: 86, taille_min: 66, taille_max: 70, epaules_min: 40, epaules_max: 41 },
      { label: 'S',  poitrine_min: 86, poitrine_max: 90, taille_min: 70, taille_max: 74, epaules_min: 41, epaules_max: 43 },
      { label: 'M',  poitrine_min: 90, poitrine_max: 96, taille_min: 74, taille_max: 80, epaules_min: 43, epaules_max: 45 },
      { label: 'L',  poitrine_min: 96, poitrine_max: 102,taille_min: 80, taille_max: 86, epaules_min: 45, epaules_max: 47 },
      { label: 'XL', poitrine_min: 102,poitrine_max: 110,taille_min: 86, taille_max: 94, epaules_min: 47, epaules_max: 49 },
      { label: 'XXL',poitrine_min: 110,poitrine_max: 120,taille_min: 94, taille_max: 104,epaules_min: 49, epaules_max: 52 },
    ]
  },
  {
    id: 'brut',
    nom: 'Brut Paris',
    couleur: '#FF4D1C',
    // Coupe slim — tailles plus petites
    grille: [
      { label: 'XS', poitrine_min: 80, poitrine_max: 84, taille_min: 64, taille_max: 68, epaules_min: 39, epaules_max: 40 },
      { label: 'S',  poitrine_min: 84, poitrine_max: 88, taille_min: 68, taille_max: 72, epaules_min: 40, epaules_max: 42 },
      { label: 'M',  poitrine_min: 88, poitrine_max: 94, taille_min: 72, taille_max: 78, epaules_min: 42, epaules_max: 44 },
      { label: 'L',  poitrine_min: 94, poitrine_max: 100,taille_min: 78, taille_max: 84, epaules_min: 44, epaules_max: 46 },
      { label: 'XL', poitrine_min: 100,poitrine_max: 108,taille_min: 84, taille_max: 92, epaules_min: 46, epaules_max: 48 },
      { label: 'XXL',poitrine_min: 108,poitrine_max: 118,taille_min: 92, taille_max: 102,epaules_min: 48, epaules_max: 51 },
    ]
  },
  {
    id: 'forme',
    nom: 'Forme & Co',
    couleur: '#22C55E',
    // Coupe oversize — tailles plus généreuses
    grille: [
      { label: 'XS', poitrine_min: 86, poitrine_max: 92, taille_min: 70, taille_max: 76, epaules_min: 42, epaules_max: 44 },
      { label: 'S',  poitrine_min: 92, poitrine_max: 98, taille_min: 76, taille_max: 82, epaules_min: 44, epaules_max: 46 },
      { label: 'M',  poitrine_min: 98, poitrine_max: 104,taille_min: 82, taille_max: 88, epaules_min: 46, epaules_max: 48 },
      { label: 'L',  poitrine_min: 104,poitrine_max: 112,taille_min: 88, taille_max: 96, epaules_min: 48, epaules_max: 50 },
      { label: 'XL', poitrine_min: 112,poitrine_max: 120,taille_min: 96, taille_max: 104,epaules_min: 50, epaules_max: 53 },
      { label: 'XXL',poitrine_min: 120,poitrine_max: 132,taille_min:104, taille_max: 116,epaules_min: 53, epaules_max: 56 },
    ]
  }
]

export const PRODUITS: Produit[] = [
  { id: 'nova-blanc', marqueId: 'nova', nom: 'Essential Blanc', couleur: '#F5F5F0', prix: 39 },
  { id: 'nova-noir',  marqueId: 'nova', nom: 'Essential Noir',  couleur: '#1A1A1A', prix: 39 },
  { id: 'nova-sage',  marqueId: 'nova', nom: 'Essential Sage',  couleur: '#7D9B76', prix: 42 },

  { id: 'brut-blanc', marqueId: 'brut', nom: 'Slim Blanc',  couleur: '#FAFAFA', prix: 55 },
  { id: 'brut-noir',  marqueId: 'brut', nom: 'Slim Noir',   couleur: '#111111', prix: 55 },
  { id: 'brut-rouge', marqueId: 'brut', nom: 'Slim Rouge',  couleur: '#C0392B', prix: 59 },

  { id: 'forme-ecru', marqueId: 'forme', nom: 'Oversized Écru',  couleur: '#EDE8DC', prix: 48 },
  { id: 'forme-kaki', marqueId: 'forme', nom: 'Oversized Kaki',  couleur: '#5C6B3A', prix: 48 },
  { id: 'forme-gris', marqueId: 'forme', nom: 'Oversized Gris',  couleur: '#9CA3AF', prix: 48 },
]
