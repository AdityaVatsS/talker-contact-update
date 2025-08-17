import React, { useState } from 'react';
import { Plus, Search, Filter, Bot, Play, Pause, Settings, MoreVertical, PhoneCall, Clock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive' | 'Training';
  type: 'Sales' | 'Support' | 'General';
  callsToday: number;
  totalCalls: number;
  avgDuration: string;
  lastActive: string;
}

const VoiceAgents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Sales Assistant',
      description: 'Handles inbound sales calls and lead qualification',
      status: 'Active',
      type: 'Sales',
      callsToday: 23,
      totalCalls: 1247,
      avgDuration: '4:32',
      lastActive: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Customer Support',
      description: 'Provides customer support and technical assistance',
      status: 'Active',
      type: 'Support',
      callsToday: 18,
      totalCalls: 892,
      avgDuration: '6:15',
      lastActive: '5 minutes ago'
    },
    {
      id: '3',
      name: 'Lead Qualifier',
      description: 'Qualifies incoming leads and schedules appointments',
      status: 'Inactive',
      type: 'Sales',
      callsToday: 0,
      totalCalls: 456,
      avgDuration: '3:45',
      lastActive: '2 hours ago'
    },
    {
      id: '4',
      name: 'Appointment Setter',
      description: 'Schedules appointments and manages calendar bookings',
      status: 'Training',
      type: 'General',
      callsToday: 5,
      totalCalls: 123,
      avgDuration: '2:18',
      lastActive: '10 minutes ago'
    }
  ]);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || agent.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Training': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalActiveAgents = agents.filter(a => a.status === 'Active').length;
  const totalCallsToday = agents.reduce((sum, a) => sum + a.callsToday, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Voice Agents</h1>
          <p className="text-gray-600 mt-1">Create and manage your AI voice agents</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-black hover:bg-gray-800 text-white">
              <Plus size={16} className="mr-2" />
              Create Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Voice Agent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name">Agent Name</Label>
                <Input placeholder="Enter agent name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agent-type">Agent Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Agent</SelectItem>
                    <SelectItem value="support">Support Agent</SelectItem>
                    <SelectItem value="general">General Purpose</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Describe what this agent will do..." />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white">
                  Create Agent
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveAgents}</div>
            <p className="text-xs text-muted-foreground">Ready to take calls</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls Today</CardTitle>
            <PhoneCall className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCallsToday}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground">-0.3s improvement</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="training">Training</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">{agent.description}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings size={14} className="mr-2" />
                      Configure
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Play size={14} className="mr-2" />
                      Start Agent
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pause size={14} className="mr-2" />
                      Pause Agent
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(agent.status)}>{agent.status}</Badge>
                  <Badge variant="outline">{agent.type}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Calls Today</p>
                    <p className="font-semibold">{agent.callsToday}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Calls</p>
                    <p className="font-semibold">{agent.totalCalls.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Avg Duration</p>
                    <p className="font-semibold">{agent.avgDuration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Active</p>
                    <p className="font-semibold">{agent.lastActive}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    {agent.status === 'Active' ? <Pause size={14} className="mr-1" /> : <Play size={14} className="mr-1" />}
                    {agent.status === 'Active' ? 'Pause' : 'Start'}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings size={14} className="mr-1" />
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bot className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No agents found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first voice agent.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VoiceAgents;