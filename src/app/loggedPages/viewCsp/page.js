"use client";
import TopNavBar from "@/app/CommonComponents/topNavBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  doc,
  getDocs,
  collection,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../../../../firebase/SettingFirebase";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const ViewCSP = () => {
  const [branch, setBranch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState([]);
  const PAGELIMIT = 15;
  useEffect(() => {
    initialLoad();
    //   const getBranch=async()=>{
    //     const dataQry=collection(db, "csp_details_collection")
    //   }
  }, []);
  const initialLoad = async () => {
    setLoading(true);
    const initialQuery = query(
      collection(db, "csp_details_collection"),
      limit(PAGELIMIT)
    );
    const initialSnapShot = await getDocs(initialQuery);
    const initialData = initialSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const lastDoc = initialSnapShot.docs[initialSnapShot.docs.length - 1];
    setBranch(initialData);
    setLastDoc(lastDoc);
    setLoading(false);
    console.log(initialData);
    console.log(lastDoc);
  };
  const loadMoreData = async () => {
    setLoading(true);
    const nextQry = query(
      collection(db, "csp_details_collection"),
      startAfter(lastDoc),
      limit(PAGELIMIT)
    );
    const nextDSnapShot = await getDocs(nextQry);
    const nextData = nextDSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const nextlastDoc = nextDSnapShot.docs[nextDSnapShot.docs.length - 1];
    setBranch([...branch, ...nextData]);
    setLastDoc(nextlastDoc);
    console.log(nextlastDoc);
    console.log(lastDoc);
    setLoading(false);
  };
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
 
    if (!loading && scrollY + windowHeight >= documentHeight-200) {
      console.log("SCroll more");
      loadMoreData()
    }
  };
useEffect(() => {
  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  }
}, [loading])

  console.log("Loading=>", loading);

  return (
    <>
      <TopNavBar header="View All CSP" />
      {/* <Container> */}
      <Box sx={{ margin: "10px", padding: "10px" }}>
        {/* <Button variant="text" color="primary" onClick={loadMoreData}>
              Click me
            </Button> */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sl No</TableCell>
                <TableCell>Branch Code</TableCell>
                <TableCell>Branch Name</TableCell>
                <TableCell>Region Name</TableCell>
                <TableCell>CSP Code</TableCell>
                <TableCell>CSP Name</TableCell>
                <TableCell>CSP Phone</TableCell>
                <TableCell>CSP Village</TableCell>
                <TableCell>CSP Status</TableCell>
                <TableCell>CSP Terminal ID</TableCell>
                <TableCell>CSP Vendor</TableCell>
                <TableCell>Latitude</TableCell>
                <TableCell>Longitude</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branch.length > 0
                ? branch.map((br, index) => (
                    <TableRow key={br.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{br.br_code}</TableCell>
                      <TableCell>{br.br_name}</TableCell>
                      <TableCell>{br.reg_name}</TableCell>
                      <TableCell>{br.csp_code}</TableCell>
                      <TableCell>{br.csp_name}</TableCell>
                      <TableCell>{br.csp_phone}</TableCell>
                      <TableCell>{br.csp_village}</TableCell>
                      <TableCell>{br.csp_status}</TableCell>
                      <TableCell>{br.csp_teriminal_id}</TableCell>
                      <TableCell>{br.csp_vendor}</TableCell>
                      <TableCell>{br.longitude}</TableCell>
                      <TableCell>{br.latitude}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {/* </Container> */}
    </>
  );
};

export default ViewCSP;
