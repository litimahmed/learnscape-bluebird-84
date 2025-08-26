import { useState, useEffect, useRef, useCallback } from 'react';

interface AmbientSound {
  id: string;
  name: string;
  icon: string;
  frequency: number; // Base frequency for generated sound
  type: 'white-noise' | 'brown-noise' | 'rain' | 'forest' | 'cafe' | 'ocean';
  description: string;
}

const AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: 'white-noise',
    name: 'White Noise',
    icon: '🌊',
    frequency: 200,
    type: 'white-noise',
    description: 'Classic white noise for concentration'
  },
  {
    id: 'brown-noise',
    name: 'Brown Noise',
    icon: '🎵',
    frequency: 100,
    type: 'brown-noise',
    description: 'Deeper, warmer noise for relaxation'
  },
  {
    id: 'rain',
    name: 'Rain Sounds',
    icon: '🌧️',
    frequency: 150,
    type: 'rain',
    description: 'Gentle rainfall for focus'
  },
  {
    id: 'forest',
    name: 'Forest Ambience',
    icon: '🌲',
    frequency: 300,
    type: 'forest',
    description: 'Nature sounds with birds and wind'
  },
  {
    id: 'cafe',
    name: 'Coffee Shop',
    icon: '☕',
    frequency: 250,
    type: 'cafe',
    description: 'Subtle chatter and coffee shop atmosphere'
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    icon: '🌊',
    frequency: 80,
    type: 'ocean',
    description: 'Calming ocean waves'
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
            channelData[i] = (Math.random() * 2 - 1) * 0.3;
          }
          break;
          
        case 'brown-noise':
          let lastOut = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            const brown = (lastOut + (0.02 * white)) / 1.02;
            lastOut = brown;
            channelData[i] = brown * 3; // Amplify brown noise
          }
          break;
          
        case 'rain':
          for (let i = 0; i < bufferSize; i++) {
            // Simulate rain with filtered noise
            const noise = (Math.random() * 2 - 1) * 0.2;
            const filtered = noise * Math.sin(i * 0.01);
            channelData[i] = filtered;
          }
          break;
          
        case 'forest':
          for (let i = 0; i < bufferSize; i++) {
            // Mix of low frequency noise with occasional higher frequencies
            const lowNoise = (Math.random() * 2 - 1) * 0.1;
            const birdChirp = Math.random() < 0.001 ? Math.sin(i * 0.05) * 0.3 : 0;
            channelData[i] = lowNoise + birdChirp;
          }
          break;
          
        case 'cafe':
          for (let i = 0; i < bufferSize; i++) {
            // Low murmur with occasional peaks
            const murmur = (Math.random() * 2 - 1) * 0.05;
            const chatter = Math.random() < 0.002 ? Math.sin(i * 0.02) * 0.2 : 0;
            channelData[i] = murmur + chatter;
          }
          break;
          
        case 'ocean':
          for (let i = 0; i < bufferSize; i++) {
            // Wave-like pattern with low frequency
            const wave = Math.sin(i * 0.005) * 0.3;
            const noise = (Math.random() * 2 - 1) * 0.1;
            channelData[i] = wave + noise;
          }
          break;
          
        default:
          // Default to white noise
          for (let i = 0; i < bufferSize; i++) {
            channelData[i] = (Math.random() * 2 - 1) * 0.3;
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