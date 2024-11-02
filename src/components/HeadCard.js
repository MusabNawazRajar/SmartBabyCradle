// HeadCard.js
import React from "react";
import { StyleSheet, View } from "react-native";
import CardTextSection from "./CardTextSection";

function HeadCard({ data }) {
  return (
    <View style={styles.container}>
      <CardTextSection data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: 345,
    borderRadius: 5,
    backgroundColor: "#0047AB",
    elevation: 8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
    
  },
});

export default HeadCard;
