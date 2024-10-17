import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
// import MovieDetail from "./Pages/DetailPage";
import ShowDetail from "./Pages/DetailPage";
import AddMember from "./Pages/AddMember";




const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Homepage />} />
        <Route path="/shows/:id" element={<ShowDetail/>} />
        <Route path="/add-member" element={<AddMember/>} /> 
      </Routes>
    </Router>
  );
};

export default App;
