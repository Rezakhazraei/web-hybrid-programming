import { View, Text } from "react-native";
import React from "react";

interface GreeterProps {
    username: string;
}

export default function Greeter(props: GreeterProps) {
    return (
        <View>
            <Text>Greetings { props.username }</Text>
        </View>
    )
}