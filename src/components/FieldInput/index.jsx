import React, { useState } from "react";
import { FormControl, NumberInput, NumberInputField } from "@chakra-ui/react";
import { Field } from "formik";
import "./index.css";

const Component = ({ name, values, isReadOnly }) => {
  const [value, setValue] = useState(0);

  return (
    <Field name={name}>
      {({ field }) => {
        isReadOnly ? setValue(values) : setValue(field.value);
        return (
          <FormControl>
            <NumberInput
              size="lg"
              borderColor="#595959"
              isReadOnly={isReadOnly}
              value={value}
            >
              <NumberInputField
                {...field}
                _hover={{ borderColor: "#663A82" }}
                _active={{ borderColor: "#663A82" }}
                _focus={{ borderColor: "#663A82" }}
                borderColor="#663A82"
                color="#E4E5E7"
                focusBorderColor="none"
                fontSize="22px"
                id={name}
                letterSpacing="0.04em"
                placeholder="0.0"
              />
            </NumberInput>
          </FormControl>
        );
      }}
    </Field>
  );
};

Component.displayName = "FieldInput";
export default Component;
