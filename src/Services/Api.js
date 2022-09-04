class Api {

    static registerAction = async (props) => {
        const {email, firstname, index, password, confirmPassword} = props

        return fetch('http://zaliczenie.btry.eu/api/Auth/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props)
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => error);
    }

    static loginAction = async (props) => {
        return fetch('http://zaliczenie.btry.eu/api/Auth/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props)
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => error);
    }

    static getCoursesAction = async (props) => {
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const token = user.token;

        return fetch('http://zaliczenie.btry.eu/api/Course', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => error);
    }

    static addCourseAction = async (props) => {
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const token = user.token;

        let bodyContent = new FormData();
        bodyContent.append("Title", props.Title);

        return fetch('http://zaliczenie.btry.eu/api/Course', {
            method: 'POST',
            headers: {
                'Accept': '*',
                'Authorization': `Bearer ${token}`
            },
            body: bodyContent
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => error);
    }

    static addCourseExamAction = async (props) => {
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const token = user.token;

        return fetch('http://zaliczenie.btry.eu/api/Exams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(props)
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => error);
    }

    static setPassExamStatus = async (props) => {
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const token = user.token;

        return fetch(`http://zaliczenie.btry.eu/api/Exams/${props.examId}`, {
            method: 'PUT',
            headers: {
                'Accept': '*',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => response.json())
        .then(data => data)
        .catch(error => error);
    }
}

export default Api;