import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './App';
import { FirebaseContext } from './Store/Context';
import { Firebase } from './Firebase/Config';
import Context from './Store/Context';
import Post from './Store/PostContext';
import SearchItems from './Store/SearchContext';


ReactDOM.render(
    <FirebaseContext.Provider value={{ Firebase }}>
        <Post>
            <Context>
                <SearchItems>
                <RouterProvider router={AppRouter} />
                </SearchItems>
            </Context>
        </Post>
    </FirebaseContext.Provider>
    , document.getElementById('root'));
