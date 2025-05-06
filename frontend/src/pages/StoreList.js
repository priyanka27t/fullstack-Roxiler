import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Rating, 
  TextField, Button, InputAdornment, IconButton, TableSortLabel
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userRatings, setUserRatings] = useState({});
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  // Mock data - replace with API call
  useEffect(() => {
    const mockStores = [
      { id: 1, name: 'Electronics Store', address: '123 Tech St, Digital City', rating: 4.5 },
      { id: 2, name: 'Grocery Market', address: '456 Food Ave, Fresh Town', rating: 3.8 },
      { id: 3, name: 'Fashion Boutique', address: '789 Style Blvd, Trend City', rating: 4.2 },
      { id: 4, name: 'Home Depot', address: '101 Builder Rd, Fix City', rating: 4.0 },
      { id: 5, name: 'Book Haven', address: '202 Reader Lane, Knowledge Town', rating: 4.7 }
    ];
    
    setStores(mockStores);
    
    // Mock user's previously submitted ratings
    const mockUserRatings = {
      1: 4,
      3: 5
    };
    
    setUserRatings(mockUserRatings);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRatingChange = (storeId, newValue) => {
    setUserRatings({
      ...userRatings,
      [storeId]: newValue
    });
    
    // Here you would make an API call to save the rating
    console.log(`Submitting rating ${newValue} for store ${storeId}`);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStores = filteredStores.sort((a, b) => {
    const isAsc = order === 'asc';
    if (orderBy === 'rating') {
      return isAsc ? a.rating - b.rating : b.rating - a.rating;
    } else {
      return isAsc 
        ? a[orderBy].localeCompare(b[orderBy]) 
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 3 }}>
        Store Listings
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by store name or address"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="store table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Store Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'address'}
                  direction={orderBy === 'address' ? order : 'asc'}
                  onClick={() => handleSort('address')}
                >
                  Address
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'rating'}
                  direction={orderBy === 'rating' ? order : 'asc'}
                  onClick={() => handleSort('rating')}
                >
                  Overall Rating
                </TableSortLabel>
              </TableCell>
              <TableCell>Your Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStores.map((store) => (
              <TableRow key={store.id}>
                <TableCell component="th" scope="row">
                  {store.name}
                </TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>
                  <Rating 
                    value={store.rating} 
                    precision={0.5} 
                    readOnly
                  />
                  <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                    ({store.rating})
                  </Typography>
                </TableCell>
                <TableCell>
                  <Rating
                    name={`rating-${store.id}`}
                    value={userRatings[store.id] || 0}
                    onChange={(event, newValue) => {
                      handleRatingChange(store.id, newValue);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
