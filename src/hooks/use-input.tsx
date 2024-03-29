import { useReducer } from "react";

// const initialDepartureDateValue = "30-10-2022";
// const initialFromValue = "Београд";

interface InputState {
  value: string;
  isTouched: boolean;
}

const initialInputState: InputState = {
  value: "",
  isTouched: false,
};

const inputReducer = (state: InputState, action: any) => {
  if (action.type === "CHANGE") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "REPLACE") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === "RESET") {
    return {
      value: "",
      isTouched: false,
    };
  }

  return initialInputState;
};

const useInput = (validateValue: any) => {
  const [inputState, dispatchInputAction] = useReducer(inputReducer, initialInputState);
  const isValid = validateValue(inputState.value);
  const valueInputClasses = !isValid && inputState.isTouched;

  const changeInputValueHandler = (e: any) => {
    dispatchInputAction({
      type: "CHANGE",
      value: e.target.value,
    });
  };

  const replaceInputValueHandler = (value: string) => {
    dispatchInputAction({
      type: "REPLACE",
      value: value,
    });
  };

  const blurInputValueHandler = () => {
    dispatchInputAction({
      type: "BLUR",
    });
  };

  const reset = () => {
    dispatchInputAction({
      type: "RESET",
    });
  };

  return {
    value: inputState.value,
    isValid,
    isTouched: inputState.isTouched,
    valueInputClasses,
    changeInputValueHandler,
    replaceInputValueHandler,
    blurInputValueHandler,
    reset,
  };
};

export default useInput;
