import React, { useEffect } from "react";
import "./App.css";
import { observer, inject } from "mobx-react";
import AppBar from "./Components/AppBar/AppBar";
import Snapshot from "./Components/SnapShot/Snapshot";
import Taskslist from "./Components/Tasks/Taskslist";
import { BrowserRouter as Router, Route } from "react-router-dom"; 
import Details from './Components/Details/Detail'
const App = inject("tasksManager")(
  observer((props) => {
    useEffect(() => {
      (async () => {
        await props.tasksManager.getTasks();
      })();
    }, []);

    return (
     <>
        <AppBar />
        <Snapshot />
        <Taskslist />
    </>
    );
  })
);

export default App;
