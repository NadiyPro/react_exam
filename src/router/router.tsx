import ErrorElement from "../layout/ErrorElement";
import MainLayout from "../layout/MainLayout";
import {createBrowserRouter} from "react-router-dom";
import React from "react";

export const router = createBrowserRouter(
    [
        {
            path:'/',
            element: <MainLayout/>,
            errorElement:<ErrorElement/>,
            children: [
                // {index: true, element: <UsersPage/>}
                // {path:'users', element: <UsersPage/>},
                // {path:'posts', element: <PostsPage/>},
                // {path:'comments', element: <CommentsPage/>},
                // {path:'users/:id', element: <User/>},
                // {path:'users/:id/posts', element: <Post/>},
                // {path:'posts/:id/comments', element: <Comment/>}
            ]
        }
    ]
)