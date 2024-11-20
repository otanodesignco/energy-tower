import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Bloom, EffectComposer } from '@react-three/postprocessing'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <div className='webgl-container'>

    <Canvas
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 0, 4, 10 ]
        } }
        shadows
    >   
        <EffectComposer>
            <Bloom
                luminanceThreshold={ 0.5 }
                luminanceSmoothing={0.9}
                intensity={ 1.2 }
                mipmapBlur
            />
        </EffectComposer>

        <ambientLight intensity={ 0.8 } color='#ffffff' />
        <fog attach="fog" args={['#141414', 5, 20]} />
        <Experience />

    </Canvas>
    </div>
)