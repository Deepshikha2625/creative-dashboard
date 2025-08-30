'use client'
import { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon } from '@mui/icons-material';

// Mock data for different time periods
const generateData = (days: number) => {
  const data = [];
  const baseDate = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      users: Math.floor(Math.random() * 1000) + 500,
      orders: Math.floor(Math.random() * 200) + 50,
      revenue: Math.floor(Math.random() * 5000) + 2000,
    });
  }
  
  return data;
};

const pieData = [
  { name: 'Desktop', value: 45, color: 'hsl(261 83% 58%)' },
  { name: 'Mobile', value: 35, color: 'hsl(192 85% 55%)' },
  { name: 'Tablet', value: 20, color: 'hsl(48 96% 53%)' },
];

const Reports = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [chartType, setChartType] = useState('line');
  
  const chartData = useMemo(() => generateData(parseInt(timeRange)), [timeRange]);
  
  const totalUsers = useMemo(() => 
    chartData.reduce((sum, day) => sum + day.users, 0), [chartData]
  );
  
  const totalOrders = useMemo(() => 
    chartData.reduce((sum, day) => sum + day.orders, 0), [chartData]
  );
  
  const totalRevenue = useMemo(() => 
    chartData.reduce((sum, day) => sum + day.revenue, 0), [chartData]
  );

  const MetricCard = ({ title, value, change, icon }: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
  }) => (
    <Paper 
      elevation={0}
      className="glass-card p-6 transition-smooth hover:glow-primary"
      sx={{
        background: 'var(--gradient-glass)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Box className="flex items-center justify-between mb-4">
        <Box className="p-3 rounded-xl gradient-primary glow-primary">
          {icon}
        </Box>
        <Typography variant="body2" className="text-success-glow font-medium">
          {change}
        </Typography>
      </Box>
      <Typography variant="h4" className="font-bold text-foreground mb-1">
        {value}
      </Typography>
      <Typography variant="body2" className="text-muted-foreground">
        {title}
      </Typography>
    </Paper>
  );

  const renderMainChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    if (chartType === 'area') {
      return (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(261 83% 58%)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="hsl(261 83% 58%)" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--glass-bg))',
              border: '1px solid hsl(var(--glass-border) / 0.3)',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
            }}
          />
          <Area 
            type="monotone" 
            dataKey="users" 
            stroke="hsl(261 83% 58%)" 
            fillOpacity={1} 
            fill="url(#colorUsers)" 
            strokeWidth={3}
          />
        </AreaChart>
      );
    }
    
    if (chartType === 'bar') {
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--glass-bg))',
              border: '1px solid hsl(var(--glass-border) / 0.3)',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)',
            }}
          />
          <Bar dataKey="users" fill="hsl(261 83% 58%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    }

    return (
      <LineChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
        <YAxis stroke="hsl(var(--muted-foreground))" />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--glass-bg))',
            border: '1px solid hsl(var(--glass-border) / 0.3)',
            borderRadius: '12px',
            backdropFilter: 'blur(20px)',
          }}
        />
        <Line 
          type="monotone" 
          dataKey="users" 
          stroke="hsl(261 83% 58%)" 
          strokeWidth={3}
          dot={{ fill: 'hsl(261 83% 58%)', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, fill: 'hsl(261 83% 68%)' }}
        />
        <Line 
          type="monotone" 
          dataKey="orders" 
          stroke="hsl(192 85% 55%)" 
          strokeWidth={3}
          dot={{ fill: 'hsl(192 85% 55%)', strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, fill: 'hsl(192 85% 65%)' }}
        />
      </LineChart>
    );
  };

  return (
    <Box className="space-y-8">
      {/* Header */}
      <Box className="glass-card p-6" sx={{ background: 'var(--gradient-glass)', backdropFilter: 'blur(20px)' }}>
        <Typography variant="h4" className="font-bold bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-black mb-2">
          Analytics & Reports 📊
        </Typography>
        <Typography variant="body1" className="text-muted-foreground">
          Track your performance with interactive charts and metrics.
        </Typography>
      </Box>

      {/* Controls */}
      <Paper 
        elevation={0}
        className="glass-card p-6"
        sx={{
          background: 'var(--gradient-glass)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Box className="flex flex-wrap gap-4 items-center">
          <TextField
            select
            label="Time Range"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            variant="filled"
            sx={{
              minWidth: 120,
              '& .MuiFilledInput-root': {
                backgroundColor: 'hsl(var(--input))',
                borderRadius: '12px',
              },
            }}
          >
            <MenuItem value="7">Last 7 days</MenuItem>
            <MenuItem value="30">Last 30 days</MenuItem>
            <MenuItem value="90">Last 90 days</MenuItem>
          </TextField>
          
          <TextField
            select
            label="Chart Type"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            variant="filled"
            sx={{
              minWidth: 120,
              '& .MuiFilledInput-root': {
                backgroundColor: 'hsl(var(--input))',
                borderRadius: '12px',
              },
            }}
          >
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="area">Area Chart</MenuItem>
            <MenuItem value="bar">Bar Chart</MenuItem>
          </TextField>
        </Box>
      </Paper>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Users"
          value={totalUsers.toLocaleString()}
          change="+12.5%"
          icon={<TrendingUp className="text-white text-2xl" />}
        />
        <MetricCard
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          change="+8.2%"
          icon={<BarChartIcon className="text-white text-2xl" />}
        />
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+15.3%"
          icon={<PieChartIcon className="text-white text-2xl" />}
        />
      </div>

      {/* Main Chart */}
      <Paper 
        elevation={0}
        className="glass-card p-6"
        sx={{
          background: 'var(--gradient-glass)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Typography variant="h6" className="font-semibold text-foreground mb-6">
          {chartType === 'line' ? 'Trends Overview' : chartType === 'area' ? 'User Growth' : 'Daily Statistics'}
        </Typography>
        <Box style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer>
            {renderMainChart()}
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Paper 
            elevation={0}
            className="glass-card p-6"
            sx={{
              background: 'var(--gradient-glass)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Typography variant="h6" className="font-semibold text-foreground mb-6">
              Revenue Trends
            </Typography>
            <Box style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(192 85% 55%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(192 85% 55%)" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--glass-bg))',
                      border: '1px solid hsl(var(--glass-border) / 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(20px)',
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(192 85% 55%)" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </div>
        <div>
          <Paper 
            elevation={0}
            className="glass-card p-6"
            sx={{
              background: 'var(--gradient-glass)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Typography variant="h6" className="font-semibold text-foreground mb-6">
              Traffic Sources
            </Typography>
            <Box style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--glass-bg))',
                      border: '1px solid hsl(var(--glass-border) / 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(20px)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box className="mt-4 space-y-2">
              {pieData.map((item, index) => (
                <Box key={index} className="flex items-center justify-between">
                  <Box className="flex items-center space-x-2">
                    <Box 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <Typography variant="body2" className="text-foreground">
                      {item.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" className="font-medium text-foreground">
                    {item.value}%
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </div>
      </div>
    </Box>
  );
};

export default Reports;