import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
GoogleSignin.configure({
  webClientId: "YOUR_GOOGLE_WEB_CLIENT_ID", 
});
const loginGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo); 
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log("User cancelled the login");
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log("Sign-in in progress");
    } else {
      console.error(error);
    }
  }
};
import AppleAuthentication from "@invertase/react-native-apple-authentication";
const loginApple = async () => {
  try {
    const appleAuthRequestResponse = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    const { identityToken, authorizationCode } = appleAuthRequestResponse;
    console.log(identityToken, authorizationCode);
  } catch (error) {
    console.error("Apple Sign-In failed: ", error);
  }
};