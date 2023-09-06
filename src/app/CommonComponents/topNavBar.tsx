"use client";
import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/icons-material/Menu'
import CustomDrawer from './sideNavBar'
import Link from 'next/link';
import Button from "@mui/material/Button";

interface NavHeaderProps{
  header:string
}
const TopNavBar:React.FC<NavHeaderProps> = ({header}) => {
      const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
          <CustomDrawer open={drawerOpen} onClose={handleDrawerToggle} />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">CSP</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">{header}</Link>
          </Typography>
         
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TopNavBar