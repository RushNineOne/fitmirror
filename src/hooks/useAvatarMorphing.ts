// ============================================================
// useAvatarMorphing
// Convertit les mensurations (cm) en paramètres de morphing 3D
// Retourne des valeurs normalisées [0-1] pour les morph targets
// ============================================================

import { useMemo } from 'react'
import type { Mensurations } from '../types'

export interface MorphTargets {
  // Corpulence générale
  corpulence: number        // 0 = très mince, 1 = corpulent
  // Zones spécifiques
  poitrineVolume: number    // 0 = plat, 1 = large poitrine
  epaulesLargeur: number    // 0 = épaules étroites, 1 = larges
  // Taille (hauteur globale)
  tailleScale: number       // facteur de scale Y (0.85 à 1.15)
}

/**
 * Normalise une valeur dans un range [min, max] vers [0, 1]
 */
function normaliser(valeur: number, min: number, max: number): number {
  return Math.max(0, Math.min(1, (valeur - min) / (max - min)))
}

export function useAvatarMorphing(mensurations: Mensurations): MorphTargets {
  return useMemo(() => {
    const { taille, poitrine, taille_cm, epaules } = mensurations

    // Corpulence = combinaison poitrine + taille
    // Homme moyen : poitrine 90-100cm, taille 76-88cm
    const corpulencePoitrine = normaliser(poitrine, 80, 120)
    const corpulenceTaille   = normaliser(taille_cm, 68, 110)
    const corpulence = (corpulencePoitrine * 0.6) + (corpulenceTaille * 0.4)

    // Volume poitrine (pecs / muscles)
    const poitrineVolume = normaliser(poitrine, 80, 115)

    // Largeur épaules
    const epaulesLargeur = normaliser(epaules, 38, 54)

    // Scale taille — 160cm = 0.85, 190cm = 1.1
    const tailleScale = 0.85 + (normaliser(taille, 155, 200) * 0.30)

    return {
      corpulence,
      poitrineVolume,
      epaulesLargeur,
      tailleScale,
    }
  }, [mensurations])
}
