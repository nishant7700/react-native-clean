import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token) => {
  // console.log("token", token);
  if (token) {
    api.defaults.headers.common = { Authorization: `Bearer ${token}` };
    // localStorage.setItem("token", token);
    const storeData = async () => {
      try {
        await AsyncStorage.setItem("TOKEN", token);
      } catch (e) {
        // saving error
      }
    };
    storeData();
  } else {
    delete api.defaults.headers.common["Authorization"];
    // localStorage.removeItem("token");
    const storeData = async () => {
      try {
        await AsyncStorage.removeItem("TOKEN");
      } catch (e) {
        // saving error
      }
    };
    storeData();
  }
};

export default setAuthToken;
