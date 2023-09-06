import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Link from "next/link";


interface IconComponentProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  route: string;
}
const ItemMenuList:React.FC<IconComponentProps>=({icon:Icon, title, desc, route})=> {
  return (
    <Box sx={{ width:300, height:200,  margin: "20px" }}>
        <Link href={route}>
        {/* <Link href=""> */}
      <Card variant="outlined" style={{ backgroundColor: "lightblue" }}>
        <CardContent>
          <Icon fontSize="large" />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {title}
          </Typography>
          <Typography variant="body2">{desc}</Typography>
        </CardContent>
      </Card>
      </Link>
    </Box>
  );
}

export default ItemMenuList;