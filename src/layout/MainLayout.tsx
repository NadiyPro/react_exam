import React from 'react';
import {Outlet} from "react-router-dom";
import {useForm} from "react-hook-form";

const MainLayout = () => {
    const {handleSubmit, register} = useForm();
    const registerHandle = () => console.log()

    return (
        <div>
            <form onSubmit={handleSubmit(registerHandle)}>
                <label>
                    <input type={"text"} {...register('name')} placeholder={'Enter the name of the pokemon or species or ability'}
                              className='input_FormComponent'/>
                </label>
                <button>Search</button>
            </form>
            <Outlet/>
        </div>
    );
};

export default MainLayout;