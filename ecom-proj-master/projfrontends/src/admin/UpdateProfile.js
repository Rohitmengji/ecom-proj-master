import React, { useState, useEffect } from 'react';
import Menu from '../core/Menu';
import Footer from '../core/Footer'
import { isAutheticated } from "../auth/helper";
import { updateUser } from "./helper/adminapicall";

const TestUpdate = () => {

    const [Info, setInfo] = useState({
        name: "",
        email: "",
        error: "",
        success: false,
        loading:false

    })
    const { name, email, encry_password, error, success , loading } = Info


    const { user, token } = isAutheticated();

    const preload = () => {
        
        isAutheticated() && (
            setInfo({ ...Info, name: isAutheticated().user.name, email: isAutheticated().user.email, success: false })
        )
    }
    useEffect(() => {
        preload()
    }, [])


    const successMessage = () => {
        if (success) {
            return (
                <div className="alert alert-success text-center mt-3">
                    <h1>Update Successfully Please re-login</h1>
                </div>
            )
        }

    };
    const loadingMessage = () => {
        return (
          loading && (
            <div className="alert alert-info">
              <h2>Loading...</h2>
            </div>
          )
        );
      };
    const errorMessage = () => {
        if (error) {
            return (
                <div className="alert alert-danger mt-3">
                    <h1>{error} </h1>
                </div>
            )
        }
    };


    const handleChange = event => {
        setInfo({ ...Info, error: false, name: event.target.value })
    }
    const handleChange1 = event => {
        setInfo({ ...Info, error: false, email: event.target.value })
    }
    const handleChange2 = event => {
        setInfo({ ...Info, error: false, encry_password: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault();

        updateUser(user._id, token, Info).then(data => {
            if (!data || data.error) {
                setInfo({ error: " FAILD Please Try agian " })
            } else {
                console.log(data);
                setInfo({
                    ...Info,
                    name: "",
                    email: "",
                    encry_password: "",
                    error: false,
                    success: true
                })
            }
        })
    }

    return (
        <div>
            <Menu />
            <div className="ucontainer">
                <h2 className="ucontainer-hedding">hey <span>{name}!</span> Here is your Profile</h2>
                {errorMessage()}
                {successMessage()}
                <div className="ucontainer-info">
                    <h1 className="ucontainer-info-hedding"> User Profile</h1>
                    <div className="ucontainer-info-details">
                        <h3 className="ucontainer-info-details-name">Name : {name}</h3>
                        <h3 className="ucontainer-info-details-email">Email : {email}</h3>
                        <h3 className="ucontainer-info-details-purchased">Purchased : 0</h3>
                    </div>
                </div>
                <div className="ucontainer-update">
                    <h1 className="ucontainer-info-hedding"> Update Profile</h1>
                    <div className="ucontainer-update-details">
                        <form>
                            <h5 className="ucontainer-update-details-label">Name</h5>
                            <input type="text" onChange={handleChange} value={name} required className="ucontainer-update-details-input" />

                            <h5 className="ucontainer-update-details-label">Email</h5>

                            <input type="email" onChange={handleChange1} value={email} className="ucontainer-update-details-input" required />
                            <br />
                            <button type="submit"
                                onClick={onSubmit} className="center-form-button w">
                                Update
                        </button>
                        </form>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default TestUpdate;