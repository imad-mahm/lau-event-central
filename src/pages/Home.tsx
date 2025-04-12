
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter, Upload, Search } from "lucide-react";
import Layout from "@/components/Layout";
import EventCard from "@/components/EventCard";
import { sampleEvents } from "@/lib/sample-data";

const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(sampleEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedClub, setSelectedClub] = useState<string | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique clubs from events
  const clubs = [...new Set(sampleEvents.map(event => event.organizer))];
  
  // Filter events based on search and filters
  useEffect(() => {
    let filtered = [...sampleEvents];
    
    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply date filter
    if (selectedDate) {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      filtered = filtered.filter(event => 
        event.date.startsWith(dateStr)
      );
    }
    
    // Apply club filter
    if (selectedClub) {
      filtered = filtered.filter(event => 
        event.organizer === selectedClub
      );
    }
    
    setEvents(filtered);
  }, [searchQuery, selectedDate, selectedClub]);
  
  const handleUploadTranscript = () => {
    navigate("/transcript");
  };
  
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDate(undefined);
    setSelectedClub(undefined);
  };

  return (
    <Layout>
      <div className="page-container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-lau-green mb-1">Discover Events</h1>
            <p className="text-gray-600">Find and join events happening at LAU</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleUploadTranscript}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Transcript
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for events..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            {(searchQuery || selectedDate || selectedClub) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
              >
                Clear filters
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-md mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Organizing Club</label>
                <Select
                  value={selectedClub}
                  onValueChange={setSelectedClub}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select club" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {clubs.map((club) => (
                        <SelectItem key={club} value={club}>
                          {club}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 mb-4">No events found matching your criteria</p>
            <Button onClick={resetFilters}>View All Events</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
