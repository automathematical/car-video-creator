import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Suspense, useState, useRef } from 'react'
import { ColorPicker } from '../components/ColorPicker'
import { VideoControls } from '../components/VideoControls'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useToast } from '@/hooks/use-toast'
import { Model } from '../components/Datsun'

const Index = () => {
  const [carColor, setCarColor] = useState('#ff0000')
  const [isRecording, setIsRecording] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  const handleColorChange = (color: string) => {
    setCarColor(color)
    toast({
      title: 'Color Updated',
      description: `Car color changed to ${color}`,
    })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden'>
      {/* Header */}
      <header className='absolute top-0 left-0 right-0 z-10 p-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-white tracking-tight'>Car Configurator</h1>
          <div className='text-sm text-gray-400'>3D Interactive Experience</div>
        </div>
      </header>

      {/* Main Content */}
      <div className='relative w-full h-screen'>
        {/* 3D Canvas */}
        <Canvas
          ref={canvasRef}
          camera={{ position: [4, 2, 6], fov: 50 }}
          shadows
          className='w-full h-full'>
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
              shadow-mapSize={2048}
            />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.5}
            />

            {/* Environment */}
            <Environment preset='city' />

            {/* Datsun Model */}
            <Model color={carColor} />

            {/* Ground */}
            <ContactShadows
              opacity={0.4}
              scale={10}
              blur={1}
              far={10}
              resolution={256}
              color='#000000'
            />

            {/* Controls */}
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={12}
              maxPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>

        {/* Loading Overlay */}
        <Suspense fallback={<LoadingSpinner />}>
          <div />
        </Suspense>

        {/* Color Picker */}
        <div className='absolute left-6 top-1/2 transform -translate-y-1/2 z-20'>
          <ColorPicker
            currentColor={carColor}
            onColorChange={handleColorChange}
          />
        </div>

        {/* Video Controls */}
        <div className='absolute right-6 bottom-6 z-20'>
          <VideoControls
            canvasRef={canvasRef}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            carColor={carColor}
          />
        </div>

        {/* Mobile Instructions */}
        <div className='absolute bottom-6 left-6 text-gray-400 text-sm md:hidden'>
          <p>Pinch to zoom • Drag to rotate</p>
        </div>
      </div>
    </div>
  )
}

export default Index
