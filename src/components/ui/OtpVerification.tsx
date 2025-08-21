import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OtpInput } from './OtpInput';
import { Shield, Mail, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface OtpVerificationProps {
  email: string;
  onVerified: () => void;
  onResend?: () => void;
  loading?: boolean;
}

export const OtpVerification = ({ email, onVerified, onResend, loading = false }: OtpVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Code invalide",
        description: "Veuillez saisir un code à 6 chiffres.",
      });
      return;
    }

    setIsVerifying(true);
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Vérification réussie!",
        description: "Votre email a été vérifié avec succès.",
      });

      onVerified();
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast({
        variant: "destructive",
        title: "Code incorrect",
        description: error.message || "Le code de vérification est incorrect ou expiré.",
      });
      setOtp('');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Code renvoyé",
        description: "Un nouveau code de vérification a été envoyé à votre email.",
      });

      setCountdown(60);
      setCanResend(false);
      setOtp('');
      
      if (onResend) {
        onResend();
      }
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de renvoyer le code.",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpComplete = (value: string) => {
    setOtp(value);
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-hero font-bold text-foreground">
            Vérification de l'email
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Nous avons envoyé un code de vérification à 6 chiffres à
          </CardDescription>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Mail className="w-4 h-4 text-primary" />
            <span className="font-medium text-primary">{maskedEmail}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="text-center">
              <label className="block text-sm font-medium text-foreground mb-3">
                Saisissez le code de vérification
              </label>
              <OtpInput
                length={6}
                value={otp}
                onChange={setOtp}
                onComplete={handleOtpComplete}
                disabled={isVerifying || loading}
                autoFocus
                className="mb-4"
              />
            </div>

            <Button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6 || isVerifying || loading}
              className="w-full h-12 font-medium text-base bg-primary hover:bg-primary/90"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Vérification en cours...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Vérifier le code
                </>
              )}
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Vous n'avez pas reçu le code ?
            </p>
            {canResend ? (
              <Button
                variant="ghost"
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-primary hover:text-primary/80 font-medium"
              >
                {isResending ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Renvoyer le code
                  </>
                )}
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Renvoyer dans {countdown}s
              </p>
            )}
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Ce code expirera dans 10 minutes. Si vous ne trouvez pas l'email, 
              vérifiez votre dossier de spam.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};