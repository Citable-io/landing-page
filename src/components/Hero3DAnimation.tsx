/**
 * Hero3DAnimation - Three.js 3D particle network visualization
 * Represents research connections and knowledge flow
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3DAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      velocities[i * 3] = (Math.random() - 0.5) * 0.3;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    (particleGeometry as any).velocities = velocities;

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x1fd068,
      size: 1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Create connection lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    let lineIndex = 0;

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < 40) {
          linePositions[lineIndex * 3] = positions[i * 3];
          linePositions[lineIndex * 3 + 1] = positions[i * 3 + 1];
          linePositions[lineIndex * 3 + 2] = positions[i * 3 + 2];
          lineIndex++;

          linePositions[lineIndex * 3] = positions[j * 3];
          linePositions[lineIndex * 3 + 1] = positions[j * 3 + 1];
          linePositions[lineIndex * 3 + 2] = positions[j * 3 + 2];
          lineIndex++;
        }
      }
    }

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions.slice(0, lineIndex * 3), 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x1fd068,
      transparent: true,
      opacity: 0.2,
      linewidth: 1,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    linesRef.current = lines;

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      // Update particle positions
      const positionAttribute = particleGeometry.getAttribute("position");
      const posArray = positionAttribute.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i * 3];
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];

        // Bounce off boundaries
        if (Math.abs(posArray[i * 3]) > 60) velocities[i * 3] *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 60) velocities[i * 3 + 1] *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 60) velocities[i * 3 + 2] *= -1;
      }

      positionAttribute.needsUpdate = true;

      // Rotate scene
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0003;
      lines.rotation.x += 0.0001;
      lines.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      lineGeometry.dispose();
      particleMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.6,
      }}
    />
  );
}

export default Hero3DAnimation;
