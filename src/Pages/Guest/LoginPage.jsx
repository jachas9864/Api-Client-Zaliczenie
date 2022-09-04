import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({login, user}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(user.auth) {
            navigate('/')
        }
    });

    const [errors, setErrors] = useState([]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validation = () => {
        const errors = [];
        setErrors(errors);
        if(email.length < 6) {
            errors.push('Email field have to have at least 6 symbols.')
        }
        if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            errors.push('Email field invalid.')
        }
        if(password.length < 6) {
            errors.push('Password requires minimum 6 symbols.')
        }
        return errors;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = validation();
        if(errors.length > 0) {
            return setErrors(errors);
        }
        login({email, password});
    }

    return (
        <>
            {errors.length > 0 && errors.map((err) => {
                return (
                    <p key={err}>
                        {err}
                    </p>
                )
            })}
            <h2> Login </h2>
            <form onSubmit={onSubmit}>
                <label>
                    Email: 
                    <input type="text" name="email" onChange={e => setEmail(e.target.value)} value={email}></input>
                </label><br />
                <label>
                    Password:
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password}></input>
                </label><br />              
                <input type="submit" value="Login"></input>
            </form>
        </>
    )
}

export default LoginPage;