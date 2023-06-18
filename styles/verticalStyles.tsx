import { StyleSheet } from "react-native";

export const verticalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e1f1",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  calculator: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 600,
    width: "100%",
    height: "100%",
  },
  display: {
    flex: 1,
    maxHeight: 350,
    justifyContent: "flex-end",
    backgroundColor: "#ffffff",
    borderRadius: 35,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  storage: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
  },
  storedNumber: {
    fontFamily: "Schibsted-Grotesk",
    textAlign: "right",
    fontSize: 42,
    color: "#3d3d3d",
    minWidth: 0,
  },
  operator: {
    fontFamily: "Schibsted-Grotesk",
    fontSize: 42,
    lineHeight: 50,
    color: "#6300ff",
  },
  input: {
    fontFamily: "Schibsted-Grotesk",
    textAlign: "right",
    fontSize: 68,
    height: 84,
    color: "#3d3d3d",
    minWidth: 0,
  },
  numpad: {
    marginTop: 20,
    gap: 10,
    display: "flex",
    flexDirection: "column",
  },
  numrow: {
    gap: 10,
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    width: 46,
    height: 46,
  },
});
