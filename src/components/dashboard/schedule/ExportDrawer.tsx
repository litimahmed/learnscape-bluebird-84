import { useState } from "react";
import { Download, Calendar, Link, Copy, CheckCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ExportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportDrawer({ isOpen, onClose }: ExportDrawerProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock ICS feed URL
  const icsUrl = "https://calendar.example.com/feeds/student-schedule.ics";
  const webcalUrl = icsUrl.replace("https://", "webcal://");

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
      toast({
        title: "Copied to clipboard",
        description: `${type} has been copied to your clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually.",
        variant: "destructive",
      });
    }
  };

  const exportFormats = [
    {
      id: "ics",
      name: "ICS File",
      description: "Download calendar file",
      icon: Download,
      action: () => {
        // Simulate ICS file download
        const element = document.createElement("a");
        element.href = "data:text/calendar;charset=utf8,BEGIN:VCALENDAR..."; // Mock ICS content
        element.download = "schedule.ics";
        element.click();
        toast({
          title: "Download started",
          description: "Your schedule has been downloaded as an ICS file.",
        });
      }
    }
  ];

  const calendarIntegrations = [
    {
      id: "google",
      name: "Google Calendar",
      description: "Subscribe to live updates",
      color: "bg-blue-500",
      url: `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(webcalUrl)}`
    },
    {
      id: "outlook",  
      name: "Outlook",
      description: "Subscribe to live updates",
      color: "bg-orange-500",
      url: `https://outlook.live.com/calendar/0/addcalendar?url=${encodeURIComponent(webcalUrl)}`
    },
    {
      id: "apple",
      name: "Apple Calendar",
      description: "Subscribe to live updates",
      color: "bg-gray-500",
      url: webcalUrl
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[500px] sm:w-[600px] overflow-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Export & Sync Calendar
          </SheetTitle>
          <SheetDescription>
            Export your schedule or sync with external calendar applications.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Quick Export */}
          <div>
            <h4 className="font-medium mb-3">Quick Export</h4>
            <div className="grid gap-3">
              {exportFormats.map((format) => (
                <Card key={format.id} className="cursor-pointer hover:bg-accent/50" onClick={format.action}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <format.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">{format.name}</h5>
                        <p className="text-sm text-muted-foreground">{format.description}</p>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Calendar Integration */}
          <div>
            <h4 className="font-medium mb-3">Calendar Integration</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to your schedule in your favorite calendar app. Updates will sync automatically.
            </p>
            
            <div className="grid gap-3">
              {calendarIntegrations.map((integration) => (
                <Card key={integration.id} className="hover:bg-accent/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${integration.color}`} />
                        <div>
                          <h5 className="font-medium">{integration.name}</h5>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open(integration.url, '_blank')}
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Manual Subscription */}
          <div>
            <h4 className="font-medium mb-3">Manual Subscription</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Copy the calendar URL to subscribe in any calendar application that supports ICS feeds.
            </p>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="ics-url">ICS Feed URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="ics-url"
                    value={icsUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(icsUrl, "ICS URL")}
                  >
                    {copied === "ICS URL" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webcal-url">Webcal URL (for quick subscription)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="webcal-url"
                    value={webcalUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(webcalUrl, "Webcal URL")}
                  >
                    {copied === "Webcal URL" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Export Options */}
          <div>
            <h4 className="font-medium mb-3">Export Options</h4>
            <div className="space-y-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">What's included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Live Sessions</Badge>
                    <Badge variant="secondary">Workshops</Badge>
                    <Badge variant="secondary">Exams</Badge>
                    <Badge variant="secondary">Deadlines</Badge>
                    <Badge variant="secondary">Reviews</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All your scheduled events with complete details including location, instructor, and meeting links.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Sync Frequency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Changes to your schedule will automatically update in subscribed calendars within 15 minutes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h5 className="font-medium mb-2">How to use:</h5>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Choose your preferred calendar application above</li>
              <li>Click "Subscribe" to add the calendar feed</li>
              <li>Your schedule will appear in your calendar app</li>
              <li>Updates will sync automatically</li>
            </ol>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}