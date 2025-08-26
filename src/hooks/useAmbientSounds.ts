import { useState, useEffect, useRef, useCallback } from 'react';

interface AmbientSound {
  id: string;
  name: string;
  icon: string;
  frequency: number; // Base frequency for generated sound
  type: 'white-noise' | 'brown-noise' | 'rain';
  description: string;
}

const AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: 'warm-noise',
    name: 'Warm Static',
    icon: '◈',
    frequency: 120,
    type: 'brown-noise',
    description: 'Gentle warm static like Figma'
  },
  {
    id: 'subtle-rain',
    name: 'Light Rain',
    icon: '◦',
    frequency: 180,
    type: 'rain',
    description: 'Minimal rainfall ambience'
  },
  {
    id: 'deep-hum',
    name: 'Deep Focus',
    icon: '●',
    frequency: 60,
    type: 'brown-noise',
    description: 'Low frequency hum for deep work'
  },
  {
    id: 'soft-wind',
    name: 'Soft Wind',
    icon: '◐',
    frequency: 200,
    type: 'white-noise',
    description: 'Gentle air movement'
  }
];

export const useAmbientSounds = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState<AmbientSound | null>(null);
  const [volume, setVolume] = useState(0.3);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Initialize audio context
  useEffect(() => {
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    // Create audio context on user interaction
    const handleUserInteraction = () => {
      initAudioContext();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSound();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Generate different types of ambient sounds
  const generateAmbientSound = useCallback(async (sound: AmbientSound) => {
    if (!audioContextRef.current) return null;

    const context = audioContextRef.current;
    const bufferSize = context.sampleRate * 2; // 2 seconds of audio
    const buffer = context.createBuffer(2, bufferSize, context.sampleRate);

    // Fill buffer with generated sound based on type
    for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      
      switch (sound.type) {
        case 'white-noise':
          for (let i = 0; i < bufferSize; i++) {
            channelData[i] = (Math.random() * 2 - 1) * 0.15;
          }
          break;
          
        case 'brown-noise':
          let lastOut = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            const brown = (lastOut + (0.015 * white)) / 1.015;
            lastOut = brown;
            channelData[i] = brown * 1.5;
          }
          break;
          
        case 'rain':
          for (let i = 0; i < bufferSize; i++) {
            const noise = (Math.random() * 2 - 1) * 0.08;
            const filtered = noise * (1 + Math.sin(i * 0.003) * 0.3);
            channelData[i] = filtered;
          }
          break;
          
        default:
          for (let i = 0; i < bufferSize; i++) {
            channelData[i] = (Math.random() * 2 - 1) * 0.15;
          }
      }
    }

    return buffer;
  }, []);

  const playSound = useCallback(async (sound: AmbientSound) => {
    if (!audioContextRef.current) return;

    try {
      // Stop current sound
      stopSound();

      const context = audioContextRef.current;
      
      // Resume context if suspended
      if (context.state === 'suspended') {
        await context.resume();
      }

      // Generate ambient sound buffer
      const buffer = await generateAmbientSound(sound);
      if (!buffer) return;

      // Create audio nodes
      const source = context.createBufferSource();
      const gainNode = context.createGain();

      source.buffer = buffer;
      source.loop = true; // Loop the ambient sound

      // Connect nodes
      source.connect(gainNode);
      gainNode.connect(context.destination);

      // Set volume
      gainNode.gain.setValueAtTime(volume, context.currentTime);

      // Start playing
      source.start();

      // Store references
      sourceNodeRef.current = source;
      gainNodeRef.current = gainNode;

      setCurrentSound(sound);
      setIsPlaying(true);

    } catch (error) {
      console.error('Error playing ambient sound:', error);
    }
  }, [volume, generateAmbientSound]);

  const stopSound = useCallback(() => {
    try {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
      
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }

      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }

      setIsPlaying(false);
      setCurrentSound(null);
    } catch (error) {
      console.error('Error stopping ambient sound:', error);
    }
  }, []);

  const toggleSound = useCallback((sound: AmbientSound) => {
    if (isPlaying && currentSound?.id === sound.id) {
      stopSound();
    } else {
      playSound(sound);
    }
  }, [isPlaying, currentSound, playSound, stopSound]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVolume, audioContextRef.current.currentTime);
    }
  }, []);

  return {
    sounds: AMBIENT_SOUNDS,
    isPlaying,
    currentSound,
    volume,
    playSound,
    stopSound,
    toggleSound,
    changeVolume,
  };
};