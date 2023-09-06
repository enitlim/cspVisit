"use client";
import TopNavBar from "@/app/CommonComponents/topNavBar";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getDocs, query, collection, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/SettingFirebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = () => {
  const [empID, setEmpID] = useState("");
  const [fetchedID, setFetchedID] = useState([]);
const [branch, setBranch] = useState([]);
  const [showDiv, setShowDiv] = useState(true);
  const {
    reset,
    handleSubmit,
    control,
    register,
    formState: errors,
  } = useForm();

  const handleSearch = async (id) => {
    // console.log(id);
    const empQry = await getDocs(
      query(
        collection(db, "employee_details_collection"),
        where("emp_id", "==", id)
      )
    );
    const empData = empQry.docs.map((doc) => ({
        id:doc.id,
      ...doc.data(),
    }));
    setFetchedID(empData);
    if (empData.length > 0) {
      getBranchs(empData[0].region);
      reset({
        reg_name: empData[0].region,
        br_name: empData[0].br_code + "-" + empData[0].br_name,
        role: empData[0].role,
        mobile: empData[0].mobile,
      });
    }  
  };

  
  const getBranchs = async (reg) => {
    const branchQry =await getDocs(query(collection(db, "branch_collection"), where("reg_name","==",reg)));
    const branchData=branchQry.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
    }))
    setBranch(branchData);
  };
  const onUpdate = async (data) => {
    console.log(fetchedID[0].id);
    
    data.br_code=data.br_name.split("-")[0];
    data.br_name=data.br_name.split("-")[1];
    data.username = fetchedID[0].username;
    data.region = data.reg_name;
    console.log(data);
    try{
      const updateEmp = doc(db, "employee_details_collection", fetchedID[0].id);
      await updateDoc(updateEmp, data);
      toast.success("Updated employee details");
    }
    catch(error){
        toast.error("Error updating employee details");
    }
    
   
  };
console.log(fetchedID);
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
      <TopNavBar header="Update Employee" />
      <Container>
        <Box
          sx={{ marginTop: "10px", paddingTop: "10px", paddingBottom: "10px" }}
          alignContent="center"
        >
          <Grid container spacing={2}>
            <Grid item xs={0}>
              <TextField
                id="searchID"
                label="Enter ID"
                value={empID}
                onChange={(e) => setEmpID(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleSearch(empID)}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{ marginTop: "10px", paddingTop: "10px", paddingBottom: "10px" }}
          alignContent="center"
        >
          {fetchedID.length > 0 ? (
            <>
              <form onSubmit={handleSubmit(onUpdate)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl>
                      <TextField
                        name="emp_name"
                        {...register("emp_name")}
                        value={fetchedID[0].emp_name}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="reg_name">Select Region</InputLabel>
                      <Controller
                        value={fetchedID[0].region}
                        name="reg_name"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onBlur={(e) => getBranchs(e.target.value)}
                            label="Select Region"
                          >
                            <MenuItem value="ADILABAD">ADILABAD</MenuItem>
                            <MenuItem value="NIRMAL">NIRMAL</MenuItem>
                            <MenuItem value="HYDERABAD-I">HYDERABAD-I</MenuItem>
                            <MenuItem value="HYDERABAD-II">
                              HYDERABAD-II
                            </MenuItem>
                            <MenuItem value="MANCHERIAL">MANCHERIAL</MenuItem>
                            <MenuItem value="KARIMNAGAR">KARIMNAGAR</MenuItem>
                            <MenuItem value="JAGTIAL">JAGTIAL</MenuItem>
                            <MenuItem value="NIZAMABAD">NIZAMABAD</MenuItem>
                            <MenuItem value="HEAD OFFICE">HEAD OFFICE</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="br_name">Select Branch</InputLabel>

                      <Controller
                        defaultValue={
                          fetchedID[0].br_code + "-" + fetchedID[0].br_name
                        }
                        name="br_name"
                        control={control}
                        render={({ field }) => (
                          <Select {...field} label="Select Branch">
                            {branch.map((br) => (
                              <MenuItem
                                key={br.br_code}
                                value={br.br_code + "-" + br.br_name}
                              >
                                {br.br_code + "-" + br.br_name}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <TextField
                        name="phone"
                        label="Enter Phone Number"
                        fullWidth
                        defaultValue={fetchedID[0].mobile}
                        {...register("mobile")}
                      ></TextField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="role">Role</InputLabel>
                      <Controller
                        name="role"
                        control={control}
                        defaultValue={fetchedID[0].role}
                        render={({ field }) => (
                          <Select fullWidth {...field} label="Role">
                            <MenuItem value="BM">Branch Manager</MenuItem>
                            <MenuItem value="RO">
                              Regional Business Office
                            </MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </>
          ) : null}
        </Box>
      </Container>
    </>
  );
};

export default UpdateUser;
