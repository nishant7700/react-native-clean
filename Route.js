import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Text, View, Button, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { createDrawerNavigator } from '@react-navigation/drawer'

import RoutesNavigator from './RoutesNavigator'
import DrawerComponent from './src/shared/Routes/DrawerComponent'

const Drawer = createDrawerNavigator()

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerComponent {...props} />}>
      <Drawer.Screen name="MainHome" component={RoutesNavigator} />
    </Drawer.Navigator>
  )
}

const Route = ({ auth: { loading, isAuthenticated } }) => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(Route)
