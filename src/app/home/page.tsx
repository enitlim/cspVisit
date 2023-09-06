import React from 'react'
import TopNavBar from '../CommonComponents/topNavBar'
import ItemMenuList from './itemMenuList'
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from '@mui/material/Grid';
import ProtectedRoute from '../CommonComponents/protectedRoute'
interface menuItems{
        title:string
        icon:React.ElementType
        route:string
        desc:string
}
const HomePage = () => {
    const data: menuItems[] = [
      {
        title: "User Management",
        icon: AccountCircleIcon,
        route: "../loggedPages/userManagement",
        desc: "Click to add user",
      },
      {
        title: "Add CSP",
        icon: PersonAddIcon,
        route: "../loggedPages/addCsp",
        desc: "Click to add user",
      },
      {
        title: "View All CSP",
        icon: PersonAddIcon,
        route: "../loggedPages/viewCsp",
        desc: "Click to View All CSP",
      },
      {
        title: "CSP Location Not matched",
        icon: PersonAddIcon,
        route: "../loggedPages/cspLocationNotMatched",
        desc: "Click to View All CSP Location Not matched",
      },
      {
        title: "Inactive CSP",
        icon: PersonAddIcon,
        route: "../loggedPages/inactiveCSP",
        desc: "Click to View All Inactive CSP",
      },
      {
        title: "CSP Not Visited",
        icon: PersonAddIcon,
        route: "../loggedPages/cspNotVisited",
        desc: "Click to View All CSP Not Visited",
      },
      {
        title: "CSP Exceptions",
        icon: PersonAddIcon,
        route: "../loggedPages/cspExceptions",
        desc: "Click to View All CSP Exceptions",
      },
    ];
  return (
    <>
      <ProtectedRoute>
        <TopNavBar header="Home" />
        {/* style={{justifyContent:'space-evenly', alignContent:'center'}} */}
        <Grid
          container
          spacing={4}
          justifyContent="space-evenly"
          alignItems="center"
          direction="row"
          style={{ height: "100vh" }}
        >
          {data.map((item) => (
            <Grid item xs={4} alignItems="center" key={item.title}>
              <ItemMenuList
                title={item.title}
                icon={item.icon}
                route={item.route}
                desc={item.desc}
              />
            </Grid>
          ))}
        </Grid>
      </ProtectedRoute>
    </>
  );
}

export default HomePage