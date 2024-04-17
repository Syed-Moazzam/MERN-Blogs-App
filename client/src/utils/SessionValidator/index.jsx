import { useDispatch, useSelector } from "react-redux";
import { deleteAuthenticatedUser } from "../../redux/user/userSlice";

const useSessionValidation = () => {
    const dispatch = useDispatch();
    const expirationTime = useSelector((state) => state?.user?.sessionExpirationTime);

    const isSessionValid = () => {
        if (!expirationTime || Date.now() > expirationTime) {
            dispatch(deleteAuthenticatedUser());
            return false;
        } else {
            return true;
        }
    };

    return isSessionValid;
};

export default useSessionValidation;