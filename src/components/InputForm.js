import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const InputForm = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30%",
    minWidth: 130,
    borderColor: "#D8D8D8",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    marginLeft: 5,
  },
});

export default InputForm;
