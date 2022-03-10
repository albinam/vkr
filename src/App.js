import React from 'react';
import './App.css';
import JournalSearch from "./pages/journal-search/journal-search";
import 'antd/dist/antd.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import Journal from "./pages/journal/journal";

function App() {
  return (
    <div className="App">
        <HashRouter>
            <Switch>
                <Route exact path="/" component={JournalSearch}/>
                <Route exact path="/journal" component={Journal}/>
            </Switch>
        </HashRouter>
    </div>
  );
}

export default App;
