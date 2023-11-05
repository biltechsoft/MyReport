import * as React from "react";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppStack from "./src/navigation/AppStack";
import AppStacks from "./src/navigation/AppStacks";

import SplashScreen from "./src/rootscreen/SplashScreen";
import SignInScreen from "./src/rootscreen/SignInScreen";
import SignUpScreen from "./src/rootscreen/SignUpScreen";

import RootStackScreen from "./src/navigation/RootStackScreen";
import storage from "./storage";
import CustomDrawer from "./src/navigation/CustomDrawer";
import DailyReport from "./src/screens/DailyReport";
import MonthlySummary from "./src/screens/MonthlySummary";
import MonthlyPlan from "./src/screens/MonthlyPlan";
import Accomplishment from "./src/screens/Accomplishment";
import Syllabus from "./src/screens/Syllabus";
import Counselor from "./src/screens/Counselor";
import Reviewee from "./src/screens/Reviewee";
import AccomplishmentR from "./src/screens/AccomplishmentR";
import Dashboard from "./src/screens/Dashboard";

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const Stack = createNativeStackNavigator();
  //new test collaborator

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: true
      }}
      >
        
        <Stack.Screen 
          name="SplashScreen" component={SplashScreen}
          options={{
            headerShown: false, // change this to `false`
          }}
           />
        <Stack.Screen
          name="AppStack"
          component={AppStack}
          options={{title: 'My Report', headerShown: false}}
        />
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: false}} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{title: 'Dashboard'}}/>
        <Stack.Screen name="DailyReport" component={DailyReport} options={{title: 'Daily Report'}}/>
        <Stack.Screen name="MonthlySummary" component={MonthlySummary} options={{title: 'Monthly Summary'}}/>
        <Stack.Screen name="MonthlyPlan" component={MonthlyPlan} options={{title: 'Monthly Plan'}}/>
        <Stack.Screen name="Accomplishment" component={Accomplishment} options={{title: 'Plan vs. Accomplishment'}}/>
        <Stack.Screen name="AccomplishmentR" component={AccomplishmentR} />
        <Stack.Screen name="Syllabus" component={Syllabus} options={{title: 'Syllabus'}}/>
        <Stack.Screen name="Counselor" component={Counselor} options={{title: 'Counselor'}}/>
        <Stack.Screen name="Reviewee" component={Reviewee} options={{title: 'Reviewee'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, marginTop: 50 },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
