import { useEffect } from "react";

const LogoutPage = ({logout}) => {

    useEffect(() => {
        return logout();
    });

    return <></>
}

export default LogoutPage;