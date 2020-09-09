import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "mobx-react";
import { TasksManager } from "./Store/TasksManager";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
const font = "'Syne', sans-serif";
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#985E6D',
    },
    primary:{
      main:'#192231',
    }
  },
  typography: {
    fontFamily:font,
  },
});

const tasksManager = new TasksManager();
const store = { tasksManager };

ReactDOM.render(
  <Provider {...store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
