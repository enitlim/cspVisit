"use client";
import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import TopNavBar from "@/app/CommonComponents/topNavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../../../firebase/SettingFirebase";
import TableShow from "./showTable";
import {LoadingTable} from "../../CommonComponents/loadingComponent"
const LocationNotMatched = () => {
    interface CSPDetail{
        csp_name: string;
        br_code:number;
        csp_code:number;


    }
  interface CSPDocument {
    id: string;
    br_name: string;
    reg_name: string;
    csp_phone: string;
    csp_status: string;
    csp_details: CSPDetail;
    csp_vendor: string;
    csp_village: string;
    csp_distance: string;
    visit_date_time: string;
    visit_latitude: string;
    visit_longitude: string;
    emp_id: string;
  }
  const [seldate, setSelDate] = useState<Date | null>(null);
  const [cspDetails, setcspDetails] = useState<CSPDocument[]>([]);
  const [loading, setloading] = useState<Boolean>(false);
  const [intloading, setintloading] = useState<Boolean>(true);
  const getCSPData = async () => {
    setintloading(false)
    if (seldate === null) {
      toast.error("Select the Month and Date");
    } else {
        let SelectedDate:Date= new Date(seldate);

      var visit_month = `${SelectedDate.getFullYear()}-${SelectedDate.getMonth()+1}`;

    //   console.log(visit_month);

      try {
        setloading(true);
        const cspSnapshot = await getDocs(
          query(
            collection(db, "csp_visit_collection"),
            where("csp_distance", ">", "2"),
            where("visit_month", "==", visit_month)
          )
        );
        const cspData: CSPDocument[] = [];
        cspSnapshot.forEach((doc) => {
          const documentData = doc.data() as CSPDocument;
          cspData.push({ ...documentData, id: doc.id });
        });
        setcspDetails(cspData);
        setloading(false);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  
  return (
    <>
      <TopNavBar header="CSP Location Not Matched" />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container>
        <Box sx={{ padding: "10px", margin: "10px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label={'"month" and "year"'}
                    views={["month", "year"]}
                    onChange={(date: Date | null) => setSelDate(date)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={getCSPData}>
                Show Data
              </Button>
            </Grid>
            <Grid item xs={12}>
              {intloading ? (
                <></>
              ) : loading ? (
                <>
                  <LoadingTable loadingMessage="Loading CSP with Location not Matching"/>
                </>
              ) : (
                <>
                  {cspDetails.length > 0 ? (
                    <>
                      <TableShow cspdata={cspDetails} />
                    </>
                  ) : (
                    <>
                      <Typography variant="h3" sx={{ textAlign: "center" }}>
                        No Data Found
                      </Typography>
                    </>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default LocationNotMatched;
