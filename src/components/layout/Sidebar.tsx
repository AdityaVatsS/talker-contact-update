import { Link, useLocation } from "react-router-dom";
import {
  Bot,
  LayoutDashboard,
  Clock,
  BarChart2,
  PhoneCall,
  CreditCard,
  Key,
  Webhook,
  Database,
  HelpCircle,
  ChevronLeft,
  Phone,
  ExternalLink,
  Leaf,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const NavItem = ({
  to,
  icon: Icon,
  label,
  isActive,
  isNew = false,
  isComingSoon = false
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  isNew?: boolean;
  isComingSoon?: boolean;
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-md transition-all duration-200 font-medium text-sm",
        isActive && "bg-black text-white"
      )}
    >
      <Icon size={20} className={isActive ? "text-white" : "text-gray-500"} />
      <span>{label}</span>
      {isNew && (
        <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded ml-auto">
          NEW
        </span>
      )}
      {isComingSoon && (
        <span className="bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded ml-auto">
          COMING SOON
        </span>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    // Logout logic would go here
    console.log("Logout clicked");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, isNew: false },
    { to: "/voice-agents", label: "Agents", icon: Bot, isNew: false },
    { to: "/knowledge-base", label: "Knowledge Base", icon: Database, isNew: false },
    { to: "/phone-numbers", label: "Phone Numbers", icon: Phone, isNew: false },
    { to: "/batch-call", label: "Batch Call", icon: PhoneCall, isNew: false },
    { to: "/call-history", label: "Call History", icon: Clock, isNew: false },
    { to: "/analytics", label: "Analytics", icon: BarChart2, isNew: false },
    { to: "/billing", label: "Billing", icon: CreditCard, isNew: false },
    { to: "/api-keys", label: "API Keys", icon: Key, isNew: false },
    { to: "/webhooks", label: "Webhooks", icon: Webhook, isNew: false },
  ];

  return (
    <div className="w-[280px] bg-white border-r border-gray-100 h-screen flex flex-col fixed left-0 top-0">
      {/* Header with logo and collapse button */}
      <div className="px-4 h-16 flex items-center justify-between border-b border-gray-100">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="flex items-center">
            <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM30 22.5C30 26.642 26.642 30 22.5 30H17.5C13.358 30 10 26.642 10 22.5V17.5C10 13.358 13.358 10 17.5 10H22.5C26.642 10 30 13.358 30 17.5V22.5Z" fill="#8B5CF6"/>
              <path d="M23.75 15C22.231 15 21 16.231 21 17.75C21 19.269 22.231 20.5 23.75 20.5C25.269 20.5 26.5 19.269 26.5 17.75C26.5 16.231 25.269 15 23.75 15Z" fill="#8B5CF6"/>
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-900">TalkerIQ</span>
          </div>
        </Link>
        <button className="text-gray-400">
          <ChevronLeft className="rotate-90" size={18} />
        </button>
      </div>

      {/* Navigation menu */}
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="flex flex-col gap-1 px-2">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.to)}
              isNew={item.isNew}
            />
          ))}
        </nav>
      </div>

      {/* Free trial section */}
      <div className="p-4 border-t border-gray-100">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Leaf size={18} className="text-gray-500" />
            <span className="text-gray-700 font-medium">Free Trial</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining:</span>
              <span className="font-medium">54:27 minutes</span>
            </div>
            <Progress value={40} className="h-2 bg-gray-200" />
            <Button className="bg-black text-white hover:bg-gray-800 w-full">
              <ExternalLink size={16} />
              Add Payment
            </Button>
          </div>
        </div>
      </div>

      {/* User profile */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="border border-gray-200 rounded-lg p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-700 truncate max-w-[180px]">
              user@example.com
            </span>
          </div>
          <button onClick={handleLogout} className="text-gray-400 hover:text-red-500">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Help center link */}
      <div className="px-4 py-4">
        <NavItem
          to="/help-center"
          icon={HelpCircle}
          label="Help Center"
          isActive={isActive("/help-center")}
        />
      </div>
    </div>
  );
};

export default Sidebar;