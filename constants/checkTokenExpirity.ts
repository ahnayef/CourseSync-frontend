import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        const decoded = jwtDecode(token);
        if (!decoded || !decoded.exp) {
            return true;
        }

        if (decoded.exp * 1000 < Date.now()) {
            return true;
        }
    }
};

export default isTokenExpired;