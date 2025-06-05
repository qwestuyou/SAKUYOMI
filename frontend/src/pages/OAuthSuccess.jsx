import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

export default function OAuthSuccess() {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    useEffect(() => {
        const token = params.get("token");
        if (token) {
            localStorage.setItem("access_token", token);
            navigate("/profile");
        } else {
            navigate("/login");
        }
    }, []);

    return <p className="text-center mt-10 text-gray-600">Logging in...</p>;
}
