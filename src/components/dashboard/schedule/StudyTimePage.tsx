import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
  Clock, 
  Calendar,
  Target,
  Play,
  Pause,
  Square,
  TrendingUp,
  BookOpen,
  Brain,
  Coffee,
  BarChart3,
  Timer,
  Award,
  Flame,
  CheckCircle,
  Settings,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Plus,
  SkipForward,
  RotateCcw,
  Music,
  Zap
} from "lucide-react";
import { format, addDays, startOfWeek, endOfWeek } from "date-fns";
import { cn } from "@/lib/utils";
import { useStudyTimer } from "@/hooks/useStudyTimer";
import { useAmbientSounds } from "@/hooks/useAmbientSounds";
import { useToast } from "@/hooks/use-toast";

export function StudyTimePage() {
  const { toast } = useToast();
  const [selectedTechnique, setSelectedTechnique] = useState<'pomodoro' | 'timeboxing' | 'flowtime'>('pomodoro');
  const [customDuration, setCustomDuration] = useState(25);
  const [customSubject, setCustomSubject] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newSessionOpen, setNewSessionOpen] = useState(false);

  const {
    timeLeft,
    isRunning,
    isPaused,
    currentSession,
    sessionCount,
    totalStudyTime,
    sessions,
    startSession,
    pauseTimer,
    stopTimer,
    skipSession,
    startBreak,
    formatTime,
    getTodaysStats,
    options,
    requestNotificationPermission
  } = useStudyTimer({
    focusDuration: selectedTechnique === 'pomodoro' ? 25 : customDuration,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    soundEnabled: true,
    notificationsEnabled: true,
  });

  const {
    sounds,
    isPlaying: isSoundPlaying,
    currentSound,
    volume,
    toggleSound,
    changeVolume,
    stopSound: stopAmbientSound
  } = useAmbientSounds();

  const todayStats = getTodaysStats();
  const progressPercentage = timeLeft > 0 && currentSession 
    ? ((currentSession.duration * 60 - timeLeft) / (currentSession.duration * 60)) * 100 
    : 0;

  // Request notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  const handleStartSession = (sessionData: any) => {
    startSession({
      ...sessionData,
      technique: selectedTechnique,
      notes: sessionNotes,
    });
    setNewSessionOpen(false);
    setSessionNotes('');
    toast({
      title: "Session Started!",
      description: `Started ${sessionData.duration}min ${sessionData.type} session`,
    });
  };

  const handleQuickStart = (type: 'focus' | 'short-break' | 'long-break', duration: number) => {
    const sessionData = {
      subject: type === 'focus' ? (customSubject || 'Study Session') : 'Break Time',
      duration,
      type,
    };
    handleStartSession(sessionData);
  };

  const getNextBreakType = () => {
    return sessionCount > 0 && sessionCount % 4 === 0 ? 'long-break' : 'short-break';
  };

  const techniques = [
    {
      id: 'pomodoro',
      name: 'Pomodoro',
      description: '25min focus + 5min break',
      icon: '🍅',
      durations: { focus: 25, break: 5 }
    },
    {
      id: 'timeboxing',
      name: 'Timeboxing',
      description: 'Custom time blocks',
      icon: '⏰',
      durations: { focus: customDuration, break: 10 }
    },
    {
      id: 'flowtime',
      name: 'Flowtime',
      description: 'Work until natural break',
      icon: '🌊',
      durations: { focus: 90, break: 15 }
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Timer className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">Study Time</h1>
            </div>
            <Badge variant="secondary" className="font-medium">
              {Math.round(todayStats.totalMinutes / 60 * 10) / 10}h today
            </Badge>
            {sessionCount > 0 && (
              <div className="flex items-center space-x-1 text-orange-500">
                <Flame className="w-4 h-4" />
                <span className="font-medium">{sessionCount} sessions</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Ambient Sound Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => isSoundPlaying ? stopAmbientSound() : toggleSound(sounds[0])}
                className="relative"
              >
                {isSoundPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              {isSoundPlaying && (
                <div className="flex items-center space-x-2 min-w-24">
                  <Slider
                    value={[volume * 100]}
                    onValueChange={([value]) => changeVolume(value / 100)}
                    max={100}
                    step={1}
                    className="w-20"
                  />
                </div>
              )}
            </div>

            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Study Settings</DialogTitle>
                  <DialogDescription>Configure your study preferences</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Study Technique</Label>
                    <Select value={selectedTechnique} onValueChange={(value: any) => setSelectedTechnique(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {techniques.map(technique => (
                          <SelectItem key={technique.id} value={technique.id}>
                            {technique.icon} {technique.name} - {technique.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedTechnique === 'timeboxing' && (
                    <div className="space-y-2">
                      <Label>Custom Duration (minutes)</Label>
                      <Input
                        type="number"
                        value={customDuration}
                        onChange={(e) => setCustomDuration(Number(e.target.value))}
                        min="5"
                        max="180"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label>Default Subject</Label>
                    <Input
                      value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                      placeholder="e.g., React Development"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={newSessionOpen} onOpenChange={setNewSessionOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start New Session</DialogTitle>
                  <DialogDescription>Configure your study session</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input
                      value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                      placeholder="What are you studying?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Session Notes (Optional)</Label>
                    <Textarea
                      value={sessionNotes}
                      onChange={(e) => setSessionNotes(e.target.value)}
                      placeholder="Goals for this session..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => handleStartSession({
                        subject: customSubject || 'Study Session',
                        duration: techniques.find(t => t.id === selectedTechnique)?.durations.focus || 25,
                        type: 'focus'
                      })}
                      className="w-full"
                    >
                      Start Focus Session
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleStartSession({
                        subject: 'Break Time',
                        duration: 5,
                        type: 'short-break'
                      })}
                      className="w-full"
                    >
                      Start Break
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6 min-h-0">
        {/* Left Column - Active Session & Ambient Sounds */}
        <div className="flex-1 space-y-6 min-w-0">
          {/* Active Session Timer */}
          <Card className={cn(
            "transition-all duration-300",
            currentSession?.type === 'focus' && "border-primary/20 bg-primary/5",
            currentSession?.type === 'short-break' && "border-green-500/20 bg-green-50",
            currentSession?.type === 'long-break' && "border-blue-500/20 bg-blue-50"
          )}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {currentSession?.type === 'focus' && <Brain className="w-5 h-5 text-primary" />}
                  {currentSession?.type === 'short-break' && <Coffee className="w-5 h-5 text-green-600" />}
                  {currentSession?.type === 'long-break' && <Coffee className="w-5 h-5 text-blue-600" />}
                  <span>
                    {currentSession?.type === 'focus' && 'Focus Session'}
                    {currentSession?.type === 'short-break' && 'Short Break'}
                    {currentSession?.type === 'long-break' && 'Long Break'}
                    {!currentSession && 'Ready to Study'}
                  </span>
                </div>
                {currentSession && (
                  <Badge variant="outline" className="capitalize">
                    {currentSession.technique}
                  </Badge>
                )}
              </CardTitle>
              {currentSession && (
                <CardDescription>
                  {currentSession.type === 'focus' ? `Studying: ${currentSession.subject}` : 'Time for a well-deserved break'}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {currentSession ? (
                <>
                  {/* Circular Timer Display */}
                  <div className="flex justify-center">
                    <div className="w-48 h-48">
                      <CircularProgressbar
                        value={progressPercentage}
                        text={formatTime(timeLeft)}
                        styles={buildStyles({
                          textColor: currentSession.type === 'focus' ? 'hsl(var(--primary))' : 
                                   currentSession.type === 'short-break' ? '#16a34a' : '#2563eb',
                          pathColor: currentSession.type === 'focus' ? 'hsl(var(--primary))' : 
                                    currentSession.type === 'short-break' ? '#16a34a' : '#2563eb',
                          trailColor: 'hsl(var(--muted))',
                          textSize: '16px',
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Target: {formatTime(currentSession.duration * 60)}
                    </div>
                    {currentSession.notes && (
                      <div className="text-sm bg-muted/50 rounded-lg p-3">
                        <strong>Notes:</strong> {currentSession.notes}
                      </div>
                    )}
                  </div>
                  
                  {/* Session Controls */}
                  <div className="flex justify-center space-x-3">
                    <Button 
                      variant={isRunning && !isPaused ? "secondary" : "default"} 
                      onClick={pauseTimer}
                      className="min-w-24"
                    >
                      {isRunning && !isPaused ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isRunning && !isPaused ? "Pause" : "Resume"}
                    </Button>
                    <Button variant="outline" onClick={skipSession}>
                      <SkipForward className="w-4 h-4 mr-2" />
                      Skip
                    </Button>
                    <Button variant="outline" onClick={stopTimer}>
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Timer className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Ready to focus?</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Choose a study technique and start your productive session.
                    </p>
                    
                    {/* Quick Start Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md mx-auto">
                      {techniques.map(technique => (
                        <Button
                          key={technique.id}
                          variant={selectedTechnique === technique.id ? "default" : "outline"}
                          onClick={() => {
                            setSelectedTechnique(technique.id as any);
                            handleQuickStart('focus', technique.durations.focus);
                          }}
                          className="h-auto p-4 flex flex-col items-center space-y-1"
                        >
                          <span className="text-lg">{technique.icon}</span>
                          <span className="text-xs font-medium">{technique.name}</span>
                          <span className="text-xs text-muted-foreground">{technique.durations.focus}min</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ambient Sounds */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Music className="w-5 h-5" />
                <span>Focus Sounds</span>
              </CardTitle>
              <CardDescription>
                Background sounds to help you concentrate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {sounds.map((sound) => (
                  <Button
                    key={sound.id}
                    variant={currentSound?.id === sound.id ? "default" : "outline"}
                    onClick={() => toggleSound(sound)}
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <span className="text-xl">{sound.icon}</span>
                    <div className="text-center">
                      <div className="text-sm font-medium">{sound.name}</div>
                      <div className="text-xs text-muted-foreground">{sound.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
              
              {isSoundPlaying && currentSound && (
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Now Playing: {currentSound.name}</span>
                    <Button variant="ghost" size="sm" onClick={stopAmbientSound}>
                      <VolumeX className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Volume2 className="w-4 h-4" />
                    <Slider
                      value={[volume * 100]}
                      onValueChange={([value]) => changeVolume(value / 100)}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm w-8">{Math.round(volume * 100)}%</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Quick Actions */}
        <div className="w-80 space-y-6 flex-shrink-0">
          {/* Today's Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Today's Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-primary/5">
                  <div className="text-2xl font-bold text-primary">{Math.round(todayStats.totalMinutes / 60 * 10) / 10}h</div>
                  <div className="text-xs text-muted-foreground">Study Time</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-green-50">
                  <div className="text-2xl font-bold text-green-600">{todayStats.sessionCount}</div>
                  <div className="text-xs text-muted-foreground">Sessions</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Daily Goal</span>
                  <span className="font-medium">{Math.round(todayStats.totalMinutes / 60 * 10) / 10}/4h</span>
                </div>
                <Progress value={(todayStats.totalMinutes / 240) * 100} className="h-2" />
              </div>

              {!currentSession && sessionCount > 0 && (
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      const breakType = getNextBreakType();
                      handleQuickStart(breakType, breakType === 'short-break' ? 5 : 15);
                    }}
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    Start {getNextBreakType() === 'short-break' ? 'Short' : 'Long'} Break
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Timers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Quick Start</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => handleQuickStart('focus', 25)}
                disabled={isRunning}
              >
                <Timer className="w-4 h-4 mr-2" />
                Pomodoro (25min)
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => handleQuickStart('focus', 50)}
                disabled={isRunning}
              >
                <Clock className="w-4 h-4 mr-2" />
                Deep Work (50min)
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => handleQuickStart('focus', 15)}
                disabled={isRunning}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Quick Study (15min)
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => handleQuickStart('short-break', 5)}
                disabled={isRunning}
              >
                <Coffee className="w-4 h-4 mr-2" />
                Short Break (5min)
              </Button>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Recent Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayStats.sessions.slice(-3).reverse().map((session) => (
                <div key={session.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div>
                    <div className="text-sm font-medium">{session.subject}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(session.startTime, 'h:mm a')} • {session.duration}min
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    {session.quality && (
                      <Badge variant="secondary" className="text-xs">
                        {session.quality}/5
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              
              {todayStats.sessions.length === 0 && (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No sessions yet today. Start studying to see your progress!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}