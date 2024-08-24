import ErrorElement from "../layout/ErrorElement";
import {createBrowserRouter} from "react-router-dom";
import React from "react";
import PokemonAllComponent from "../component/PokemonAllComponent";
import PokemonId from "../component/PokemonId";
import SpeciesPokemon from "../component/SpeciesPokemon";
import MainLayout from "../layout/MainLayout";


export const router = createBrowserRouter(
    [
        {
            path:'/',
            element: <MainLayout/>,
            errorElement:<ErrorElement/>,
            children: [
                {index: true, element: <PokemonAllComponent/>},
                {path:'/pokemon/:name', element: <PokemonId/>},
                {path:'/evolution-chain/:id', element: <SpeciesPokemon/>},
                // {path:'/search/:name', element: <Search/>}
            ]
        }
    ]
)