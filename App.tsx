import { Image, StatusBar, Text, TextInput, Vibration, View } from "react-native";
import { CalculatorButton } from "./components/CalculatorButton";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { verticalStyles } from "./styles/verticalStyles";
import { horizontalStyles } from "./styles/horizontalStyles";

type Operator = "+" | "-" | "×" | "÷" | "^";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Schibsted-Grotesk": require("./assets/fonts/SchibstedGrotesk-VariableFont.ttf"),
  });

  const [orientation, setOrientation] = useState(null);
  const [input, setInput] = useState("");
  const [storedNumber, setStoredNumber] = useState("");
  const [operator, setOperator] = useState(null);
  const [isResult, setIsResult] = useState(false);

  const VIBRATION_PATTERN = 150;

  // Code from here: https://blog.logrocket.com/managing-orientation-changes-react-native-apps/
  useEffect(() => {
    getCurrentOrientation();
    ScreenOrientation.addOrientationChangeListener(handleOrientationChange);
    return () => {
      ScreenOrientation.removeOrientationChangeListeners();
    };
  }, []);

  const handleOrientationChange = (event): void => {
    setOrientation(event.orientationInfo.orientation);
  };

  const getCurrentOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    setOrientation(orientation);
  };

  /**
   * Adds number or symbol to input
   * @param number
   */
  const addNumber = (number: string): void => {
    let currentInput = input;
    if (isResult) currentInput = "";
    setIsResult(false);
    if (number === "." && input.includes(".")) return;
    let cleanNewInput = (currentInput + number).replaceAll(",", "");
    setInput(formatNumber(cleanNewInput));
  };

  /**
   * Sets operator of calculation
   * @param operator
   */
  const addOperator = (operator: Operator): void => {
    if (input === "" && storedNumber === "" && operator === "-") {
      setInput("-");
      return;
    }
    if (validateNumber(input)) {
      if (storedNumber != "") {
        calculate(true);
      } else {
        setStoredNumber(formatNumber(input));
        clear();
      }
      setOperator(operator);
    } else if (input === "" && storedNumber != "" && operator) {
      setOperator(operator);
      setIsResult(false);
    } else {
      Vibration.vibrate(VIBRATION_PATTERN);
    }
  };

  /**
   * Calculates result
   * @param interim
   */
  const calculate = (interim = false): void => {
    if (validateNumber(input) && validateNumber(storedNumber) && operator) {
      if (input === "0") {
        Vibration.vibrate(VIBRATION_PATTERN);
        return;
      }
      let cleanInput = input.replaceAll(",", "");
      let cleanStoredNumber = storedNumber.replaceAll(",", "");
      if (interim) {
        switch (operator) {
          case "+":
            clear();
            setStoredNumber(formatNumber((parseFloat(cleanStoredNumber) + parseFloat(cleanInput)).toString()));
            return;
          case "-":
            clear();
            setStoredNumber(formatNumber((parseFloat(cleanStoredNumber) - parseFloat(cleanInput)).toString()));
            return;
          case "×":
            clear();
            setStoredNumber(formatNumber((parseFloat(cleanStoredNumber) * parseFloat(cleanInput)).toString()));
            return;
          case "÷":
            clear();
            setStoredNumber(formatNumber((parseFloat(cleanStoredNumber) / parseFloat(cleanInput)).toString()));
            return;
          case "^":
            clear();
            setStoredNumber(formatNumber((parseFloat(cleanStoredNumber) ** parseFloat(cleanInput)).toString()));
            return;
        }
      } else {
        switch (operator) {
          case "+":
            allClear();
            setInput(formatNumber((parseFloat(cleanStoredNumber) + parseFloat(cleanInput)).toString()));
            setIsResult(true);
            return;
          case "-":
            allClear();
            setInput(formatNumber((parseFloat(cleanStoredNumber) - parseFloat(cleanInput)).toString()));
            setIsResult(true);
            return;
          case "×":
            allClear();
            setInput(formatNumber((parseFloat(cleanStoredNumber) * parseFloat(cleanInput)).toString()));
            setIsResult(true);
            return;
          case "÷":
            allClear();
            setInput(formatNumber((parseFloat(cleanStoredNumber) / parseFloat(cleanInput)).toString()));
            setIsResult(true);
            return;
          case "^":
            allClear();
            setInput(formatNumber((parseFloat(cleanStoredNumber) ** parseFloat(cleanInput)).toString()));
            setIsResult(true);
            return;
        }
      }
    } else {
      Vibration.vibrate(VIBRATION_PATTERN);
    }
  };

  /**
   * Removes last symbol/number from input
   */
  const removeLast = (): void => {
    let cleanAndRemovedInput = input.replaceAll(",", "").slice(0, -1);
    setInput(formatNumber(cleanAndRemovedInput));
  };

  /**
   * Clears input
   */
  const clear = (): void => {
    setInput("");
    setIsResult(false);
  };

  /**
   * Clears all states
   */
  const allClear = (): void => {
    setInput("");
    setOperator(null);
    setStoredNumber("");
    setIsResult(false);
  };

  /**
   * Adds thousands separator commas to numbers
   * @param number
   */
  const formatNumber = (number: string): string => {
    if (number.includes(".")) {
      let splitNumber = number.split(".");
      let before = splitNumber[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      let after = splitNumber[1];
      return before + "." + after;
    } else {
      return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  /**
   * Checks if number actually contains numbers
   * @param number
   */
  const validateNumber = (number: string) => {
    return /[0-9]/.test(number);
  };

  if (!fontsLoaded) {
    return null;
  } else {
    if (orientation === 1) {
      return (
        <View style={verticalStyles.container}>
          <StatusBar animated={true} backgroundColor={"#beb7dc"} />
          <View style={verticalStyles.calculator}>
            <View style={verticalStyles.display}>
              <View style={verticalStyles.storage}>
                <TextInput style={verticalStyles.storedNumber} editable={false} value={storedNumber} />
                <Text style={verticalStyles.operator}>{operator}</Text>
              </View>
              <TextInput style={verticalStyles.input} editable={false} value={input} />
            </View>
            <View style={verticalStyles.numpad}>
              <View style={verticalStyles.numrow}>
                <CalculatorButton label={"AC"} buttonType="clear" onPress={() => allClear()} />
                <CalculatorButton label={"C"} buttonType="clear" onPress={() => clear()} />
                <CalculatorButton label={"^"} buttonType="operator" onPress={() => addOperator("^")} />
                <CalculatorButton label={"÷"} buttonType="operator" onPress={() => addOperator("÷")} />
              </View>
              <View style={verticalStyles.numrow}>
                <CalculatorButton label={"7"} buttonType="input" onPress={() => addNumber("7")} />
                <CalculatorButton label={"8"} buttonType="input" onPress={() => addNumber("8")} />
                <CalculatorButton label={"9"} buttonType="input" onPress={() => addNumber("9")} />
                <CalculatorButton label={"×"} buttonType="operator" onPress={() => addOperator("×")} />
              </View>
              <View style={verticalStyles.numrow}>
                <CalculatorButton label={"4"} buttonType="input" onPress={() => addNumber("4")} />
                <CalculatorButton label={"5"} buttonType="input" onPress={() => addNumber("5")} />
                <CalculatorButton label={"6"} buttonType="input" onPress={() => addNumber("6")} />
                <CalculatorButton label={"-"} buttonType="operator" onPress={() => addOperator("-")} />
              </View>
              <View style={verticalStyles.numrow}>
                <CalculatorButton label={"1"} buttonType="input" onPress={() => addNumber("1")} />
                <CalculatorButton label={"2"} buttonType="input" onPress={() => addNumber("2")} />
                <CalculatorButton label={"3"} buttonType="input" onPress={() => addNumber("3")} />
                <CalculatorButton label={"+"} buttonType="operator" onPress={() => addOperator("+")} />
              </View>
              <View style={verticalStyles.numrow}>
                <CalculatorButton label={"0"} buttonType="input" onPress={() => addNumber("0")} />
                <CalculatorButton label={"."} buttonType="input" onPress={() => addNumber(".")} />
                <CalculatorButton
                  icon={<Image style={verticalStyles.icon} source={require("./assets/backspace_icon.png")} />}
                  buttonType="input"
                  onPress={() => removeLast()}
                />
                <CalculatorButton label={"="} buttonType="result" onPress={() => calculate()} />
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={horizontalStyles.container}>
          <StatusBar animated={true} backgroundColor={"#beb7dc"} />
          <View style={horizontalStyles.calculator}>
            <View style={horizontalStyles.display}>
              <View style={horizontalStyles.storage}>
                <Text style={horizontalStyles.storedNumber}>{storedNumber}</Text>
                <Text style={horizontalStyles.operator}>{operator}</Text>
              </View>
              <TextInput style={horizontalStyles.input} editable={false} value={input} />
            </View>
            <View style={horizontalStyles.numpad}>
              <View style={horizontalStyles.numrow}>
                <CalculatorButton label={"7"} orientation="landscape" buttonType="input" onPress={() => addNumber("7")} />
                <CalculatorButton label={"8"} orientation="landscape" buttonType="input" onPress={() => addNumber("8")} />
                <CalculatorButton label={"9"} orientation="landscape" buttonType="input" onPress={() => addNumber("9")} />
                <CalculatorButton label={"AC"} orientation="landscape" buttonType="clear" onPress={() => allClear()} />
                <CalculatorButton label={"C"} orientation="landscape" buttonType="clear" onPress={() => clear()} />
              </View>
              <View style={horizontalStyles.numrow}>
                <CalculatorButton label={"4"} orientation="landscape" buttonType="input" onPress={() => addNumber("4")} />
                <CalculatorButton label={"5"} orientation="landscape" buttonType="input" onPress={() => addNumber("5")} />
                <CalculatorButton label={"6"} orientation="landscape" buttonType="input" onPress={() => addNumber("6")} />
                <CalculatorButton label={"+"} orientation="landscape" buttonType="operator" onPress={() => addOperator("+")} />
                <CalculatorButton label={"×"} orientation="landscape" buttonType="operator" onPress={() => addOperator("×")} />
              </View>
              <View style={horizontalStyles.numrow}>
                <CalculatorButton label={"1"} orientation="landscape" buttonType="input" onPress={() => addNumber("1")} />
                <CalculatorButton label={"2"} orientation="landscape" buttonType="input" onPress={() => addNumber("2")} />
                <CalculatorButton label={"3"} orientation="landscape" buttonType="input" onPress={() => addNumber("3")} />
                <CalculatorButton label={"-"} orientation="landscape" buttonType="operator" onPress={() => addOperator("-")} />
                <CalculatorButton label={"÷"} orientation="landscape" buttonType="operator" onPress={() => addOperator("÷")} />
              </View>
              <View style={horizontalStyles.numrow}>
                <CalculatorButton label={"0"} orientation="landscape" buttonType="input" onPress={() => addNumber("0")} />
                <CalculatorButton label={"."} orientation="landscape" buttonType="input" onPress={() => addNumber(".")} />
                <CalculatorButton
                  icon={<Image style={horizontalStyles.icon} source={require("./assets/backspace_icon.png")} />}
                  orientation="landscape"
                  buttonType="input"
                  onPress={() => removeLast()}
                />
                <CalculatorButton label={"^"} orientation="landscape" buttonType="operator" onPress={() => addOperator("^")} />
                <CalculatorButton label={"="} orientation="landscape" buttonType="result" onPress={() => calculate()} />
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}
