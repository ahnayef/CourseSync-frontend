import { ToastAndroid } from "react-native";

export const toastError = (message: string) => {
    ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
    );
}