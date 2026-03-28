// FitPanel — Mensurations + Score de fit v2

import { useFitMirrorStore } from '../../store/fitMirrorStore'
import type { Mensurations } from '../../types'
import styles from './FitPanel.module.css'

interface SliderProps {
  label: string
  unite: string
  champ: keyof Mensurations
  min: number
  max: number
}

function Slider({ label, unite, champ, min, max }: SliderProps) {
  const valeur = useFitMirrorStore(s => s.mensurations[champ])
  const setMensuration = useFitMirrorStore(s => s.setMensuration)
  const pct = ((valeur - min) / (max - min)) * 100

  return (
    <div className={styles.sliderRow}>
      <div className={styles.sliderHeader}>
        <span className={styles.sliderLabel}>{label}</span>
        <span className={styles.sliderValue}>{valeur}<span className={styles.unite}> {unite}</span></span>
      </div>
      <div className={styles.rangeTrack}>
        <input
          type="range" min={min} max={max} value={valeur}
          onChange={e => setMensuration(champ, Number(e.target.value))}
          className={styles.range}
          style={{
            background: `linear-gradient(to right, #00D4FF ${pct}%, rgba(255,255,255,0.1) ${pct}%)`
          }}
        />
      </div>
      <div className={styles.rangeMinMax}><span>{min}</span><span>{max}</span></div>
    </div>
  )
}

function ScoreBadge() {
  const resultatFit = useFitMirrorStore(s => s.resultatFit)
  if (!resultatFit) return null
  const { score, taille_recommandee, zones } = resultatFit

  const couleur = score >= 80 ? '#22C55E' : score >= 55 ? '#F59E0B' : '#EF4444'
  const labelStatut = (s: string) => s === 'parfait' ? 'Parfait' : s === 'serré' ? 'Trop serré' : 'Trop large'

  return (
    <div className={styles.scoreBadge}>
      <div className={styles.scoreHeader}>
        <span className={styles.scoreLabel}>Score de fit</span>
        <span className={styles.scoreValue} style={{ color: couleur }}>{score}/100</span>
      </div>

      <div className={styles.scoreBar}>
        <div className={styles.scoreBarFill} style={{ width: `${score}%`, background: couleur }} />
      </div>

      <div className={styles.tailleRecommandee}>
        <span>Taille recommandée</span>
        <strong>{taille_recommandee}</strong>
      </div>

      <div className={styles.zones}>
        {zones.map(zone => (
          <div key={zone.nom} className={styles.zone} data-statut={zone.statut}>
            <span className={styles.zoneIcon}>{zone.statut === 'parfait' ? '✓' : '↔'}</span>
            <span className={styles.zoneNom}>{zone.nom}</span>
            <span className={styles.zoneStatut}>{labelStatut(zone.statut)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FitPanel() {
  return (
    <aside className={styles.panel}>
      <h2 className={styles.titre}>Vos mensurations</h2>
      <p className={styles.sousTitre}>Ajustez pour voir le vêtement s'adapter en temps réel</p>
      <div className={styles.sliders}>
        <Slider label="Taille"           unite="cm" champ="taille"    min={155} max={200} />
        <Slider label="Tour de poitrine" unite="cm" champ="poitrine"  min={78}  max={130} />
        <Slider label="Tour de taille"   unite="cm" champ="taille_cm" min={64}  max={115} />
        <Slider label="Largeur épaules"  unite="cm" champ="epaules"   min={36}  max={56}  />
      </div>
      <ScoreBadge />
    </aside>
  )
}
