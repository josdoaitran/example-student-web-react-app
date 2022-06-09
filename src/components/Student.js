import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Container, Paper, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [students, setStudents] = useState([]);
  const classes = useStyles();
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [studentId, setStudentId] = useState("");
  let studentID = studentId;

  const handleClickAddStudent = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New Student added");
    });
  };

  const handleClickEditStudent = (e) => {
    e.preventDefault();
    const student = { "name": newName, "address": newAddress };
    fetch("http://localhost:8080/student/update_student_info/" + studentID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New Student added");
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/student/get_all")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);
  return (
    <Container>
      

      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>Add Student</u>
        </h1>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Student Adress"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleClickAddStudent}>
            Submit
          </Button>
        </form>
      </Paper>

      {/* Update Students */}
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>Update Student</u>
        </h1>

        <form className={classes.root} noValidate autoComplete="off">
        <TextField
            id="outlined-basic"
            label="Student ID"
            variant="outlined"
            fullWidth
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Update Student Name"
            variant="outlined"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Update Student Adress"
            variant="outlined"
            fullWidth
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleClickEditStudent}>
            Update
          </Button>
        </form>
      </Paper>
      <h1>Students</h1>

      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: "10px", padding: "15px", textAlign: "left" }}
            key={student.id}
          >
            Id:{student.id}
            <br />
            Name:{student.name}
            <br />
            Address:{student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
