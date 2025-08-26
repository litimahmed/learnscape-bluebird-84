import { Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TimezoneChip() {
  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const shortTimezone = currentTimezone.split('/').pop()?.replace('_', ' ') || currentTimezone;

  const commonTimezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Asia/Shanghai", label: "China Standard Time (CST)" },
    { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-accent text-xs font-normal"
        >
          <Globe className="h-3 w-3 mr-1" />
          {shortTimezone}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-1">Timezone Settings</h4>
            <p className="text-xs text-muted-foreground">
              All times are displayed in your selected timezone
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium">Select Timezone</label>
            <Select defaultValue={currentTimezone}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {commonTimezones.map((tz) => (
                  <SelectItem key={tz.value} value={tz.value}>
                    {tz.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Current:</strong> {currentTimezone}
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Local time:</strong> {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" className="text-xs">
              Cancel
            </Button>
            <Button size="sm" className="text-xs">
              Save Changes
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}