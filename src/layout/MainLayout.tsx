import React from 'react';
import {Outlet} from "react-router-dom";

const MainLayout = () => {


    return (
        <div>
            <form >
                <label>
                    <input type={"text"} name={'search'} placeholder={'Enter the name of the pokemon or species or ability'}
                              className='input_FormComponent'/>
                </label>
                <button>Search</button>
            </form>
            <Outlet/>
        </div>
    );
};

export default MainLayout;