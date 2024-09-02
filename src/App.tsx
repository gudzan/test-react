import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./layouts/mainPage";
import ProductPage from "./layouts/productPage";

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/products/:productId" component={ProductPage} />
                <Route path="/products" component={MainPage} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}
export default App;
