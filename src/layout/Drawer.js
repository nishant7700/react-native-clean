import React, { Fragment, useEffect, useState } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import * as yup from "yup";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { Block, Button, Icon, Input } from "galio-framework";
import { COLORS } from "../theme";
import { NavigationContainer } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
import { logout } from "../../actions/auth";
const Drawer = ({ showDrawer, setShowDrawer, navigation, logout }) => {
  return (
    <Block
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: width / 2,
        height: height,
        paddingVertical: 50,
        paddingHorizontal: 20,
        backgroundColor: COLORS.PRIMARY_COLOR,
      }}
    >
      <Block>
        <Block right>
          <Pressable onPress={() => setShowDrawer(false)}>
            <Icon name="close" family="font-awesome" color={"#000"} size={36} />
          </Pressable>
        </Block>
        <Pressable onPress={() => navigation.navigate("AlljobCards")}>
          <Text style={styles.navLinks}>Job Cards</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ViewAllUsers")}>
          <Text style={styles.navLinks}>Users</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ViewAllRole")}>
          <Text style={styles.navLinks}>Roles</Text>
        </Pressable>
        {/* <Pressable onPress={() => navigation.navigate("AlljobCards")}>
          <Text style={styles.navLinks}>Change Password</Text>
        </Pressable> */}
        <Pressable onPress={() => logout()}>
          <Text style={styles.navLinks}>Logout</Text>
        </Pressable>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  navLinks: {
    color: "#000",
    paddingVertical: 10,
    fontSize: 16,
    textTransform: "uppercase",
    fontFamily: COLORS.HEADING_FONT,
  },
});
const mapStateToProps = (state) => ({ alert: state.alert });

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
