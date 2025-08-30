'use client'
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';
import {
  Person,
  Security,
  Notifications,
  Palette,
  Language,
  Storage,
  Edit,
  ChevronRight,
  Verified,
  Shield,
} from '@mui/icons-material';

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    jobTitle: 'Product Manager',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    darkMode: false,
    language: 'English',
    timezone: 'UTC-5 (EST)',
  });

  const handleProfileChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handlePreferenceChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences(prev => ({ ...prev, [field]: e.target.checked }));
  };

  const SettingsSection = ({ title, icon, children }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <Paper 
      elevation={0}
      className="glass-card p-6"
      sx={{
        background: 'var(--gradient-glass)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Box className="flex items-center space-x-3 mb-6">
        <Box className="p-2 rounded-xl gradient-primary glow-primary">
          {icon}
        </Box>
        <Typography variant="h6" className="font-semibold text-foreground">
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  );

  return (
    <Box className="space-y-8">
      {/* Header */}
      <Box className="glass-card p-6" sx={{ background: 'var(--gradient-glass)', backdropFilter: 'blur(20px)' }}>
        <Typography variant="h4" className="font-bold bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-black mb-2">
          Settings & Preferences <SettingsIcon/>
        </Typography>
        <Typography variant="body1" className="text-muted-foreground">
          Manage your account settings and application preferences.
        </Typography>
      </Box>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Settings */}
        <div className="lg:col-span-2">
          <SettingsSection
            title="Profile Information"
            icon={<Person className="text-white text-xl" />}
          >
            <Box className="flex items-center space-x-4 mb-6">
              <Avatar 
                className="gradient-primary glow-primary"
                sx={{ width: 80, height: 80, fontSize: '2rem' }}
              >
                {profile.firstName.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" className="font-semibold text-foreground">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="body2" className="text-muted-foreground mb-2">
                  {profile.jobTitle} at {profile.company}
                </Typography>
                <Button
                  startIcon={<Edit />}
                  variant="outlined"
                  size="small"
                  className="border-border text-foreground hover:bg-muted/50"
                >
                  Change Photo
                </Button>
              </Box>
            </Box>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <TextField
                fullWidth
                label="First Name"
                value={profile.firstName}
                onChange={handleProfileChange('firstName')}
                variant="filled"
                sx={{
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'hsl(var(--input))',
                    borderRadius: '12px',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={profile.lastName}
                onChange={handleProfileChange('lastName')}
                variant="filled"
                sx={{
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'hsl(var(--input))',
                    borderRadius: '12px',
                  },
                }}
              />
              <div className="sm:col-span-2">
                <TextField
                  fullWidth
                  label="Email Address"
                  value={profile.email}
                  onChange={handleProfileChange('email')}
                  variant="filled"
                  sx={{
                    '& .MuiFilledInput-root': {
                      backgroundColor: 'hsl(var(--input))',
                      borderRadius: '12px',
                    },
                  }}
                />
              </div>
              <TextField
                fullWidth
                label="Phone Number"
                value={profile.phone}
                onChange={handleProfileChange('phone')}
                variant="filled"
                sx={{
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'hsl(var(--input))',
                    borderRadius: '12px',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Company"
                value={profile.company}
                onChange={handleProfileChange('company')}
                variant="filled"
                sx={{
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'hsl(var(--input))',
                    borderRadius: '12px',
                  },
                }}
              />
            </div>

            <Box className="pt-6 border-t border-glass-border/30 flex justify-end space-x-3">
            
              <Button 
                variant="contained"
                className="gradient-primary glow-primary"
                sx={{
                  background: 'var(--gradient-primary)',
                  '&:hover': {
                    background: 'var(--gradient-primary)',
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </SettingsSection>
        </div>

        {/* Side Panel Settings */}
        <div className="space-y-6">
          {/* Security Settings */}
          <SettingsSection
            title="Security"
            icon={<Security className="text-white text-xl" />}
          >
            <List className="p-0">
              <ListItem className="px-0">
                <ListItemIcon>
                  <Shield className="text-success" />
                </ListItemIcon>
                <ListItemText
                  primary="Two-Factor Authentication"
                  secondary="Add an extra layer of security"
                />
                <ListItemSecondaryAction>
                  <Chip 
                    label="Enabled" 
                    size="small" 
                    className="bg-success/20 text-success-glow"
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider className="my-2" />
              <ListItem component="div" className="px-0 hover:bg-muted/50 rounded-lg transition-smooth cursor-pointer">
                <ListItemIcon>
                  <Verified className="text-primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Change Password"
                  secondary="Update your login password"
                />
                <ListItemSecondaryAction>
                  <ChevronRight className="text-muted-foreground" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </SettingsSection>

          {/* Notification Preferences */}
          <SettingsSection
            title="Notifications"
            icon={<Notifications className="text-white text-xl" />}
          >
            <Box className="space-y-4">
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.emailNotifications}
                    onChange={handlePreferenceChange('emailNotifications')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: 'hsl(var(--primary))',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'hsl(var(--primary))',
                      },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" className="text-foreground font-medium">
                      Email Notifications
                    </Typography>
                    <Typography variant="caption" className="text-muted-foreground">
                      Receive updates via email
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.pushNotifications}
                    onChange={handlePreferenceChange('pushNotifications')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: 'hsl(var(--primary))',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: 'hsl(var(--primary))',
                      },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" className="text-foreground font-medium">
                      Push Notifications
                    </Typography>
                    <Typography variant="caption" className="text-muted-foreground">
                      Browser and mobile alerts
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </SettingsSection>

          {/* App Preferences */}
          <SettingsSection
            title="Preferences"
            icon={<Palette className="text-white text-xl" />}
          >
            <List className="p-0">
              <ListItem component="div" className="px-0 hover:bg-muted/50 rounded-lg transition-smooth cursor-pointer">
                <ListItemIcon>
                  <Language className="text-accent" />
                </ListItemIcon>
                <ListItemText
                  primary="Language & Region"
                  secondary={preferences.language}
                />
                <ListItemSecondaryAction>
                  <ChevronRight className="text-muted-foreground" />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider className="my-2" />
              <ListItem component="div" className="px-0 hover:bg-muted/50 rounded-lg transition-smooth cursor-pointer">
                <ListItemIcon>
                  <Storage className="text-warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Data & Storage"
                  secondary="Manage your data usage"
                />
                <ListItemSecondaryAction>
                  <ChevronRight className="text-muted-foreground" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </SettingsSection>
        </div>
      </div>
    </Box>
  );
};

export default Settings;