import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example"));

    return (
        <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>

            <input defaultValue={loggedInUser.displayName} {...register("name", { required: true })} placeholder='Your Name' /> <br></br>
            {errors.name && <span style={{ color: 'red' }} >Name field is required</span>}

            <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder='Your Email' /> <br></br>
            {errors.email && <span style={{ color: 'red' }} >Email is required</span>}

            <input  {...register("address", { required: true })} placeholder='Your Addrss' /> <br></br>
            {errors.address && <span style={{ color: 'red' }} >Addrss is required</span>}

            <input {...register("phone", { required: true })} placeholder='Your Phone No' /> <br></br>
            {errors.phone && <span style={{ color: 'red' }} >Phone No is required</span>}

            <input className='submit' type="submit" />
        </form>
    );
};

export default Shipment;