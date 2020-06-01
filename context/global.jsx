import * as React from "react";

export let ContextOne = React.createContext();

export let initialState = {
    load_app: true,
    backdrop: false,
};

export let reducer = (state, action) => {
    switch (action.type) {
        case "reset":
            return initialState;
        case "stop-load-app":
            return { ...state, load_app: false };
        case "start-load-app":
            return { ...state, load_app: true };
        case "stop-backdrop":
            return { ...state, backdrop: false };
        case "start-backdrop":
            return { ...state, backdrop: true };
    }
};

export function ContextOneProvider(props) {
    let [state, dispatch] = React.useReducer(reducer, initialState);
    let value = { state, dispatch };
    return (
        <ContextOne.Provider value={value}>{props.children}</ContextOne.Provider>
    );
}

export let ContextOneConsumer = ContextOne.Consumer;

const Info = () => {
    return "this file used to change the general state at app"
}
export default Info;