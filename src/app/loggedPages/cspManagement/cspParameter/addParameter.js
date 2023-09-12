import React, { useState,useEffect } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../../../firebase/SettingFirebase";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const AddParameter = ({ open, onClose, parameter, refreshParameterList }) => {
  const [paraData, setParaData] = useState({
    ref: "",
    question: "",
    marks: "",
  });
  const [existingpara, setexistingpara] = useState({});
  //   console.log(paraData);
  useEffect(() => {
    // Set the initial form data when the modal is opened
    if (open) {
      setParaData({ ref: "", question: "", marks: "" });
      setexistingpara({ ...parameter });
    }
  }, [open]);
  const handleAddPara = async () => {
    console.log("Before Adding", existingpara);
    paraData.correct_answer = "Yes";
    console.log(paraData);
    let ref = paraData.ref;
    delete paraData.ref;
    existingpara[ref] = paraData;
    console.log("After Adding", existingpara);
    const updateDocref = doc(
      db,
      "observational_parameters_collection",
      "observational_parameters_document"
    );
    const updatepara = await updateDoc(updateDocref, {
      parameters_list: existingpara,
    });
    await refreshParameterList();
    setParaData({ ref: "", question: "", marks: "" });
    onClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "50%",
            height: "50%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ textAlign: "center", padding: 10 }}
          >
            Add a Paramter
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="Enter Question"
                fullWidth
                value={paraData.question}
                onChange={(e) => {
                  setParaData({ ...paraData, question: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Enter Reference Number"
                fullWidth
                value={paraData.ref}
                onChange={(e) => {
                  setParaData({ ...paraData, ref: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Enter Marks"
                fullWidth
                value={paraData.marks}
                onChange={(e) => {
                  setParaData({ ...paraData, marks: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddPara}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default AddParameter;
