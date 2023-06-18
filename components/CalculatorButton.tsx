import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import { calculatorButtonStyles } from "../styles/calculatorButtonStyles";

type ButtonType = "input" | "operator" | "result" | "clear" | "blank";

type OrientationType = "portrait" | "landscape";

interface CalculatorButtonProps {
  label?: string;
  icon?: JSX.Element;
  buttonType?: ButtonType;
  onPress?: (event: GestureResponderEvent) => void;
  orientation?: OrientationType;
}

export function CalculatorButton({
  label,
  icon,
  onPress,
  buttonType = "blank",
  orientation = "portrait",
}: CalculatorButtonProps) {
  const getStyles = (component: string) => {
    let styles;
    if (orientation === "portrait") {
      if (component === "pressable") styles = [calculatorButtonStyles.wrapper];
      if (component === "text") styles = [calculatorButtonStyles.label];
    } else {
      if (component === "pressable") styles = [calculatorButtonStyles.wrapperHorizontal];
      if (component === "text") styles = [calculatorButtonStyles.labelHorizontal];
    }
    switch (buttonType) {
      case "input":
        styles.push(calculatorButtonStyles.input);
        return styles;
      case "operator":
        styles.push(calculatorButtonStyles.operator);
        return styles;
      case "result":
        styles.push(calculatorButtonStyles.result);
        return styles;
      case "clear":
        styles.push(calculatorButtonStyles.clear);
        return styles;
      case "blank":
        styles.push(calculatorButtonStyles.blank);
        return styles;
    }
  };

  return (
    <TouchableOpacity activeOpacity={buttonType === "blank" ? 1 : 0.7} style={getStyles("pressable")} onPress={onPress}>
      {label && <Text style={getStyles("text")}>{label}</Text>}
      {icon}
    </TouchableOpacity>
  );
}
