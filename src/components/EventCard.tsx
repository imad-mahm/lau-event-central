
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { EventType } from "@/lib/types";

interface EventCardProps {
  event: EventType;
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short", 
    day: "numeric"
  });
  
  const formattedTime = new Date(`2000-01-01T${event.time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  return (
    <Card 
      className="overflow-hidden card-hover cursor-pointer"
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div 
        className="h-48 bg-cover bg-center" 
        style={{
          backgroundImage: `url(${event.image})`,
        }}
      />
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={event.hasLivestream ? "outline" : "secondary"} className="mb-2">
            {event.category}
          </Badge>
          {event.hasLivestream && (
            <Badge variant="destructive">Livestream</Badge>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <span>{formattedTime}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-500">Organized by {event.organizer}</span>
        <div className="flex items-center text-xs text-gray-500">
          <Users className="h-3.5 w-3.5 mr-1" />
          <span>{event.spotsRemaining} spots left</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
