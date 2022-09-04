class Api {

    API_URL = "http://zaliczenie.btry.eu/"

    static registerAction = async (props) => {
        const {email, firstname, index, password, confirmPassword} = props
    }

    static loginAction = async (props) => {
        const {email, password} = props
    }
}

export default Api;