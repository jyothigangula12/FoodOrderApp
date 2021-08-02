import { useState } from "react"

const useInput = (validateValue) =>{
    const [enterdInput, setEnterdInput] = useState("");
    const [isTouched, setIsTouched] = useState(false);
  
    const valueIsValid = validateValue(enterdInput);
    const hasError = !valueIsValid && isTouched;
    const formIsValid = (!valueIsValid && hasError) ? true : false
  
    const valueChangeHandler = (event) => {
      setEnterdInput(event.target.value);
    };
    const inputBlurHandler = (event) => {
      setIsTouched(true);
    };
    const reset = () => {
      setEnterdInput("");
      setIsTouched(false);
    };
    return {
      value: enterdInput,
      isValid: valueIsValid,
      hasError,
      formIsValid,
      valueChangeHandler,
      inputBlurHandler,
      reset,
    };
  };
  export default useInput;
