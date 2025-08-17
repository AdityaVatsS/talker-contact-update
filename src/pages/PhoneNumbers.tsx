import React, { useState } from 'react';
import { Phone, Plus, Search, Filter, MoreVertical, Copy, Edit, Trash2 } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

interface PhoneNumber {
  id: string;
  number: string;
  type: 'Local' | 'Toll-Free' | 'International';
  status: 'Active' | 'Inactive' | 'Pending';
  location: string;
  purchaseDate: string;
  monthlyPrice: number;
  connectedAgent?: string;
}

const PhoneNumbers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock data - in real app this would come from API
  const [phoneNumbers] = useState<PhoneNumber[]>([
    {
      id: '1',
      number: '+1 (555) 123-4567',
      type: 'Local',
      status: 'Active',
      location: 'New York, NY',
      purchaseDate: '2024-01-15',
      monthlyPrice: 2.99,
      connectedAgent: 'Sales Assistant'
    },
    {
      id: '2', 
      number: '+1 (800) 555-0123',
      type: 'Toll-Free',
      status: 'Active',
      location: 'United States',
      purchaseDate: '2024-02-01',
      monthlyPrice: 15.99,
      connectedAgent: 'Customer Support'
    },
    {
      id: '3',
      number: '+1 (555) 987-6543',
      type: 'Local',
      status: 'Inactive',
      location: 'Los Angeles, CA',
      purchaseDate: '2024-01-20',
      monthlyPrice: 2.99
    },
    {
      id: '4',
      number: '+44 20 7946 0958',
      type: 'International',
      status: 'Pending',
      location: 'London, UK',
      purchaseDate: '2024-03-10',
      monthlyPrice: 8.99
    }
  ]);

  const filteredNumbers = phoneNumbers.filter(number => {
    const matchesSearch = number.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         number.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || number.type.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCopyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    toast({
      title: "Number copied",
      description: "Phone number has been copied to clipboard.",
    });
  };

  const totalActiveNumbers = phoneNumbers.filter(n => n.status === 'Active').length;
  const monthlyTotal = phoneNumbers
    .filter(n => n.status === 'Active')
    .reduce((sum, n) => sum + n.monthlyPrice, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Phone Numbers</h1>
          <p className="text-gray-600 mt-1">Manage your phone numbers and configure call routing</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus size={16} className="mr-2" />
              Add Phone Number
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Phone Number</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="number-type">Number Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Number</SelectItem>
                    <SelectItem value="toll-free">Toll-Free Number</SelectItem>
                    <SelectItem value="international">International Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">New York, NY</SelectItem>
                    <SelectItem value="ca">Los Angeles, CA</SelectItem>
                    <SelectItem value="tx">Austin, TX</SelectItem>
                    <SelectItem value="fl">Miami, FL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Purchase Number
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Numbers</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveNumbers}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">$</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Per month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">🌎</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Countries covered
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search phone numbers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="toll-free">Toll-Free</SelectItem>
              <SelectItem value="international">International</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Phone Numbers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Phone Numbers ({filteredNumbers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNumbers.map((phoneNumber) => (
              <div key={phoneNumber.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <p className="text-lg font-semibold text-gray-900">{phoneNumber.number}</p>
                      <Badge className={getStatusColor(phoneNumber.status)}>
                        {phoneNumber.status}
                      </Badge>
                      <Badge variant="outline">{phoneNumber.type}</Badge>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>📍 {phoneNumber.location}</span>
                      <span>💰 ${phoneNumber.monthlyPrice}/month</span>
                      <span>📅 Since {new Date(phoneNumber.purchaseDate).toLocaleDateString()}</span>
                      {phoneNumber.connectedAgent && (
                        <span>🤖 Connected to {phoneNumber.connectedAgent}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyNumber(phoneNumber.number)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Copy size={14} />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit size={14} className="mr-2" />
                        Configure
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone size={14} className="mr-2" />
                        Connect Agent
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 size={14} className="mr-2" />
                        Release Number
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {filteredNumbers.length === 0 && (
              <div className="text-center py-12">
                <Phone className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No phone numbers found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Get started by purchasing your first phone number.'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneNumbers;