import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { LoginScreen } from "./Screens/LoginScreen";
import { PostsScreen } from "./Screens/PostsScreen";
import { ProfileScreen } from "./Screens/ProfileScreen";
import { CreatePostsScreen } from "./Screens/CreatePostsScreen";
import { MapScreen } from "./Screens/MapScreen";
import { CommentsScreen } from "./Screens/CommentsScreen";
// import { Provider } from "react-redux";
// import store from "./redux/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="PostsScreen"
          component={PostsScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ProfileScreen"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "Створити публікацію",
          }}
          name="CreatePostsScreen"
          component={CreatePostsScreen}
        />
        <Stack.Screen
          options={
            {
              // headerShown: false,
              // headerTitle: "Створити публікацію",
            }
          }
          name="MapScreen"
          component={MapScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "Коментарі",
          }}
          name="CommentsScreen"
          component={CommentsScreen}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
    // </Provider>
  );
}
