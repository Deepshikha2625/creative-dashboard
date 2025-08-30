import React from 'react';
import { Box } from '@mui/material';

const Loader = ({ overlay = false }: { overlay?: boolean }) => (
  <Box
    sx={{
      position: overlay ? 'absolute' : 'static',
      inset: overlay ? 0 : undefined,
      zIndex: overlay ? 10 : undefined,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: overlay ? 'rgba(255,255,255,0.6)' : 'transparent',
      backdropFilter: overlay ? 'blur(2px)' : undefined,
      minHeight: overlay ? undefined : 120,
      width: '100%',
    }}
  >
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8f5cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><circle cx="12" cy="12" r="10" strokeOpacity=".25"/><path d="M22 12a10 10 0 0 1-10 10"/></svg>
  </Box>
);

export default Loader;
