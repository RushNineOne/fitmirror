// ============================================================
// App — Layout principal FitMirror
// ============================================================

import { Suspense } from 'react'
import { AvatarScene } from './components/AvatarScene/AvatarScene'
import { FitPanel } from './components/FitPanel/FitPanel'
import { Wardrobe } from './components/Wardrobe/Wardrobe'
import { useFitMirrorStore } from './store/fitMirrorStore'
import { useAvatarMorphing } from './hooks/useAvatarMorphing'
import './index.css'

function App() {
  const { mensurations, produitSelectionne, resultatFit } = useFitMirrorStore()
  const morphTargets = useAvatarMorphing(mensurations)

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-fit">Fit</span>
          <span className="logo-mirror">Mirror</span>
          <span className="logo-badge">POC</span>
        </div>
        <nav className="nav">
          <span className="nav-item">Essayage virtuel</span>
          <span className="nav-sep">·</span>
          <span className="nav-item nav-muted">T-shirts homme</span>
        </nav>
      </header>

      {/* Layout principal */}
      <main className="main">
        {/* Panneau gauche : mensurations */}
        <FitPanel />

        {/* Scène 3D centrale */}
        <div className="scene-wrapper">
          <Suspense fallback={<div className="scene-loading">Chargement…</div>}>
            <AvatarScene
              morphTargets={morphTargets}
              produit={produitSelectionne}
              resultatFit={resultatFit}
              autoRotate={false}
            />
          </Suspense>

          {/* Overlay info produit */}
          {produitSelectionne && resultatFit && (
            <div className="scene-overlay">
              <div className="overlay-pill">
                <span className="overlay-brand">
                  {produitSelectionne.marqueId.toUpperCase()}
                </span>
                <span className="overlay-sep">·</span>
                <span>{produitSelectionne.nom}</span>
                <span className="overlay-taille">→ {resultatFit.taille_recommandee}</span>
              </div>
            </div>
          )}

          {/* Hint contrôles */}
          <div className="scene-hint">
            Clic + glisser pour tourner · Scroll pour zoomer
          </div>
        </div>

        {/* Panneau droit : catalogue */}
        <Wardrobe />
      </main>
    </div>
  )
}

export default App
