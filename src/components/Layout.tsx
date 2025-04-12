
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Calendar, Home, LogOut, Menu, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, active, onClick }: NavItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-md transition-colors", 
      active 
        ? "bg-lau-green text-white" 
        : "hover:bg-gray-100"
    )}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="page-container h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/home" className="font-bold text-xl text-lau-green flex items-center">
              <span>LEMS</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-1">
              <Button variant="ghost" asChild>
                <Link to="/home" className={cn(
                  location.pathname === "/home" && "bg-secondary"
                )}>
                  Home
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/my-events" className={cn(
                  location.pathname === "/my-events" && "bg-secondary"
                )}>
                  My Events
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/transcript" className={cn(
                  location.pathname === "/transcript" && "bg-secondary"
                )}>
                  Transcript
                </Link>
              </Button>
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="Profile" />
                    <AvatarFallback className="bg-lau-green text-white">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@lau.edu
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex md:hidden">
          <div className="bg-white w-3/4 max-w-sm h-full">
            <div className="p-4 flex justify-between items-center border-b">
              <span className="font-bold text-xl text-lau-green">LEMS</span>
              <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback className="bg-lau-green text-white">JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">john.doe@lau.edu</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <NavItem 
                  to="/home" 
                  icon={<Home className="h-4 w-4" />} 
                  label="Home" 
                  active={location.pathname === "/home"}
                  onClick={closeMobileMenu}
                />
                <NavItem 
                  to="/my-events" 
                  icon={<Calendar className="h-4 w-4" />} 
                  label="My Events" 
                  active={location.pathname === "/my-events"}
                  onClick={closeMobileMenu}
                />
                <NavItem 
                  to="/transcript" 
                  icon={<User className="h-4 w-4" />} 
                  label="Transcript" 
                  active={location.pathname === "/transcript"}
                  onClick={closeMobileMenu}
                />
              </nav>
              
              <div className="mt-auto pt-6 border-t mt-6">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 py-2" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      <footer className="bg-lau-green text-white py-6">
        <div className="page-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">LEMS</span>
              <span className="text-sm text-gray-200">LAU Event Management System</span>
            </div>
            <div className="text-sm text-gray-200">
              © {new Date().getFullYear()} Lebanese American University. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
