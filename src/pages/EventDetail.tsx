
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  AlertCircle,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import { sampleEvents } from "@/lib/sample-data";

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<"in-person" | "livestream">("in-person");
  const [isRegistering, setIsRegistering] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  
  const event = sampleEvents.find(e => e.id === id);
  
  if (!event) {
    return (
      <Layout>
        <div className="page-container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/home")}>Return to Home</Button>
        </div>
      </Layout>
    );
  }
  
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long", 
    day: "numeric"
  });
  
  const formattedTime = new Date(`2000-01-01T${event.time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
  
  const handleRegisterClick = () => {
    setRegisterDialogOpen(true);
  };
  
  const handleRegisterSubmit = () => {
    setIsRegistering(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsRegistering(false);
      setRegisterDialogOpen(false);
      setSuccessDialogOpen(true);
    }, 1500);
  };
  
  const handleSuccessClose = () => {
    setSuccessDialogOpen(false);
    toast({
      title: "Registration successful",
      description: `You've registered for ${event.title}`,
    });
    navigate("/my-events");
  };

  return (
    <Layout>
      <div className="bg-lau-green h-64 relative flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(${event.image})`,
          }}
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
          <p className="text-lg text-gray-100">Organized by {event.organizer}</p>
        </div>
      </div>
      
      <div className="page-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">About this event</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {event.description}
                  {'\n\n'}
                  Join us for this exciting event where you'll have the opportunity to learn,
                  network, and engage with experts in the field. This event is designed for students
                  interested in {event.category.toLowerCase()} and provides valuable insights and experiences.
                  {'\n\n'}
                  Don't miss this chance to enhance your knowledge and skills in a supportive environment.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">What to expect</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Expert speakers and industry professionals</li>
                  <li>Networking opportunities with peers and mentors</li>
                  <li>Interactive sessions and hands-on activities</li>
                  <li>Refreshments and snacks will be provided</li>
                  {event.hasLivestream && (
                    <li>Livestream option for remote participation</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 sticky top-24">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Badge>{event.category}</Badge>
                  {event.hasLivestream && (
                    <Badge variant="outline">
                      <Video className="h-3 w-3 mr-1" />
                      Livestream Available
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4 py-4 border-t border-b">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-lau-green" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-gray-600">{formattedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-lau-green" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-gray-600">{formattedTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-lau-green" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-lau-green" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-gray-600">
                        <strong>{event.spotsRemaining}</strong> spots remaining out of {event.capacity}
                      </p>
                    </div>
                  </div>
                </div>
                
                {event.spotsRemaining > 0 ? (
                  <Button 
                    className="w-full lau-gradient" 
                    onClick={handleRegisterClick}
                  >
                    Register Now
                  </Button>
                ) : (
                  <Button className="w-full" disabled>
                    Event Full
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register for {event.title}</DialogTitle>
            <DialogDescription>
              Choose how you would like to attend this event
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup 
              value={registrationType} 
              onValueChange={(value) => setRegistrationType(value as "in-person" | "livestream")}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label htmlFor="in-person" className="flex flex-col cursor-pointer">
                  <span className="font-medium">In-person attendance</span>
                  <span className="text-sm text-gray-500">
                    Attend the event at {event.location}
                  </span>
                </Label>
              </div>
              
              {event.hasLivestream && (
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50">
                  <RadioGroupItem value="livestream" id="livestream" />
                  <Label htmlFor="livestream" className="flex flex-col cursor-pointer">
                    <span className="font-medium">Livestream</span>
                    <span className="text-sm text-gray-500">
                      Join remotely via livestream link
                    </span>
                  </Label>
                </div>
              )}
            </RadioGroup>
            
            {registrationType === "in-person" && event.spotsRemaining < 10 && (
              <div className="flex items-center mt-4 p-3 bg-amber-50 text-amber-800 rounded-md">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">
                  Only {event.spotsRemaining} in-person spots remaining!
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setRegisterDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRegisterSubmit} 
              disabled={isRegistering}
              className="lau-gradient"
            >
              {isRegistering ? "Registering..." : "Confirm Registration"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <Check className="h-5 w-5" />
              Registration Successful
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4">
              You have successfully registered for <strong>{event.title}</strong>.
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Date:</span> {formattedDate}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Time:</span> {formattedTime}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Location:</span> {" "}
              {registrationType === "in-person" ? event.location : "Online (Livestream)"}
            </p>
            <p className="text-sm bg-gray-50 p-3 rounded-md">
              A confirmation email has been sent to your LAU email address with the event details.
            </p>
          </div>
          
          <DialogFooter>
            <Button onClick={handleSuccessClose}>
              View My Events
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default EventDetail;
