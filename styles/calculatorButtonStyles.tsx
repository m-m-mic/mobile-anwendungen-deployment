import { StyleSheet } from "react-native";

export const calculatorButtonStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 92,
    overflow: "hidden",
  },
  label: {
    fontFamily: "Schibsted-Grotesk",
    fontWeight: "600",
    fontSize: 42,
    lineHeight: 52,
    height: "auto",
    color: "#3d3d3d",
  },
  wrapperHorizontal: {
    flex: 1,
    borderRadius: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  labelHorizontal: {
    fontFamily: "Schibsted-Grotesk",
    fontWeight: "600",
    fontSize: 36,
    lineHeight: 46,
    color: "#3d3d3d",
  },
  input: {
    backgroundColor: "#ffffff",
  },
  operator: {
    backgroundColor: "#8747f1",
    color: "white",
  },
  result: {
    backgroundColor: "#6300ff",
    color: "white",
  },
  clear: {
    backgroundColor: "#3d3d3d",
    color: "white",
  },
  blank: {
    backgroundColor: "#9d9d9d",
  },
});
