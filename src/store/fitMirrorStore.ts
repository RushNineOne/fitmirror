// ============================================================
// Store global FitMirror — Zustand
// Gère les mensurations, le produit sélectionné et le résultat du fit
// ============================================================

import { create } from 'zustand'
import type { Mensurations, Produit, ResultatFit, TailleLabel } from '../types'
import { MARQUES, PRODUITS } from '../data/marques'

// ── Calcul du score de fit ───────────────────────────────────

/**
 * Calcule la taille recommandée et le score de fit
 * pour une mensuration donnée et une marque donnée
 */
function calculerFit(mensurations: Mensurations, produit: Produit): ResultatFit {
  const marque = MARQUES.find(m => m.id === produit.marqueId)
  if (!marque) return { taille_recommandee: 'M', score: 0, zones: [] }

  const { poitrine, taille_cm, epaules } = mensurations

  // Trouver la taille la plus adaptée (basée sur la poitrine = mesure prioritaire)
  let meilleureGrille = marque.grille[2] // fallback M
  let meilleurDelta = Infinity

  for (const grille of marque.grille) {
    const centre_poitrine = (grille.poitrine_min + grille.poitrine_max) / 2
    const delta = Math.abs(poitrine - centre_poitrine)
    if (delta < meilleurDelta) {
      meilleurDelta = delta
      meilleureGrille = grille
    }
  }

  // Calculer le statut de chaque zone
  const evaluerZone = (valeur: number, min: number, max: number) => {
    if (valeur < min) return { statut: 'serré' as const, delta: min - valeur }
    if (valeur > max) return { statut: 'large' as const, delta: valeur - max }
    return { statut: 'parfait' as const, delta: 0 }
  }

  const zonePoitrine = evaluerZone(poitrine, meilleureGrille.poitrine_min, meilleureGrille.poitrine_max)
  const zoneTaille   = evaluerZone(taille_cm, meilleureGrille.taille_min,   meilleureGrille.taille_max)
  const zoneEpaules  = evaluerZone(epaules, meilleureGrille.epaules_min,  meilleureGrille.epaules_max)

  // Score global : 100 si tout est parfait, pénalité par cm de décalage
  const penalite = (zonePoitrine.delta * 3) + (zoneTaille.delta * 2) + (zoneEpaules.delta * 4)
  const score = Math.max(0, Math.min(100, Math.round(100 - penalite)))

  return {
    taille_recommandee: meilleureGrille.label as TailleLabel,
    score,
    zones: [
      { nom: 'poitrine', ...zonePoitrine },
      { nom: 'taille',   ...zoneTaille },
      { nom: 'epaules',  ...zoneEpaules },
    ]
  }
}

// ── Définition du store ──────────────────────────────────────

interface FitMirrorStore {
  // Étape d'onboarding
  etape: 'mensurations' | 'catalogue' | 'fitting'
  setEtape: (e: FitMirrorStore['etape']) => void

  // Mensurations utilisateur
  mensurations: Mensurations
  setMensuration: (champ: keyof Mensurations, valeur: number) => void

  // Produit sélectionné
  produitSelectionne: Produit | null
  setProduit: (produit: Produit) => void

  // Résultat du fit (calculé automatiquement)
  resultatFit: ResultatFit | null
}

// Mensurations par défaut (homme M moyen)
const MENSURATIONS_DEFAUT: Mensurations = {
  taille:    178,
  poitrine:  96,
  taille_cm: 82,
  hanches:   98,
  epaules:   44,
}

export const useFitMirrorStore = create<FitMirrorStore>((set, get) => ({
  etape: 'mensurations',
  setEtape: (etape) => set({ etape }),

  mensurations: MENSURATIONS_DEFAUT,
  setMensuration: (champ, valeur) => {
    const nouvellesMensurations = { ...get().mensurations, [champ]: valeur }
    set({ mensurations: nouvellesMensurations })
    // Recalculer le fit si un produit est déjà sélectionné
    const { produitSelectionne } = get()
    if (produitSelectionne) {
      set({ resultatFit: calculerFit(nouvellesMensurations, produitSelectionne) })
    }
  },

  produitSelectionne: PRODUITS[0], // Pré-sélectionner le premier produit
  setProduit: (produit) => {
    set({ produit_selectionne: produit } as any) // TypeScript workaround
    set({ produitSelectionne: produit })
    set({ resultatFit: calculerFit(get().mensurations, produit) })
  },

  resultatFit: calculerFit(MENSURATIONS_DEFAUT, PRODUITS[0]),
}))
