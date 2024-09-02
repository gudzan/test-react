import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./layouts/mainPage";
import ProductPage from "./layouts/productPage";
import CreateProductPage from "./layouts/createProductPage";

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/create-product" component={CreateProductPage} />
                <Route path="/products/:productId" component={ProductPage} />
                <Route path="/products" component={MainPage} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}
export default App;
