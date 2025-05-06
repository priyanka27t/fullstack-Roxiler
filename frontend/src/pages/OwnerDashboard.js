import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Grid, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, Card, 
  CardContent, TableSortLabel, Rating
} from '@mui/material';

export default function OwnerDashboard() {
  const [storeData, setStoreData] = useState({
    name: 'Your Store Name',
    averageRating: 4.2,
    totalRatings: 15
  });
  
  const [ratings, setRatings] = useState([]);
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('desc');

  // Mock data - replace with API call
  useEffect(() => {
    const mockRatings = [
      { id: 1, userName: 'John Smith Johnson Williams', userEmail: 'john@example.com', rating: 5, date: '2025-05-01' },
      { id: 2, userName: 'Jane Williams Davis Brown', userEmail: 'jane@example.com', rating: 4, date: '2025-04-28' },
      { id: 3, userName: 'Bob Miller Wilson Taylor', userEmail: 'bob@example.com', rating: 3, date: '2025-04-25' },
      { id: 4, userName: 'Alice Anderson Moore Martin', userEmail: 'alice@example.com', rating: 5, date: '2025-04-20' },
      { id: 5, userName: 'Charlie Thomas Jackson White', userEmail: 'charlie@example.com', rating: 4, date: '2025-04-15' }
    ];
    
    setRatings(mockRatings);
  }, []);

  // Handle sorting
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sort ratings
  const sortedRatings = [...ratings].sort((a, b) => {
    const isAsc = order === 'asc';
    
    if (orderBy === 'rating') {
      return isAsc ? a.rating - b.rating : b.rating - a.rating;
    } else if (orderBy === 'date') {
      return isAsc 
        ? new Date(a.date) - new Date(b.date) 
        : new Date(b.date) - new Date(a.date);
    } else {
      return isAsc 
        ? a[orderBy].localeCompare(b[orderBy]) 
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Store Owner Dashboard
      </Typography>
      
      {/* Store Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Store Name
              </Typography>
              <Typography variant="h5">
                {storeData.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Rating
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ mr: 1 }}>
                  {storeData.averageRating}
                </Typography>
                <Rating value={storeData.averageRating} precision={0.1} readOnly />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Ratings
              </Typography>
              <Typography variant="h5">
                {storeData.totalRatings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Ratings Table */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          User Ratings
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'userName'}
                    direction={orderBy === 'userName' ? order : 'asc'}
                    onClick={() => handleSort('userName')}
                  >
                    User Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'userEmail'}
                    direction={orderBy === 'userEmail' ? order : 'asc'}
                    onClick={() => handleSort('userEmail')}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'rating'}
                    direction={orderBy === 'rating' ? order : 'asc'}
                    onClick={() => handleSort('rating')}
                  >
                    Rating
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'asc'}
                    onClick={() => handleSort('date')}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRatings.map((rating) => (
                <TableRow key={rating.id}>
                  <TableCell>{rating.userName}</TableCell>
                  <TableCell>{rating.userEmail}</TableCell>
                  <TableCell>
                    <Rating value={rating.rating} readOnly />
                  </TableCell>
                  <TableCell>{rating.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Rating Distribution */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          Rating Distribution
        </Typography>
        <Grid container spacing={2}>
          {[5, 4, 3, 2, 1].map((star) => {
            // Calculate how many ratings have this star value
            const count = ratings.filter(r => r.rating === star).length;
            const percentage = ratings.length > 0 ? (count / ratings.length) * 100 : 0;
            
            return (
              <Grid item xs={12} key={star}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ minWidth: 50 }}>
                    <Typography variant="body2">{star} star</Typography>
                  </Box>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <Box
                      sx={{
                        width: `${percentage}%`,
                        height: 10,
                        bgcolor: star > 3 ? 'success.main' : star > 1 ? 'warning.main' : 'error.main',
                        borderRadius: 1
                      }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{count}</Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Container>
  );
}
