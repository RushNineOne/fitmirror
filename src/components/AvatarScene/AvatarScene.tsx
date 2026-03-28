// ============================================================
// AvatarScene — Scène 3D principale v2
// Avatar humain procédural amélioré + T-shirt ajusté
// ============================================================

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Sphere, Cylinder, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import type { MorphTargets } from '../../hooks/useAvatarMorphing'
import type { Produit, ResultatFit } from '../../types'

// ── Matériaux partagés ───────────────────────────────────────

const COULEUR_PEAU = '#D4956A'
const COULEUR_PANTALON = '#2C2C3A'

function matPeau() {
  return new THREE.MeshStandardMaterial({ color: COULEUR_PEAU, roughness: 0.75, metalness: 0 })
}
function matPantalon() {
  return new THREE.MeshStandardMaterial({ color: COULEUR_PANTALON, roughness: 0.9, metalness: 0 })
}

// ── Avatar ───────────────────────────────────────────────────

interface AvatarProps {
  morphTargets: MorphTargets
}

function Avatar({ morphTargets }: AvatarProps) {
  const { corpulence, epaulesLargeur, tailleScale } = morphTargets
  const h = tailleScale

  // Dimensions dynamiques
  const tw  = 0.19 + epaulesLargeur * 0.10  // demi-largeur torse
  const td  = 0.11 + corpulence * 0.06       // demi-profondeur torse
  const hw  = 0.16 + corpulence * 0.07       // demi-largeur hanches
  const br  = 0.038 + corpulence * 0.012     // rayon bras
  const cr  = 0.058 + corpulence * 0.018     // rayon cuisse
  const jr  = 0.040 + corpulence * 0.010     // rayon jambe

  const mp = matPeau()
  const mpt = matPantalon()

  return (
    <group scale={[1, h, 1]} position={[0, -0.05, 0]}>

      {/* Tête */}
      <mesh material={mp} position={[0, 1.74, 0]}>
        <sphereGeometry args={[0.105, 24, 24]} />
      </mesh>

      {/* Cou */}
      <mesh material={mp} position={[0, 1.60, 0]}>
        <cylinderGeometry args={[0.042, 0.048, 0.13, 16]} />
      </mesh>

      {/* Torse — RoundedBox pour éviter les angles durs */}
      <mesh material={mp} position={[0, 1.31, 0]}>
        <boxGeometry args={[tw * 2.1, 0.33, td * 2.1]} />
      </mesh>

      {/* Abdomen / taille (légèrement plus étroit) */}
      <mesh material={mp} position={[0, 1.09, 0]}>
        <cylinderGeometry args={[hw * 0.88, tw * 0.92, 0.17, 20]} />
      </mesh>

      {/* Hanches */}
      <mesh material={mpt} position={[0, 0.97, 0]}>
        <boxGeometry args={[hw * 2.1, 0.13, td * 2.0]} />
      </mesh>

      {/* Bras gauche — haut */}
      <mesh material={mp} position={[-(tw + br + 0.008), 1.36, 0]} rotation={[0,0, 0.12]}>
        <cylinderGeometry args={[br*0.88, br, 0.27, 14]} />
      </mesh>
      {/* Bras gauche — bas */}
      <mesh material={mp} position={[-(tw + br + 0.015), 1.08, 0]}>
        <cylinderGeometry args={[br*0.78, br*0.88, 0.25, 14]} />
      </mesh>
      {/* Main gauche */}
      <mesh material={mp} position={[-(tw + br + 0.015), 0.91, 0]}>
        <sphereGeometry args={[br*0.82, 10, 10]} />
      </mesh>

      {/* Bras droit — haut */}
      <mesh material={mp} position={[(tw + br + 0.008), 1.36, 0]} rotation={[0,0,-0.12]}>
        <cylinderGeometry args={[br*0.88, br, 0.27, 14]} />
      </mesh>
      {/* Bras droit — bas */}
      <mesh material={mp} position={[(tw + br + 0.015), 1.08, 0]}>
        <cylinderGeometry args={[br*0.78, br*0.88, 0.25, 14]} />
      </mesh>
      {/* Main droite */}
      <mesh material={mp} position={[(tw + br + 0.015), 0.91, 0]}>
        <sphereGeometry args={[br*0.82, 10, 10]} />
      </mesh>

      {/* Cuisse gauche */}
      <mesh material={mpt} position={[-0.088, 0.76, 0]}>
        <cylinderGeometry args={[cr*0.82, cr, 0.33, 14]} />
      </mesh>
      {/* Jambe gauche */}
      <mesh material={mpt} position={[-0.082, 0.46, 0]}>
        <cylinderGeometry args={[jr, cr*0.82, 0.31, 14]} />
      </mesh>
      {/* Pied gauche */}
      <mesh material={mp} position={[-0.082, 0.28, 0.038]}>
        <boxGeometry args={[0.075, 0.048, 0.17]} />
      </mesh>

      {/* Cuisse droite */}
      <mesh material={mpt} position={[0.088, 0.76, 0]}>
        <cylinderGeometry args={[cr*0.82, cr, 0.33, 14]} />
      </mesh>
      {/* Jambe droite */}
      <mesh material={mpt} position={[0.082, 0.46, 0]}>
        <cylinderGeometry args={[jr, cr*0.82, 0.31, 14]} />
      </mesh>
      {/* Pied droit */}
      <mesh material={mp} position={[0.082, 0.28, 0.038]}>
        <boxGeometry args={[0.075, 0.048, 0.17]} />
      </mesh>

    </group>
  )
}

// ── T-Shirt ──────────────────────────────────────────────────

interface TShirtProps {
  morphTargets: MorphTargets
  produit: Produit
  resultatFit: ResultatFit | null
}

function TShirt({ morphTargets, produit, resultatFit }: TShirtProps) {
  const { corpulence, epaulesLargeur, tailleScale } = morphTargets
  const h = tailleScale

  // T-shirt légèrement plus grand que le corps (épaisseur tissu)
  const marge = 0.013
  const tw = 0.19 + epaulesLargeur * 0.10 + marge
  const td = 0.11 + corpulence * 0.06 + marge
  const hw = 0.16 + corpulence * 0.07 + marge
  const br = 0.038 + corpulence * 0.012 + marge * 0.5

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: produit.couleur,
    roughness: 0.88,
    metalness: 0,
    side: THREE.DoubleSide,
  }), [produit.couleur])

  return (
    <group scale={[1, h, 1]} position={[0, -0.05, 0]}>

      {/* Corps principal du t-shirt */}
      <mesh material={mat} position={[0, 1.305, 0]}>
        <boxGeometry args={[tw * 2.12, 0.355, td * 2.12]} />
      </mesh>

      {/* Bas du t-shirt (couvre la taille) */}
      <mesh material={mat} position={[0, 1.10, 0]}>
        <cylinderGeometry args={[hw * 0.96, tw * 0.95, 0.19, 20]} />
      </mesh>

      {/* Manche gauche */}
      <mesh material={mat} position={[-(tw + br + 0.005), 1.40, 0]} rotation={[0,0,0.12]}>
        <cylinderGeometry args={[br*1.05, br*1.1, 0.20, 14]} />
      </mesh>

      {/* Manche droite */}
      <mesh material={mat} position={[(tw + br + 0.005), 1.40, 0]} rotation={[0,0,-0.12]}>
        <cylinderGeometry args={[br*1.05, br*1.1, 0.20, 14]} />
      </mesh>

      {/* Col */}
      <mesh material={mat} position={[0, 1.495, 0]}>
        <torusGeometry args={[0.068, 0.014, 10, 28]} />
      </mesh>

    </group>
  )
}

// ── Scène principale ─────────────────────────────────────────

interface AvatarSceneProps {
  morphTargets: MorphTargets
  produit: Produit | null
  resultatFit: ResultatFit | null
  autoRotate?: boolean
}

export function AvatarScene({ morphTargets, produit, resultatFit, autoRotate = false }: AvatarSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.0, 2.4], fov: 42 }}
      style={{ background: 'transparent' }}
      shadows
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 5, 3]} intensity={1.3} castShadow />
      <directionalLight position={[-3, 2, -1]} intensity={0.35} color="#aac8ff" />
      <pointLight position={[0, 2, 1.5]} intensity={0.3} color="#ffffff" />

      <group position={[0, -0.92, 0]}>
        <Avatar morphTargets={morphTargets} />
        {produit && (
          <TShirt morphTargets={morphTargets} produit={produit} resultatFit={resultatFit} />
        )}
      </group>

      <ContactShadows position={[0, -0.92, 0]} opacity={0.45} scale={2.5} blur={2.5} />

      <OrbitControls
        enablePan={false}
        minDistance={1.0}
        maxDistance={4.5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.7}
        autoRotate={autoRotate}
        autoRotateSpeed={1.2}
        target={[0, 0.2, 0]}
      />
    </Canvas>
  )
}
