'use client'
import { useState } from 'react';
import "../globals.css"
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const Login = () => {
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Set a dummy token cookie for authentication (expires in 1 day)
    if (typeof window !== 'undefined') {
      document.cookie = `token=dummy-token; path=/; max-age=86400`;
    }
    navigate.push('/dashboard');
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Box className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #8f5cff 0%, #3b82f6 100%)',
    }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          className="glass-card transition-smooth"
          sx={{
            background: 'rgba(30, 41, 59, 0.85)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            padding: { xs: 4, sm: 8 },
            backdropFilter: 'blur(24px)',
            minWidth: 350,
          }}
        >
          <Box className="flex flex-col items-center mb-8">
            <Box
              className="mb-4 flex items-center justify-center"
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8f5cff 0%, #3b82f6 100%)',
                boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.25)',
              }}
            >
              <LockOutlined sx={{ fontSize: 36, color: '#fff' }} />
            </Box>
            <Typography
              variant="h4"
              component="h1"
              className="text-center font-bold"
              sx={{
                background: 'linear-gradient(90deg, #a78bfa, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              className="text-center"
              sx={{ color: '#fff!important' }}
            >
              Sign in to access your dashboard
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} className="space-y-6">
            <TextField
              id="login-email"
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              variant="filled"
              required
              sx={{
                mb: 2,
                '& .MuiFilledInput-root': {
                  backgroundColor: 'rgba(30,41,59,0.85)',
                  borderRadius: '18px',
                  color: '#fff',
                  boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.10)',
                  transition: 'box-shadow 0.2s',
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(30,41,59,0.92)',
                  },
                  '&.MuiFilledInput-root.MuiInputBase-adornedEnd input:not(:placeholder-shown), &.MuiFilledInput-root input:not(:placeholder-shown)': {
                    WebkitBoxShadow: '0 0 0 100px #266798 inset',
                    boxShadow: '0 0 0 100px #266798 inset',
                  },
                  '& .MuiInputAdornment-root': {
                    backgroundColor: 'transparent',
                    borderTopRightRadius: '18px',
                    borderBottomRightRadius: '18px',
                  },
                  '& .MuiIconButton-root': {
                    color: '#fff!important',
                    borderRadius: '50%',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#fff',
                },
                input: {
                  color: '#fff',
                },
              }}
            />

            <TextField
              id="login-password"
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
              variant="filled"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ background: 'transparent', pr: 1 }}>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#fff!important', background: 'transparent' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: 'rgba(30,41,59,0.85)',
                  borderRadius: '18px',
                  color: '#fff',
                  boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.10)',
                  transition: 'box-shadow 0.2s',
                  '&.Mui-focused': {
                    backgroundColor: 'rgba(30,41,59,0.92)',
                  },
                  '&.MuiFilledInput-root.MuiInputBase-adornedEnd input:not(:placeholder-shown), &.MuiFilledInput-root input:not(:placeholder-shown)': {
                    WebkitBoxShadow: '0 0 0 100px #266798 inset',
                    boxShadow: '0 0 0 100px #266798 inset',
                  },
                  '& .MuiInputAdornment-root': {
                    backgroundColor: 'transparent',
                    borderTopRightRadius: '18px',
                    borderBottomRightRadius: '18px',
                  },
                  '& .MuiIconButton-root': {
                    color: '#fff!important',
                    borderRadius: '50%',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#fff',
                },
                input: {
                  color: '#fff',
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #a78bfa, #38bdf8)',
                borderRadius: '18px',
                height: '56px',
                fontSize: '17px',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 2px 16px 0 rgba(31, 38, 135, 0.15)',
                letterSpacing: 0.5,
                mt: 1,
                '&:hover': {
                  background: 'linear-gradient(90deg, #8f5cff, #3b82f6)',
                  boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.18)',
                  transform: 'scale(1.03)',
                },
              }}
            >
              Sign In
            </Button>
          </Box>

          <Box className="mt-6 text-center">
            <Typography variant="body2" className="text-center" sx={{ color: '#fff!important' }}>
              Demo login - use any credentials to continue
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;