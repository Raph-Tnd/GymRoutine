import { View, Text } from "react-native";
import React from "react";
import GlobalStyle from "@/style/global/GlobalStyle";

export default function Header({ children }: { children: React.ReactElement }) {
	return <View style={GlobalStyle.header}>{children}</View>;
}
