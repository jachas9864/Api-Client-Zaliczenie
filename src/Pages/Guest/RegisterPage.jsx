import { useState } from "react";

const RegisterPage = ({register}) => {

    const [errors, setErrors] = useState([]);

    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [index, setIndex] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validation = () => {
        const errors = [];
        setErrors(errors);
        if(email.length < 6) {
            errors.push('Email field have to have at least 6 symbols.')
        }
        if(!email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            errors.push('Email field invalid.')
        }
        if(firstname.length < 3) {
            errors.push('Firstname field have to have at least 6 symbols.')
        }
        if(index.length !== 6) {
            errors.push('Index field has exactly 6 symbols.')
        }
        if(password.length < 6) {
            errors.push('Password requires minimum 6 symbols.')
        }
        if(password !== confirmPassword) {
            errors.push('Password should be the same.')
        }
        return errors;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = validation();
        if(errors.length > 0) {
            return setErrors(errors);
        }
        register({email, firstname, index, password, confirmPassword});
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
            <h2> Register </h2>
            <form onSubmit={onSubmit}>
                <label>
                    Email: 
                    <input type="text" name="email" onChange={e => setEmail(e.target.value)} value={email}></input>
                </label><br />
                <label>
                    Firstname: 
                    <input type="text" name="firstname" onChange={e => setFirstname(e.target.value)} value={firstname}></input>
                </label><br />
                <label>
                    Index: 
                    <input type="text" name="index" onChange={e => setIndex(e.target.value)} value={index}></input>
                </label><br />                
                <label>
                    Password:
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password}></input>
                </label><br />              
                <label>
                    Repeat Password:
                    <input type="password" name="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}></input>
                </label><br />

                <input type="submit" value="Register"></input>
            </form>
        </>
    )
}

export default RegisterPage;