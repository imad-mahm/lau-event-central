
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  FileUp,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  Download
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import EventCard from "@/components/EventCard";
import { sampleEvents } from "@/lib/sample-data";

const Transcript = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [recommendedEvents, setRecommendedEvents] = useState<typeof sampleEvents>([]);
  const [analyzedCourses, setAnalyzedCourses] = useState<string[]>([]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      setIsProcessing(true);
      
      // Simulate transcript analysis
      setTimeout(() => {
        setIsProcessing(false);
        setIsAnalyzed(true);
        
        // Sample courses that would be extracted from transcript
        setAnalyzedCourses([
          "CSC245 - Object-Oriented Programming",
          "CSC310 - Algorithms and Data Structures",
          "MTH201 - Calculus III",
          "PHY201 - Electricity and Magnetism",
          "BUS202 - Principles of Marketing",
          "ENG202 - Advanced Academic English"
        ]);
        
        // Filter events related to analyzed courses
        const filtered = sampleEvents.filter(event => 
          event.title.includes("Programming") || 
          event.title.includes("Technology") ||
          event.category === "Computer Science" ||
          event.category === "Engineering"
        );
        
        setRecommendedEvents(filtered);
        
        toast({
          title: "Analysis complete",
          description: "We've found some events based on your courses!"
        });
      }, 3000);
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="page-container py-8">
        <h1 className="text-3xl font-bold text-lau-green mb-2">Transcript Analysis</h1>
        <p className="text-gray-600 mb-8">
          Upload your transcript to get personalized event recommendations based on your courses
        </p>
        
        <Tabs defaultValue={isAnalyzed ? "recommendations" : "upload"}>
          <TabsList className="mb-6">
            <TabsTrigger value="upload">Upload Transcript</TabsTrigger>
            <TabsTrigger value="recommendations" disabled={!isAnalyzed}>
              Recommendations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload your transcript</CardTitle>
                    <CardDescription>
                      Please upload your LAU transcript as a PDF file
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div 
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                          ${file ? "border-green-500 bg-green-50" : "hover:bg-gray-50"}`}
                        onClick={handleUploadClick}
                      >
                        <input 
                          type="file" 
                          className="hidden" 
                          ref={fileInputRef} 
                          onChange={handleFileChange}
                          accept=".pdf"
                        />
                        
                        {file ? (
                          <div className="flex flex-col items-center">
                            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                            <p className="font-medium mb-1">File selected</p>
                            <p className="text-sm text-gray-500 mb-3">{file.name}</p>
                            <p className="text-xs text-gray-400">Click to change file</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <FileUp className="h-12 w-12 text-gray-400 mb-4" />
                            <p className="font-medium mb-1">Drag and drop your file here</p>
                            <p className="text-sm text-gray-500">or click to browse files</p>
                          </div>
                        )}
                      </div>
                      
                      {isProcessing && (
                        <Alert>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <AlertTitle>Processing transcript</AlertTitle>
                          <AlertDescription>
                            We're analyzing your courses to find relevant events. This may take a moment...
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={!file || isUploading || isProcessing} 
                          className="lau-gradient"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            "Analyze Transcript"
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-lau-green mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">How to get your transcript</h4>
                        <p className="text-sm text-gray-600">
                          Log into the LAU Portal, go to the Records section, and download your 
                          unofficial transcript as a PDF.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Download className="h-5 w-5 text-lau-green mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">File requirements</h4>
                        <p className="text-sm text-gray-600">
                          The transcript must be in PDF format and should be the official LAU transcript.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-lau-green mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium">Privacy notice</h4>
                        <p className="text-sm text-gray-600">
                          Your transcript data is analyzed securely and not stored permanently. 
                          It's only used to generate recommendations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations">
            {isAnalyzed && (
              <>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Courses Analyzed</CardTitle>
                    <CardDescription>
                      These courses were identified in your transcript
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {analyzedCourses.map(course => (
                        <div 
                          key={course} 
                          className="bg-gray-50 p-3 rounded-md text-sm"
                        >
                          {course}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <h2 className="text-2xl font-bold mb-6">Recommended Events</h2>
                {recommendedEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedEvents.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-xl text-gray-500 mb-4">No matching events found</p>
                    <Button onClick={() => navigate("/home")}>View All Events</Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Transcript;
