"use client";
import TopNavBar from "@/app/CommonComponents/topNavBar";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../firebase/SettingFirebase";
import { getDoc, doc, updateDoc,onSnapshot } from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import AddParameter from "./addParameter";


const CspParameter = () => {
  const [parameterData, setParameterData] = useState([]);
  const [parameterDataRaw, setParameterDataRaw] = useState({});
  const [isAddParameterModalOpen, setIsAddParameterModalOpen] = useState(false);
  
const [paraDataCount, setParaDataCount] = useState(0);

console.log("Count-", paraDataCount);
  useEffect(() => {
    console.log(isAddParameterModalOpen);
    const getPara = async () => {
      try {
        const snapshot = await getDoc(
          doc(
            db,
            "observational_parameters_collection",
            "observational_parameters_document"
          )
        );
        if (snapshot.exists()) {
          let tempAR = [];
          const snapshotData = snapshot.data().parameters_list;
          setParameterDataRaw(snapshotData);
          Object.entries(snapshotData).forEach((element) => {
            tempAR.push(element);
          });
          setParameterData(tempAR);
        } else {
          console.log("Not found");
        }
      } catch (error) {
        console.error("Error: " + error.message);
      }
    };
    getPara();
  }, []); 
  
  const refreshParameterList = async () => {
     try {
       const snapshot = await getDoc(
         doc(
           db,
           "observational_parameters_collection",
           "observational_parameters_document"
         )
       );
       if (snapshot.exists()) {
         let tempAR = [];
         const snapshotData = snapshot.data().parameters_list;
         setParameterDataRaw(snapshotData);
         Object.entries(snapshotData).forEach((element) => {
           tempAR.push(element);
           console.log("SnapShpt: " + element);
         });
         setParameterData(tempAR);
       } else {
         console.log("Not found");
       }
     } catch (error) {
       console.error("Error: " + error.message);
     }
  };

  const handleDelete=async(paraId) =>{
    console.log("ParameterData=",parameterData);
    let oldpara = parameterDataRaw;
    delete oldpara[paraId];
     const updateDocref = doc(
       db,
       "observational_parameters_collection",
       "observational_parameters_document"
     );
    try {
      await updateDoc(updateDocref, {
        parameters_list: oldpara,
      });
      try {
        const snapshot = await getDoc(
          doc(
            db,
            "observational_parameters_collection",
            "observational_parameters_document"
          )
        );
        if (snapshot.exists()) {
          let tempAR = [];
          const snapshotData = snapshot.data().parameters_list;
          setParameterDataRaw(snapshotData);
          Object.entries(snapshotData).forEach((element) => {
            tempAR.push(element);
            console.log("SnapShpt: " + element);
          });
          setParameterData(tempAR);
        } else {
          console.log("Not found");
        }
      } catch (error) {
        console.error("Error: " + error.message);
      }
      alert("Deleted")
    } catch (error) {
      alert("Error", error.message);
    }
    
  }

  return (
    <>
      <AddParameter
        open={isAddParameterModalOpen}
        onClose={() => setIsAddParameterModalOpen(false)}
        parameter={parameterDataRaw}
        refreshParameterList={refreshParameterList}
      />
      <TopNavBar header="CSP Parameter" />
      <Container sx={{ display: "flex" }}>
        <Box sx={{ padding: "10px" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsAddParameterModalOpen(true)}
          >
            Add Parameter
          </Button>
        </Box>

        <Box
          sx={{
            padding: "10px",
            margin: "10px",
            width: "80%",
            alignContent: "center",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl No</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Marks</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parameterData.length > 0 ? (
                  parameterData.map((value, index) => (
                    <TableRow key={index}>
                      {console.log("Here", parameterData)}
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{value[1].question}</TableCell>
                      <TableCell>{value[1].marks}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleDelete(value[0])}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

export default CspParameter;
