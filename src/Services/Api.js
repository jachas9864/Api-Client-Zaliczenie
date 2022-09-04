class Api {

    static registerAction = async (props) => {
        const {email, firstname, index, password, confirmPassword} = props

        return fetch('http://zaliczenie.btry.eu/api/Auth/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                firstName: firstname,
                indexNumber: index,
                password: password,
                confirmPassword: confirmPassword
            })
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => error);
    }

    static loginAction = async (props) => {
        const {email, password} = props

        return fetch('http://zaliczenie.btry.eu/api/Auth/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => error);
    }
}

export default Api;