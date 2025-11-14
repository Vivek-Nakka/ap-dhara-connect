import { CalendarIcon, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { useMasterData } from "@/hooks/useMasterData";

export function GlobalFilterBar() {
  const [language, setLanguage] = useState("en");
  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>({
    from: new Date(),
  });
  const { districts, commodityGroups } = useMasterData();

  return (
    <div className="h-14 border-b bg-card px-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="w-[200px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={(range) => setDateRange(range || { from: new Date() })}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select defaultValue="all">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district.toLowerCase().replace(/ /g, "-")}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Center" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Centers</SelectItem>
            <SelectItem value="center1">Market Center 1</SelectItem>
            <SelectItem value="center2">Market Center 2</SelectItem>
            <SelectItem value="center3">Market Center 3</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Commodity Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {commodityGroups.map((group) => (
              <SelectItem key={group} value={group.toLowerCase().replace(/ /g, "-")}>
                {group}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === "en" ? "te" : "en")}
        className="gap-2"
      >
        <Languages className="h-4 w-4" />
        {language === "en" ? "తెలుగు" : "English"}
      </Button>
    </div>
  );
}
