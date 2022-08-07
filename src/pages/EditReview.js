import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { useAuth } from '../hooks/useAuth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

import StarRating from './components/StarRating';
import LabelledStarRating from './components/LabelledStarRating';

export default function EditReview() {
  const { user } = useAuth();
  const { docId } = useParams();
  const navigate = useNavigate();
  // review input hooks
  const [module, setModule] = useState('');
  const [prof, setProf] = useState('');
  const [text, setText] = useState('');
  const [sem, setSem] = useState('');
  const [rating, setRating] = useState(3);
  const [difficulty, setDifficulty] = useState(3);
  const [workload, setWorkload] = useState(3);

  useEffect(() => {
    const getReview = async () => {
      const docRef = doc(db, "modreviews", docId); // TODO
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // check if current uid and document's uid matches
        if (user.uid !== docSnap.data().uid) {
          window.location.replace('/errorpage');
        }
        // set all data here
        setModule(docSnap.data().module);
        setProf(docSnap.data().prof);
        setSem(docSnap.data().sem);
        setRating(docSnap.data().rating);
        setDifficulty(docSnap.data().difficulty);
        setWorkload(docSnap.data().workload);
        setText(docSnap.data().text);
      } else {
        // doc.data() will be undefined in this case
          window.location.replace('/errorpage');
      }
    }
    getReview();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = event => {
    // Prevents page from refreshing.
    event.preventDefault();
    // Add a new document with user's name and inputted text.
    const docRef = async () => { await setDoc(doc(db, "modreviews", docId), {
      user: user.displayName,
      uid: user.uid,
      module: module,
      prof: prof,
      sem: sem,
      rating: rating,
      difficulty: difficulty,
      workload: workload,
      text: text,
    })};
    docRef();
    console.log("Document written");
    // Redirect to reviews page after submission.
    navigate("../reviewsubmitted");
  }
  
  return (
    <div className="wrapper">
      <h2>Updating Review</h2>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" spacing={2}>
          {/* Module details inputs */}
          <Grid item xs={2}>
            <span>Module:</span>
          </Grid>
          <Grid item xs={10}>
            <span>{module}</span>
          </Grid>

          <Grid item xs={2}>
            <span>Professor:</span>
          </Grid>
          <Grid item xs={10}>
            <TextField required label="Write professor's full name here..."
              value={prof} onChange={(e) => setProf(e.target.value)} />
          </Grid>

          <Grid item xs={2}>
            <span>Semester:</span>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="outlined-select-semester"
              select
              required
              label="Select"
              value={sem}
              onChange={(event) => {setSem(event.target.value);}}
              helperText="Please select your semester"
            >
              {semesters.map((option) => (
                <MenuItem key={option.key} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          {/* Ratings */}
          <Grid item xs={2}>
            <span>Rating:</span>
          </Grid>
          <Grid item xs={10}>
            <StarRating setRating={setRating} initial={rating} />
          </Grid>

          <Grid item xs={2}>
            <span>Difficulty:</span>
          </Grid>
          <Grid item xs={10}>
            <LabelledStarRating setRating={setDifficulty} initial={difficulty} />
          </Grid>

          <Grid item xs={2}>
            <span>Workload:</span>
          </Grid>
          <Grid item xs={10}>
            <LabelledStarRating setRating={setWorkload} initial={workload} />
          </Grid>

          {/* Review text input */}
          <Grid item xs={2}>
            <span>Review:</span>
          </Grid>
          <Grid item xs={10}>
            <TextField required multiline fullWidth label="Write review here..."
              value={text} onChange={(e) => setText(e.target.value)} />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">Update</Button>
      </form>
    </div>
  );

}

const semesters = [
  { label: "AY 21/22 Sem 1", key: 21221 },
  { label: "AY 21/22 Sem 2", key: 21222 }
]