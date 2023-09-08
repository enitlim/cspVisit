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


const AddCSP = () => {
    const {
      control,
      register,
      handleSubmit,
      watch,
      formState: errors,
    } = useForm();
  const [branch, setBranch] = useState([]);

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

      const onSubmit=async(data) => {
        data.csp_code=data.csp_code*1;
        data.br_code = (data.br_name.split("-")[0])*1;
        data.br_name=data.br_name.split("-")[1];
        data.csp_ssa_village = data.csp_village;

        console.log(data);
        try {
          await addDoc(collection(db,"csp_details_collection"),data);
          toast.success("CSP details added successfully")
        } catch (error) {
          toast.error("Error in adding CSP "+error.message)
        }
      }
  return (
    <>
      <TopNavBar header="Add CSP" />
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="CSP Code"
                  fullWidth
                  type="number"
                  {...register("csp_code", { required: true })}
                />
                {errors.csp_code && <span>This Field is required</span>}
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="CSP Name"
                  fullWidth
                  {...register("csp_name", { required: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CSP Phone"
                  fullWidth
                  {...register("csp_phone", { required: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CSP Terminal ID"
                  fullWidth
                  {...register("csp_teriminal_id", { required: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CSP Vendor"
                  fullWidth
                  {...register("csp_vendor", { required: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="csp_status">Select Status</InputLabel>
                  <Controller
                    name="csp_status"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select label="Select Status" {...field} fullWidth>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Disabled">Disabled</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CSP Village"
                  fullWidth
                  {...register("csp_village", { required: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CSP latitude"
                  fullWidth
                  {...register("latitude", { required: true })}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CSP longitude"
                  fullWidth
                  {...register("longitude", { required: true })}
                />
              </Grid>
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
            </Grid>
            <Button type="submit" variant="contained" color="secondary">
              Add
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default AddCSP