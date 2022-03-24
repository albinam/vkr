import React from 'react';
import './App.css';
import VedomostSearch from "./pages/vedomost-search/vedomost-search";
import 'antd/dist/antd.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Vedomost from "./pages/vedomost/vedomost";
import {Provider} from "react-redux";
import store from "./redux/store";
import VedomostList from "./pages/vedomost-list/vedomost-list";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={VedomostSearch}/>
                        <Route exact path="/vedomosti" component={VedomostList}/>
                        <Route exact path="/vedomost" component={Vedomost}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
