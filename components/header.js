import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Header() {
    return (
        <View style={styles.main}>
            <Text style={styles.text}>Физика</Text> {/* Заголовок приложения */}
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#057dcd',
        display: "flex",
        height: "100px",
        alignItems: "center",
    },
    text: {
        paddingTop: '50px',
        fontFamily: 'Helvetica',
        fontSize: '24px',
        fontWeight: '700',
        color: '#ffffff',
    },
});