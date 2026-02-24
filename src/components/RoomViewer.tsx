'use client';

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';

function RoomModel({ roomType }: { roomType: string }) {
    const colors: Record<string, string> = {
        deluxe: '#C9A96E',
        suite: '#8B7355',
        presidential: '#D4AF37',
    };
    const color = colors[roomType] || '#C9A96E';

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
                <planeGeometry args={[8, 6]} />
                <meshStandardMaterial color="#2C1810" roughness={0.3} metalness={0.1} />
            </mesh>

            {/* Walls */}
            <mesh position={[0, 1.5, -3]} receiveShadow>
                <boxGeometry args={[8, 5, 0.1]} />
                <meshStandardMaterial color="#F5F0EB" roughness={0.8} />
            </mesh>
            <mesh position={[-4, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <boxGeometry args={[6, 5, 0.1]} />
                <meshStandardMaterial color="#F0EBE4" roughness={0.8} />
            </mesh>

            {/* Bed */}
            <Float speed={0.5} floatIntensity={0.1}>
                <group position={[0, -0.2, -1]}>
                    {/* Bed frame */}
                    <mesh position={[0, 0, 0]} castShadow>
                        <boxGeometry args={[3, 0.6, 2.2]} />
                        <meshStandardMaterial color="#1A1A2E" roughness={0.6} />
                    </mesh>
                    {/* Mattress */}
                    <mesh position={[0, 0.4, 0]} castShadow>
                        <boxGeometry args={[2.8, 0.3, 2]} />
                        <meshStandardMaterial color="white" roughness={0.9} />
                    </mesh>
                    {/* Pillows */}
                    <mesh position={[-0.6, 0.65, -0.7]} castShadow>
                        <boxGeometry args={[0.8, 0.15, 0.4]} />
                        <meshStandardMaterial color={color} roughness={0.8} />
                    </mesh>
                    <mesh position={[0.6, 0.65, -0.7]} castShadow>
                        <boxGeometry args={[0.8, 0.15, 0.4]} />
                        <meshStandardMaterial color={color} roughness={0.8} />
                    </mesh>
                    {/* Headboard */}
                    <mesh position={[0, 1, -1]} castShadow>
                        <boxGeometry args={[3.2, 1.5, 0.15]} />
                        <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} />
                    </mesh>
                </group>
            </Float>

            {/* Nightstands */}
            <mesh position={[-2, -0.4, -1]} castShadow>
                <boxGeometry args={[0.6, 0.8, 0.5]} />
                <meshStandardMaterial color="#2C1810" roughness={0.5} />
            </mesh>
            <mesh position={[2, -0.4, -1]} castShadow>
                <boxGeometry args={[0.6, 0.8, 0.5]} />
                <meshStandardMaterial color="#2C1810" roughness={0.5} />
            </mesh>

            {/* Lamps */}
            {[-2, 2].map(x => (
                <group key={x} position={[x, 0.3, -1]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.05, 0.05, 0.4]} />
                        <meshStandardMaterial color="#C9A96E" metalness={0.8} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 0.3, 0]}>
                        <cylinderGeometry args={[0.15, 0.2, 0.3]} />
                        <meshStandardMaterial color="#FFF8E7" roughness={0.9} emissive="#FFF8E7" emissiveIntensity={0.3} />
                    </mesh>
                </group>
            ))}

            {/* Sofa / seating area */}
            <group position={[2.5, -0.6, 1.5]}>
                <mesh castShadow>
                    <boxGeometry args={[1.2, 0.6, 0.8]} />
                    <meshStandardMaterial color="#334155" roughness={0.7} />
                </mesh>
                <mesh position={[0, 0.45, -0.3]} castShadow>
                    <boxGeometry args={[1.2, 0.4, 0.2]} />
                    <meshStandardMaterial color="#334155" roughness={0.7} />
                </mesh>
            </group>

            {/* Artwork on wall */}
            <mesh position={[0, 2.2, -2.9]}>
                <boxGeometry args={[1.6, 1, 0.05]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
            </mesh>
        </group>
    );
}

export default function RoomViewer() {
    const [roomType, setRoomType] = useState('deluxe');
    const [lighting, setLighting] = useState<'sunset' | 'studio' | 'night'>('sunset');

    const lightingPresets: Record<string, { intensity: number; color: string; env: string }> = {
        sunset: { intensity: 1, color: '#FFE4B5', env: 'sunset' },
        studio: { intensity: 1.2, color: '#FFFFFF', env: 'studio' },
        night: { intensity: 0.4, color: '#4169E1', env: 'night' },
    };

    const currentLight = lightingPresets[lighting];

    return (
        <div style={{
            background: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
        }}>
            {/* Controls */}
            <div style={{
                padding: 'var(--space-md) var(--space-lg)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 'var(--space-md)',
            }}>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, marginRight: '0.5rem' }}>Habitación:</span>
                    {['deluxe', 'suite', 'presidential'].map(t => (
                        <button
                            key={t}
                            className={`btn btn-sm ${roomType === t ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setRoomType(t)}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, marginRight: '0.5rem' }}>Iluminación:</span>
                    {[
                        { key: 'sunset', label: '🌅 Atardecer' },
                        { key: 'studio', label: '💡 Día' },
                        { key: 'night', label: '🌙 Noche' },
                    ].map(l => (
                        <button
                            key={l.key}
                            className={`btn btn-sm ${lighting === l.key ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setLighting(l.key as typeof lighting)}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3D Canvas */}
            <div style={{ height: 500, background: lighting === 'night' ? '#0A1628' : '#F5F0EB', transition: 'background 0.5s' }}>
                <Suspense fallback={
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="spinner" />
                    </div>
                }>
                    <Canvas
                        shadows
                        camera={{ position: [5, 4, 5], fov: 50 }}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <ambientLight intensity={currentLight.intensity * 0.3} color={currentLight.color} />
                        <directionalLight
                            position={[5, 8, 3]}
                            intensity={currentLight.intensity}
                            color={currentLight.color}
                            castShadow
                            shadow-mapSize={[1024, 1024]}
                        />
                        <pointLight position={[-2, 3, 2]} intensity={currentLight.intensity * 0.5} color={currentLight.color} />
                        <RoomModel roomType={roomType} />
                        <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} />
                        <Environment preset={currentLight.env as 'sunset' | 'studio' | 'night'} />
                        <OrbitControls
                            enablePan={false}
                            minDistance={3}
                            maxDistance={12}
                            minPolarAngle={Math.PI / 6}
                            maxPolarAngle={Math.PI / 2.2}
                            autoRotate
                            autoRotateSpeed={0.5}
                        />
                    </Canvas>
                </Suspense>
            </div>

            <div style={{
                padding: 'var(--space-md) var(--space-lg)',
                borderTop: '1px solid var(--color-border)',
                textAlign: 'center',
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
            }}>
                🖱 Arrastra para rotar • Scroll para zoom • Doble-click para centrar
            </div>
        </div>
    );
}
