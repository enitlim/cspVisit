"use client";
import React from 'react'
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TopNavBar from '@/app/CommonComponents/topNavBar';
import ItemMenuList from '@/app/CommonComponents/itemMenuList';
import { Grid } from '@mui/material';
const CSPManagement = () => {
    const menuList = [
      {
        title: "Add CSP",
        icon: AccountBalanceWalletIcon,
        route: "../loggedPages/cspManagement/addCsp",
        desc: "Click to Add CSP",
      },
      {
        title: "CSP Parameters",
        icon: ChecklistIcon,
        route: "../loggedPages/cspManagement/cspParameter",
        desc: "Click to manage CSP Parameter",
      },
    ];
  return (
    <>
      <TopNavBar />
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignItems="center"
        direction="row"
        style={{ height: "100vh" }}
      >
        {menuList.map((item) => (
          <Grid item xs={2} key={item.title}>
            <ItemMenuList
              title={item.title}
              icon={item.icon}
              route={item.route}
              desc={item.desc}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CSPManagement