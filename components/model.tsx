import type { ThreeElements } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

/**
 * Lightweight placeholder 3D model.
 * You can swap the `/assets/3d/duck.glb` with your own GLB/GLTF file anytime.
 */
export default function Model(props: ThreeElements['group']) {
  const { scene } = useGLTF("/assets/3d/duck.glb", true)
  return <primitive object={scene} {...props} />
}

// Pre-load so the hero section appears instantly
useGLTF.preload("/assets/3d/duck.glb")
