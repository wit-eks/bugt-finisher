import React, { useState } from 'react';
import './App.css';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { RaceResult } from './models/RaceResult';
import RaceResultEditor from './components/RaceResultEditor';



const App = () => {
  const [raceResult, setRecipe] = useState(new RaceResult(15*3600));

  return (
    <Container maxWidth="sm">
    <Box>
              <RaceResultEditor raceResult={raceResult} onRecipeChanged={setRecipe} />
              </Box>
        </Container>
  );
};

export default App;