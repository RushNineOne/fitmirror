// ============================================================
// Types globaux FitMirror
// ============================================================

/** Mensurations saisies par l'utilisateur (en cm) */
export interface Mensurations {
  taille: number         // hauteur totale, ex: 178
  poitrine: number       // tour de poitrine, ex: 96
  taille_cm: number      // tour de taille, ex: 82
  hanches: number        // tour de hanches, ex: 98
  epaules: number        // largeur épaules, ex: 44
}

/** Tailles disponibles pour un vêtement */
export type TailleLabel = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

/** Données de sizing d'une marque pour une taille donnée */
export interface GrilleTaille {
  label: TailleLabel
  poitrine_min: number
  poitrine_max: number
  taille_min: number
  taille_max: number
  epaules_min: number
  epaules_max: number
}

/** Une marque partenaire */
export interface Marque {
  id: string
  nom: string
  couleur: string          // couleur accent de la marque (hex)
  grille: GrilleTaille[]
}

/** Un produit (T-shirt) du catalogue */
export interface Produit {
  id: string
  marqueId: string
  nom: string
  couleur: string          // couleur du tissu (hex)
  texture?: string         // URL texture optionnelle
  prix: number
}

/** Résultat du calcul de fit */
export interface ResultatFit {
  taille_recommandee: TailleLabel
  score: number            // 0-100, 100 = fit parfait
  zones: ZoneFit[]
}

export interface ZoneFit {
  nom: 'poitrine' | 'taille' | 'epaules'
  statut: 'parfait' | 'serré' | 'large'
  delta: number            // différence en cm vs grille
}
