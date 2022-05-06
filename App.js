import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { loadUser } from "./src/store/actions/auth";

import setAuthToken from "./src/domain/setAuthToken";
import Route from "./Route";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  useEffect(async () => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("TOKEN");
        if (value !== null) {
          // value previously stored
          return value;
        }
      } catch (e) {
        // error reading value
        return null;
      }
    };
    //then we will pass that token in setAuthToken method
    const token = await getData();
    console.log("TOKEN", token);

    setAuthToken(token);
    store.dispatch(loadUser());
  }, []);

  const [loaded] = useFonts({
    KhulaBold: require("./src/assets/fonts/Khula-Bold.ttf"),
    KhulaSemiBold: require("./src/assets/fonts/Khula-SemiBold.ttf"),
    KhulaRegular: require("./src/assets/fonts/Khula-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <StatusBar hidden={false} style="dark" animated />
          <Route />
        </View>
      </SafeAreaView>
    </Provider>
  );
}
