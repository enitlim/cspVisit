"use client";

import TopNavBar from "@/app/CommonComponents/topNavBar";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getDocs, query, where, collection, addDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/SettingFirebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddUser = () => {
  const [branch, setBranch] = useState([]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: errors,
  } = useForm();
  const onSubmit = async (data) => {
    let br_code = data.br_name.split("-")[0];
    data.br_code = br_code;
    data.br_name = data.br_name.split("-")[1];
    data.region = data.reg_name;
    data.username = data.emp_id + "@tgbhyd.in";
    let password = data.emp_id + "@tgb";
    try {
      const user=await AddUser(data.username, password);
      // console.log("User Data=> ",user);
      data.uid=user.uid;
      try {
        const DocRef = await addDoc(
          collection(db, "employee_details_collection"),
          data
        );
        toast.success("User Is Created");
      } catch (error) {
        // console.log("Error While Adding the User Details=>", error.message);
        toast.error("Error While Adding the User Details");
      }
    } catch (error) {
      // console.log("Error While adding user Authentication=>", error.message);
      toast.error(`Error While adding user Authentication ${error.message}`);
    }
  };

  const getBranchs = async (reg) => {
    const q = query(
      collection(db, "branch_collection"),
      where("reg_name", "==", reg)
    );
    const branches = await getDocs(q);
    console.log(branches.size);
    const br = branches.docs.map((branch) => ({
      ...branch.data(),
    }));
    setBranch(br);
  };
  const AddUser = async (username, password) => {
    try {

      const apiCreateUser = await axios.post("/api/adduser", {
        email: username,
        password: password,
      });
      if (apiCreateUser.data.success === true) {
        return apiCreateUser.data.databody;
      } else {
        console.log(apiCreateUser.data.error);
      }
      //console.log("Raw API Response:", apiCreateUser); // Log the raw response
    } catch (error) {
      console.log("Error In Client side=>", error.message);
    }
  };

  return (
    <>
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
      <TopNavBar header="Add User" />
      <Box sx={{ padding: "10px", margin: "10px" }}>
        <Container maxWidth="md">
          <Typography variant="h4" color="initial" align="center" gutterBottom>
            Add CSP User
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="reg_name">Select Region</InputLabel>
                  <Controller
                    name="reg_name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        label="Select Region"
                        {...field}
                        fullWidth
                        onBlur={(e) => getBranchs(e.target.value)}
                        //getBranchs(e.target.value)
                      >
                        <MenuItem value="ADILABAD">ADILABAD</MenuItem>
                        <MenuItem value="NIRMAL">NIRMAL</MenuItem>
                        <MenuItem value="HYDERABAD-I">HYDERABAD-I</MenuItem>
                        <MenuItem value="HYDERABAD-II">HYDERABAD-II</MenuItem>
                        <MenuItem value="MANCHERIAL">MANCHERIAL</MenuItem>
                        <MenuItem value="KARIMNAGAR">KARIMNAGAR</MenuItem>
                        <MenuItem value="JAGTIAL">JAGTIAL</MenuItem>
                        <MenuItem value="NIZAMABAD">NIZAMABAD</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="br_name">Select Branch</InputLabel>
                  <Controller
                    name="br_name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select label="Select Branch" {...field} fullWidth>
                        {branch.map((ele) => (
                          <MenuItem
                            key={ele.br_code}
                            value={ele.br_code + "-" + ele.br_name}
                          >
                            {ele.br_code + "-" + ele.br_name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("emp_id", { required: true })}
                  label="Employee ID"
                  name="emp_id"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("emp_name", { required: true })}
                  label="Employee Name"
                  name="emp_name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("mobile", { required: true })}
                  label="Mobile Number"
                  name="mobile"
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="role">Role</InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select fullWidth {...field} label="Role">
                        <MenuItem value="BM">Branch Manager</MenuItem>
                        <MenuItem value="RO">Regional Business Office</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default AddUser;
