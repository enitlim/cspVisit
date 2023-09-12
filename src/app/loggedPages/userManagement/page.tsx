import React from 'react'
import TopNavBar from '@/app/CommonComponents/topNavBar'
import ItemMenuList from '@/app/CommonComponents/itemMenuList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Grid from '@mui/material/Grid'
interface MenuListType{
    icon: React.ElementType
    title:string,
    link:string,
    desc:string,
}
const MenuList: MenuListType[] = [
  {
    title: "Add User",
    link: "./userManagement/addUser",
    icon: PersonAddIcon,
    desc: "Click to add a user",
  },
  {
    title: "Update User",
    link: "./userManagement/updateUser",
    icon: ManageAccountsIcon,
    desc: "Click to update a user",
  },
];

const UserManagement:React.FC = () => {
  return (
    <>
      <TopNavBar header="User Management"/>

      <Grid
        container
        spacing={4}
        justifyContent="space-evenly"
        alignItems="center"
        direction="row"
        style={{ height: "100vh"}}
      >
        {MenuList.map((menu) => (
          <>
            <Grid item xs={4} alignItems="center">
              <ItemMenuList
                key={menu.title}
                icon={menu.icon}
                title={menu.title}
                route={menu.link}
                desc={menu.desc}
              />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}

export default UserManagement