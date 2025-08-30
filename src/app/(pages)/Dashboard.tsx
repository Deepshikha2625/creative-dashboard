'use client'
import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  Avatar
} from '@mui/material';
import {
  People,
  TrendingUp,
  ShoppingCart,
  Search,
  Phone,
  Email,
  Business,
} from '@mui/icons-material';
import Loader from '@/components/ui/Loader';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const StatsCard = ({ title, value, change, icon, color }: StatsCardProps) => (
  <Paper
    elevation={0}
    className="transition-smooth cursor-pointer"
    sx={{
      position: 'relative',
      borderRadius: '1.5rem',
      p: 0,
      minHeight: 180,
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 4px 16px 0 rgba(80, 70, 255, 0.10)',
      borderImage: color === 'primary'
        ? 'linear-gradient(135deg, #8f5cff 0%, #3b82f6 100%) 1'
        : 'linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%) 1',
      overflow: 'hidden',
      '&:hover': {
        boxShadow: '0 8px 32px 0 rgba(80, 70, 255, 0.13)',
        transform: 'translateY(-2px) scale(1.03)',
        background: 'rgba(255,255,255,0.22)',
      },
    }}
  >
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: 3,
      pt: 3,
    }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '1rem',
          background: color === 'primary'
            ? 'linear-gradient(135deg, #8f5cff 0%, #3b82f6 100%)'
            : 'linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)',
          boxShadow: '0 4px 16px 0 rgba(80, 70, 255, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 0,
        }}
      >
        {icon}
      </Box>
      <Chip
        label={change}
        size="small"
        sx={{
          background: color === 'primary' ? 'rgba(143,92,255,0.12)' : 'rgba(56,189,248,0.12)',
          color: color === 'primary' ? '#8f5cff' : '#38bdf8',
          fontWeight: 600,
          fontSize: '0.95rem',
          letterSpacing: 0.2,
        }}
      />
    </Box>
    <Box sx={{ px: 3, pb: 3, pt: 1 }}>
      <Typography variant="h3" sx={{
        fontWeight: 800,
        color: '#222',
        mb: 0.5,
        letterSpacing: 0.5,
        fontSize: { xs: '2rem', md: '2.5rem' },
        textShadow: '0 2px 8px rgba(80,70,255,0.08)',
      }}>
        {value}
      </Typography>
      <Typography variant="subtitle1" sx={{
        color: '#333',
        fontWeight: 500,
        fontSize: '1.1rem',
        letterSpacing: 0.1,
        opacity: 0.85,
      }}>
        {title}
      </Typography>
    </Box>
    {/* Inner Glow effect */}
    <Box sx={{
      position: 'absolute',
      inset: 0,
      borderRadius: '1.5rem',
      pointerEvents: 'none',
      boxShadow: color === 'primary'
        ? '0 0 0 8px #8f5cff22 inset'
        : '0 0 0 8px #38bdf822 inset',
      zIndex: 0,
    }} />
  </Paper>
);

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState<keyof User>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoadingUsers(false);
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const aValue = orderBy === 'name' ? a.name : orderBy === 'email' ? a.email : a.company.name;
      const bValue = orderBy === 'name' ? b.name : orderBy === 'email' ? b.email : b.company.name;
      
      if (order === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [filteredUsers, order, orderBy]);

  const paginatedUsers = useMemo(() => {
    return sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedUsers, page, rowsPerPage]);

  const handleRequestSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const statsData = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12.5%',
      icon: <People className="text-white text-2xl" />,
      color: 'primary',
    },
    {
      title: 'Active Users',
      value: '8,924',
      change: '+8.2%',
      icon: <TrendingUp className="text-white text-2xl" />,
      color: 'accent',
    },
    {
      title: 'Total Orders',
      value: '3,456',
      change: '+15.3%',
      icon: <ShoppingCart className="text-white text-2xl" />,
      color: 'primary',
    },
  ];

  return (
    <Box
      className="min-h-screen bg-background/80"
      sx={{
        mx: 'auto',
        maxWidth: '1440px',
        width: '100%',
        transition: 'all 0.3s',
        background: 'linear-gradient(120deg, hsl(var(--background)), hsl(var(--background-secondary)))',
     borderRadius: '12px',
      }}
    >
      {/* Sticky Header */}
    

      <Box className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome Banner */}
  <Box className="glass-card p-6 flex flex-col gap-2 items-start shadow-lg rounded-2xl">
          <Typography
            variant="h4"
            className="font-bold text-foreground mb-1 text-2xl lg:text-4xl"
          >
            Welcome back, John!
          </Typography>
          <Typography variant="body1" className="text-gray-500 text-base">
            Here&apos;s what&apos;s happening with your dashboard today.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Users Data Table */}
        <Paper
          elevation={2}
          className="glass-card overflow-hidden shadow-2xl relative"
          sx={{
            background: 'var(--gradient-glass)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
          }}
        >
          {loadingUsers && <Loader overlay />}
          <Box className="p-6 border-b border-glass-border/30 bg-background/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Typography variant="h6" className="font-semibold text-foreground text-lg">
              Users Management
            </Typography>
            <TextField
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="filled"
              size="small"
              sx={{
                minWidth: 220,
                '& .MuiFilledInput-root': {
                  backgroundColor: 'hsl(var(--input))',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'hsl(var(--input))',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'hsl(var(--input))',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-muted-foreground" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box className="overflow-x-auto">
            <TableContainer sx={{ minWidth: 650 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ minWidth: 200 }}>User</TableCell>
                    <TableCell sx={{ minWidth: 250 }}>
                      <TableSortLabel
                        active={orderBy === 'email'}
                        direction={orderBy === 'email' ? order : 'asc'}
                        onClick={() => handleRequestSort('email')}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Email
                      </TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ minWidth: 150 }}>Phone</TableCell>
                    <TableCell sx={{ minWidth: 200 }}>
                      <TableSortLabel
                        active={orderBy === 'company'}
                        direction={orderBy === 'company' ? order : 'asc'}
                        onClick={() => handleRequestSort('company' as keyof User)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Company
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers?.map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-muted/50 transition-smooth"
                    >
                      <TableCell>
                        <Box className="flex items-center space-x-3">
                          <Avatar className="gradient-primary glow-primary w-10 h-10">
                            {user.name.charAt(0)}
                          </Avatar>
                          <Box className="min-w-0">
                            <Typography variant="body2" className="font-medium text-foreground truncate text-base">
                              {user.name}
                            </Typography>
                            <Typography variant="caption" className="text-muted-foreground text-xs">
                              @{user.username}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className="flex items-center space-x-2">
                          <Email className="text-muted-foreground text-base flex-shrink-0" />
                          <Typography variant="body2" className="text-foreground truncate text-base">
                            {user.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className="flex items-center space-x-2">
                          <Phone className="text-muted-foreground text-base flex-shrink-0" />
                          <Typography variant="body2" className="text-foreground text-base">
                            {user.phone.split(' ')[0]}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box className="flex items-center space-x-2">
                          <Business className="text-muted-foreground text-base flex-shrink-0" />
                          <Box className="min-w-0">
                            <Typography variant="body2" className="font-medium text-foreground truncate text-base">
                              {user.company.name}
                            </Typography>
                            <Typography variant="caption" className="text-muted-foreground truncate text-xs block">
                              {user.company.catchPhrase}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            className="border-t border-glass-border/30"
            sx={{
              '& .MuiTablePagination-toolbar': {
                paddingLeft: 2,
                paddingRight: 2,
              },
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontSize: '0.95rem',
              },
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;