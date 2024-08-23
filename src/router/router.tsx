import ErrorElement from "../layout/ErrorElement";
import MainLayout from "../layout/MainLayout";
import {createBrowserRouter} from "react-router-dom";
import React from "react";
import PokemonAllComponent from "../component/PokemonAllComponent";
import PokemonId from "../component/PokemonId";
import FormPokemon from "../component/FormPokemon";
import Search from "../component/Search";

export const router = createBrowserRouter(
    [
        {
            path:'/',
            element: <MainLayout/>,
            errorElement:<ErrorElement/>,
            children: [
                {index: true, element: <PokemonAllComponent/>},
                {path:'/pokemon/:name', element: <PokemonId/>},
                {path:'/pokemon-form/:name', element: <FormPokemon/>},
                {path:'/search/:name', element: <Search/>}
                // {path:'users/:id', element: <User/>},
                // {path:'users/:id/posts', element: <Post/>},
                // {path:'posts/:id/comments', element: <Comment/>}
            ]
        }
    ]
)