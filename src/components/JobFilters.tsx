import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface JobFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  mode: string;
  onModeChange: (value: string) => void;
  experience: string;
  onExperienceChange: (value: string) => void;
  source: string;
  onSourceChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
}

const locations = [
  "All Locations",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Mumbai",
  "Pune",
  "Noida",
  "Gurgaon",
  "Goa",
  "Mysore",
  "Multiple Locations",
];

const modes = ["All Modes", "Remote", "Hybrid", "Onsite"];
const experiences = ["All Experience", "Fresher", "0-1", "1-3", "3-5"];
const sources = ["All Sources", "LinkedIn", "Naukri", "Indeed"];
const sorts = ["Latest", "Oldest"];

const JobFilters = ({
  search,
  onSearchChange,
  location,
  onLocationChange,
  mode,
  onModeChange,
  experience,
  onExperienceChange,
  source,
  onSourceChange,
  sort,
  onSortChange,
}: JobFiltersProps) => {
  return (
    <div className="flex flex-col gap-space-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title or company…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex flex-wrap gap-space-1">
        <Select value={location} onValueChange={onLocationChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {locations.map((l) => (
              <SelectItem key={l} value={l}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={mode} onValueChange={onModeChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {modes.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={experience} onValueChange={onExperienceChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {experiences.map((e) => (
              <SelectItem key={e} value={e}>{e}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={source} onValueChange={onSourceChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sources.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sorts.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobFilters;
