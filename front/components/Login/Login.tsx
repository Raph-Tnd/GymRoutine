import { View, Text } from "react-native";
import React from "react";
import { GoogleSign } from "@/services/Auth/GoogleSign";
import indexStyle from "@/style/indexStyle";

export default function Login() {
  return (
    <View style={indexStyle.body}>
      <Text>Login</Text>
      <GoogleSign />
    </View>
  );
}
