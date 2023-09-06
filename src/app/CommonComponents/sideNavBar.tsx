"use client";
import React, { useState, useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, Grid } from '@mui/material';
import { Home, Inbox, Mail } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemButton from '@mui/material/ListItemButton';
import MailIcon from '@mui/icons-material/Mail';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from "@mui/icons-material/Person";
import {signOut} from 'firebase/auth';
import {auth} from "../../../firebase/SettingFirebase";
import { CspContext } from "../context/cspContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, onClose }) => {
    const [openSignoutModal, setOpenSignoutModal] = React.useState(false);
    const handleOpen = () => setOpenSignoutModal(true);
    const handleClose = () => setOpenSignoutModal(false);
  const { currentUser } = useContext(CspContext);

  
  return (
    <>
      <Modal
        open={openSignoutModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ alignContent: "center" }}
          >
            Do You want to Logout?
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Button variant="outlined" color="primary" onClick={handleClose}>
                No
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  signOut(auth);
                }}
              >
                Yes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Drawer anchor="left" open={open} onClose={onClose}>
        <div onClick={onClose}>
          <Box style={{ width: "200px" }}>
            <List>
              <ListItem key="username">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    currentUser.length > 0 ? currentUser[0]["emp_name"] : ""
                  }
                />
              </ListItem>
              <ListItem key="logout" disablePadding>
                <ListItemButton onClick={handleOpen}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </div>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
