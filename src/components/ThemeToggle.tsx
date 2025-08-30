
import { IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering icon until mounted
  return (
    <Tooltip title={mounted ? `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` : ''}>
      <IconButton
        onClick={toggleTheme}
        className="transition-smooth hover:glow-accent"
        {...(mounted ? { 'aria-label': `Switch to ${theme === 'light' ? 'dark' : 'light'} mode` } : {})}
        sx={{
          color: 'hsl(var(--foreground))',
          '&:hover': {
            backgroundColor: 'hsl(var(--muted) / 0.5)',
          },
        }}
      >
        {mounted ? (
          theme === 'light' ? (
            <DarkMode className="transition-smooth" />
          ) : (
            <LightMode className="transition-smooth" />
          )
        ) : null}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;