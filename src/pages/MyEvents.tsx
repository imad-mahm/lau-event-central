
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  ExternalLink, 
  Calendar as CalendarIcon, 
  ChevronRight 
} from "lucide-react";
import Layout from "@/components/Layout";
import { sampleEvents } from "@/lib/sample-data";

const MyEvents = () => {
  const navigate = useNavigate();
  
  // Simulate registered events - normally this would come from an API
  const registeredEvents = [
    {
      ...sampleEvents[0],
      registrationType: "in-person" as const,
      registeredOn: "2023-04-08T14:30:00",
    },
    {
      ...sampleEvents[2],
      registrationType: "livestream" as const,
      registeredOn: "2023-04-10T09:15:00",
    },
  ];
  
  // Simulate past events - normally this would come from an API
  const pastEvents = [
    {
      ...sampleEvents[4],
      registrationType: "in-person" as const,
      registeredOn: "2023-03-15T11:22:00",
      attended: true,
    },
    {
      ...sampleEvents[5],
      registrationType: "livestream" as const,
      registeredOn: "2023-03-01T16:45:00",
      attended: false,
    },
  ];
  
  return (
    <Layout>
      <div className="page-container py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-lau-green mb-2">My Events</h1>
            <p className="text-gray-600">Manage your registered events</p>
          </div>
          
          <Button onClick={() => navigate("/home")}>
            Explore More Events
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({registeredEvents.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastEvents.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="pt-6">
            {registeredEvents.length > 0 ? (
              <div className="space-y-6">
                {registeredEvents.map(event => {
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
                    <div 
                      key={event.id} 
                      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:border-lau-green transition-colors cursor-pointer"
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div 
                          className="w-full md:w-40 h-32 md:h-auto bg-cover bg-center"
                          style={{ backgroundImage: `url(${event.image})` }}
                        />
                        
                        <div className="flex-1 p-4">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge>{event.category}</Badge>
                                {event.registrationType === "livestream" && (
                                  <Badge variant="outline">
                                    <Video className="h-3 w-3 mr-1" />
                                    Livestream
                                  </Badge>
                                )}
                              </div>
                              
                              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                              
                              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {formattedDate}
                                </div>
                                
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {formattedTime}
                                </div>
                                
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  {event.registrationType === "livestream" ? "Online" : event.location}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <Button variant="ghost" size="sm" className="mt-4 md:mt-0">
                                <ChevronRight className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Organized by {event.organizer}
                        </span>
                        
                        <div className="flex gap-3">
                          {event.registrationType === "livestream" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open("#", "_blank");
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Join Livestream
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open("#", "_blank");
                            }}
                          >
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500 mb-4">You haven't registered for any upcoming events yet</p>
                <Button onClick={() => navigate("/home")}>Explore Events</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="pt-6">
            {pastEvents.length > 0 ? (
              <div className="space-y-6">
                {pastEvents.map(event => {
                  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
                    month: "short", 
                    day: "numeric"
                  });
                  
                  return (
                    <div 
                      key={event.id} 
                      className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:border-gray-300 transition-colors cursor-pointer"
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div 
                          className="w-full md:w-40 h-32 md:h-auto bg-cover bg-center grayscale opacity-80"
                          style={{ backgroundImage: `url(${event.image})` }}
                        />
                        
                        <div className="flex-1 p-4">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                              <p className="text-gray-600 text-sm mb-4">
                                <span className="font-medium">{formattedDate}</span> • {event.registrationType === "livestream" ? "Online" : event.location}
                              </p>
                              
                              <div className="flex items-center gap-3">
                                <Badge variant="outline">{event.category}</Badge>
                                <Badge variant={event.attended ? "default" : "destructive"}>
                                  {event.attended ? "Attended" : "Missed"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">You don't have any past events</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyEvents;
