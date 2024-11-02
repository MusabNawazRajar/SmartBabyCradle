import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CardTextSection({ data }) {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.valueText}>{item.value}</Text>
          <Text style={styles.titleText}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "90%",
    width: "100%",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  valueText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});
