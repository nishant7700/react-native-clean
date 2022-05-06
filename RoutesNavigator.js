import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Text, View, Button, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import Home from "./src/Screens/home/Home";

import api from "./src/domain/api";

const commonScreens = {
  Home: Home,
};

const authScreens = {
  Home: Home,
};
const userScreens = {
  Home: Home,
};
const Stack = createStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert("Link to help")} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Article" component={Article} />
    </Stack.Navigator>
  );
};

const RoutesNavigator = ({ auth: { loading, isAuthenticated } }) => {
  // Notification
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      // console.log("ACTION TOKEN", token);

      const data = {
        expo_token: token,
      };
      api.post("/users/expo-token", data);
      // addExpoToken(data);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (expoPushToken) {
      const storeData = async (value) => {
        try {
          await AsyncStorage.setItem("TOKEN", value);
        } catch (e) {
          // saving error
        }
      };
      storeData(expoPushToken);
    }
  }, [expoPushToken]);

  // console.log(loading, isAuthenticated);
  return (
    <Stack.Navigator>
      {Object.entries({
        // Use the screens normally
        ...(loading
          ? commonScreens
          : isAuthenticated
          ? { ...userScreens }
          : { ...authScreens }),

        // Use some screens conditionally based on some condition
      }).map(([name, component]) => {
        return (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={{
              headerShown: false,
              cardStyle: {
                backgroundColor: "#fff",
              },
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
};
async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;
  // console.log("TOKEN", token);

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(RoutesNavigator);
