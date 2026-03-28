// Wardrobe v2 — Catalogue marques + produits

import { useState } from 'react'
import { useFitMirrorStore } from '../../store/fitMirrorStore'
import { MARQUES, PRODUITS } from '../../data/marques'
import styles from './Wardrobe.module.css'

export function Wardrobe() {
  const [marqueActive, setMarqueActive] = useState(MARQUES[0].id)
  const { produitSelectionne, setProduit } = useFitMirrorStore()

  const produitsFiltres = PRODUITS.filter(p => p.marqueId === marqueActive)

  return (
    <aside className={styles.panel}>
      <h2 className={styles.titre}>Catalogue</h2>

      <div className={styles.marques}>
        {MARQUES.map(m => (
          <button
            key={m.id}
            className={styles.marqueBouton}
            data-active={m.id === marqueActive}
            onClick={() => {
              setMarqueActive(m.id)
              const premier = PRODUITS.find(p => p.marqueId === m.id)
              if (premier) setProduit(premier)
            }}
            style={{ '--accent': m.couleur } as React.CSSProperties}
          >
            {m.nom}
          </button>
        ))}
      </div>

      <div className={styles.sep} />

      <div className={styles.produits}>
        {produitsFiltres.map(produit => (
          <button
            key={produit.id}
            className={styles.produitCard}
            data-active={produit.id === produitSelectionne?.id}
            onClick={() => setProduit(produit)}
          >
            <div className={styles.colorSwatch} style={{ background: produit.couleur }} />
            <div className={styles.produitInfo}>
              <span className={styles.produitNom}>{produit.nom}</span>
              <span className={styles.produitPrix}>{produit.prix} €</span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}
