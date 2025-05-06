import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Grid, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Button, 
  TextField, Dialog, DialogActions, DialogContent, 
  DialogTitle, FormControl, InputLabel, Select, MenuItem,
  TableSortLabel, Card, CardContent, IconButton, InputAdornment,
  Tabs, Tab
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  // Tab state
  const [tabValue, setTabValue] = useState(0);
  
  // Dashboard stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });
  
  // Users and stores data
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  
  // Search and filter state
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [storeSearchTerm, setStoreSearchTerm] = useState('');
  
  // Sorting state
  const [userOrderBy, setUserOrderBy] = useState('name');
  const [userOrder, setUserOrder] = useState('asc');
  const [storeOrderBy, setStoreOrderBy] = useState('name');
  const [storeOrder, setStoreOrder] = useState('asc');
  
  // Dialog state for adding/editing
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [storeDialogOpen, setStoreDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'user'
  });
  const [currentStore, setCurrentStore] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load mock data
  useEffect(() => {
    // Mock stats
    setStats({
      totalUsers: 25,
      totalStores: 12,
      totalRatings: 87
    });
    
    // Mock users
    const mockUsers = [
      { id: 1, name: 'John Administrator Smith Johnson', email: 'john@example.com', address: '123 Admin St, Manager City', role: 'admin' },
      { id: 2, name: 'Jane Regular User Williams Davis', email: 'jane@example.com', address: '456 User Ave, Customer Town', role: 'user' },
      { id: 3, name: 'Bob Store Owner Brown Miller', email: 'bob@example.com', address: '789 Shop Blvd, Business City', role: 'owner' },
      { id: 4, name: 'Alice Regular User Wilson Moore', email: 'alice@example.com', address: '101 Client Rd, Buyer Village', role: 'user' },
      { id: 5, name: 'Charlie Store Owner Taylor Anderson', email: 'charlie@example.com', address: '202 Merchant Lane, Vendor City', role: 'owner' }
    ];
    
    // Mock stores
    const mockStores = [
      { id: 1, name: 'Electronics Store', email: 'electronics@example.com', address: '123 Tech St, Digital City', rating: 4.5 },
      { id: 2, name: 'Grocery Market', email: 'grocery@example.com', address: '456 Food Ave, Fresh Town', rating: 3.8 },
      { id: 3, name: 'Fashion Boutique', email: 'fashion@example.com', address: '789 Style Blvd, Trend City', rating: 4.2 },
      { id: 4, name: 'Home Depot', email: 'home@example.com', address: '101 Builder Rd, Fix City', rating: 4.0 },
      { id: 5, name: 'Book Haven', email: 'books@example.com', address: '202 Reader Lane, Knowledge Town', rating: 4.7 }
    ];
    
    setUsers(mockUsers);
    setStores(mockStores);
  }, []);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // User table sorting
  const handleUserSort = (property) => {
    const isAsc = userOrderBy === property && userOrder === 'asc';
    setUserOrder(isAsc ? 'desc' : 'asc');
    setUserOrderBy(property);
  };
  
  // Store table sorting
  const handleStoreSort = (property) => {
    const isAsc = storeOrderBy === property && storeOrder === 'asc';
    setStoreOrder(isAsc ? 'desc' : 'asc');
    setStoreOrderBy(property);
  };
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(userSearchTerm.toLowerCase())
  );
  
  // Sort filtered users
  const sortedUsers = filteredUsers.sort((a, b) => {
    const isAsc = userOrder === 'asc';
    return isAsc 
      ? a[userOrderBy].localeCompare(b[userOrderBy]) 
      : b[userOrderBy].localeCompare(a[userOrderBy]);
  });
  
  // Filter stores based on search term
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(storeSearchTerm.toLowerCase()) ||
    store.email.toLowerCase().includes(storeSearchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(storeSearchTerm.toLowerCase())
  );
  
  // Sort filtered stores
  const sortedStores = filteredStores.sort((a, b) => {
    const isAsc = storeOrder === 'asc';
    if (storeOrderBy === 'rating') {
      return isAsc ? a.rating - b.rating : b.rating - a.rating;
    } else {
      return isAsc 
        ? a[storeOrderBy].localeCompare(b[storeOrderBy]) 
        : b[storeOrderBy].localeCompare(a[storeOrderBy]);
    }
  });
  
  // Handle opening the user dialog for adding
  const handleAddUser = () => {
    setCurrentUser({
      name: '',
      email: '',
      address: '',
      password: '',
      role: 'user'
    });
    setIsEditing(false);
    setUserDialogOpen(true);
  };
  
  // Handle opening the user dialog for editing
  const handleEditUser = (user) => {
    setCurrentUser({
      ...user,
      password: '' // Don't populate password for editing
    });
    setIsEditing(true);
    setUserDialogOpen(true);
  };
  
  // Handle opening the store dialog for adding
  const handleAddStore = () => {
    setCurrentStore({
      name: '',
      email: '',
      address: ''
    });
    setIsEditing(false);
    setStoreDialogOpen(true);
  };
  
  // Handle opening the store dialog for editing
  const handleEditStore = (store) => {
    setCurrentStore(store);
    setIsEditing(true);
    setStoreDialogOpen(true);
  };
  
  // Handle user form input changes
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value
    });
  };
  
  // Handle store form input changes
  const handleStoreChange = (e) => {
    const { name, value } = e.target;
    setCurrentStore({
      ...currentStore,
      [name]: value
    });
  };
  
  // Handle user form submission
  const handleUserSubmit = () => {
    if (isEditing) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? currentUser : user
      );
      setUsers(updatedUsers);
    } else {
      // Add new user with mock ID
      const newUser = {
        ...currentUser,
        id: users.length + 1
      };
      setUsers([...users, newUser]);
      
      // Update stats
      setStats({
        ...stats,
        totalUsers: stats.totalUsers + 1
      });
    }
    
    setUserDialogOpen(false);
  };
  
  // Handle store form submission
  const handleStoreSubmit = () => {
    if (isEditing) {
      // Update existing store
      const updatedStores = stores.map(store => 
        store.id === currentStore.id ? currentStore : store
      );
      setStores(updatedStores);
    } else {
      // Add new store with mock ID and rating
      const newStore = {
        ...currentStore,
        id: stores.length + 1,
        rating: 0
      };
      setStores([...stores, newStore]);
      
      // Update stats
      setStats({
        ...stats,
        totalStores: stats.totalStores + 1
      });
    }
    
    setStoreDialogOpen(false);
  };
  
  // Handle user deletion
  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    // Update stats
    setStats({
      ...stats,
      totalUsers: stats.totalUsers - 1
    });
  };
  
  // Handle store deletion
  const handleDeleteStore = (storeId) => {
    const updatedStores = stores.filter(store => store.id !== storeId);
    setStores(updatedStores);
    
    // Update stats
    setStats({
      ...stats,
      totalStores: stats.totalStores - 1
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {/* Dashboard Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h3">
                {stats.totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Stores
              </Typography>
              <Typography variant="h3">
                {stats.totalStores}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Ratings
              </Typography>
              <Typography variant="h3">
                {stats.totalRatings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Tabs for Users and Stores */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
          <Tab label="Users" />
          <Tab label="Stores" />
        </Tabs>
      </Box>
      
      {/* Users Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            placeholder="Search users..."
            variant="outlined"
            size="small"
            value={userSearchTerm}
            onChange={(e) => setUserSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: '40%' }}
          />
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Box>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={userOrderBy === 'name'}
                    direction={userOrderBy === 'name' ? userOrder : 'asc'}
                    onClick={() => handleUserSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={userOrderBy === 'email'}
                    direction={userOrderBy === 'email' ? userOrder : 'asc'}
                    onClick={() => handleUserSort('email')}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={userOrderBy === 'address'}
                    direction={userOrderBy === 'address' ? userOrder : 'asc'}
                    onClick={() => handleUserSort('address')}
                  >
                    Address
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={userOrderBy === 'role'}
                    direction={userOrderBy === 'role' ? userOrder : 'asc'}
                    onClick={() => handleUserSort('role')}
                  >
                    Role
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEditUser(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteUser(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      
      {/* Stores Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            placeholder="Search stores..."
            variant="outlined"
            size="small"
            value={storeSearchTerm}
            onChange={(e) => setStoreSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: '40%' }}
          />
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleAddStore}
          >
            Add Store
          </Button>
        </Box>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={storeOrderBy === 'name'}
                    direction={storeOrderBy === 'name' ? storeOrder : 'asc'}
                    onClick={() => handleStoreSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={storeOrderBy === 'email'}
                    direction={storeOrderBy === 'email' ? storeOrder : 'asc'}
                    onClick={() => handleStoreSort('email')}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={storeOrderBy === 'address'}
                    direction={storeOrderBy === 'address' ? storeOrder : 'asc'}
                    onClick={() => handleStoreSort('address')}
                  >
                    Address
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={storeOrderBy === 'rating'}
                    direction={storeOrderBy === 'rating' ? storeOrder : 'asc'}
                    onClick={() => handleStoreSort('rating')}
                  >
                    Rating
                  </TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>{store.name}</TableCell>
                  <TableCell>{store.email}</TableCell>
                  <TableCell>{store.address}</TableCell>
                  <TableCell>{store.rating}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleEditStore(store)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteStore(store.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      
      {/* User Dialog */}
      <Dialog open={userDialogOpen} onClose={() => setUserDialogOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={currentUser.name}
            onChange={handleUserChange}
            helperText="20-60 characters"
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={currentUser.email}
            onChange={handleUserChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            fullWidth
            multiline
            rows={2}
            value={currentUser.address}
            onChange={handleUserChange}
            helperText="Max 400 characters"
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={currentUser.password}
            onChange={handleUserChange}
            helperText="8-16 characters, include uppercase and special character"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={currentUser.role}
              onChange={handleUserChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="owner">Store Owner</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUserSubmit} color="primary">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Store Dialog */}
      <Dialog open={storeDialogOpen} onClose={() => setStoreDialogOpen(false)}>
        <DialogTitle>{isEditing ? 'Edit Store' : 'Add Store'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Store Name"
            fullWidth
            value={currentStore.name}
            onChange={handleStoreChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={currentStore.email}
            onChange={handleStoreChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            fullWidth
            multiline
            rows={2}
            value={currentStore.address}
            onChange={handleStoreChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStoreDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleStoreSubmit} color="primary">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
