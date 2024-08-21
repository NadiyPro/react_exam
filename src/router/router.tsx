import ErrorElement from "../layout/ErrorElement";
import MainLayout from "../layout/MainLayout";
import {createBrowserRouter} from "react-router-dom";
import React from "react";
import PokemonAllComponent from "../component/PokemonAllComponent";
import PokemonId from "../component/PokemonId";

export const router = createBrowserRouter(
    [
        {
            path:'/',
            element: <MainLayout/>,
            errorElement:<ErrorElement/>,
            children: [
                {index: true, element: <PokemonAllComponent/>},
                {path:'/pokemon/:name', element: <PokemonId/>}
                // {path:'posts', element: <PostsPage/>},
                // {path:'comments', element: <CommentsPage/>},
                // {path:'users/:id', element: <User/>},
                // {path:'users/:id/posts', element: <Post/>},
                // {path:'posts/:id/comments', element: <Comment/>}
            ]
        }
    ]
)