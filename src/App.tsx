import {Header} from "./Component/Header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {HomePage} from "./Component/HomePage/HomePage";
import {Provider} from "react-redux";
import store from "./redux/strore";
import React from "react";
import {SearchContent} from "./Component/SearchMovies/SearchContent";

import Footer from "./Component/Footer/Footer";

import {Page404} from "./Component/Page404/Page404";
import preloader from './assets/preloader.svg'


const AddReviews = React.lazy(() => import('./Component/Revews/Revews'))
const AddCast = React.lazy(() => import('./Component/Casts/Casts'))
const AddDetails = React.lazy(() => import('./Component/MovieDetails/MovieDetails'))

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Header/>
                <main className='mainPage'>
                    <Switch>
                        <Route path='/' exact>
                            <HomePage/>
                        </Route>
                        <Route exact path="/movies">
                            <SearchContent/>
                        </Route>
                        <Route path='/movies/:id' exact>
                            <React.Suspense fallback={<img src={preloader} alt='preloader'/>}>
                                <AddDetails/>
                            </React.Suspense>
                        </Route>
                        <Route path='/movies/:id/casts' exact>
                            <React.Suspense fallback={<img src={preloader} alt='preloader'/>}>
                                <AddCast/>
                            </React.Suspense>
                        </Route>
                        <Route path='/movies/:id/reviews' exact>
                            <React.Suspense fallback={<img src={preloader} alt='preloader'/>}>
                                <AddReviews/>
                            </React.Suspense>
                        </Route>
                        <Route>
                            <Page404/>
                        </Route>
                    </Switch>
                </main>
                <Footer/>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
