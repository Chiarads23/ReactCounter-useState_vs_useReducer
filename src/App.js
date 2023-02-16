import "./App.css";
import { useState, useReducer, createContext, useContext } from "react";

const initState = {
  count: 0,
  userName: "",
};

const GenContext = createContext(initState);

const reducer = (state, action) => {
  switch (action.type) {
    case "INCR":
      return { ...state, count: state.count + 1 };
    case "DECR":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    case "SET_USERNAME":
      return { ...state, userName: action.payload };
    default:
      return state;
  }
};

const Navbar = () => {
  const contextReceived = useContext(GenContext);

  return (
    <div className="Navbar">
      <h2>Username: {contextReceived.userName}</h2>
    </div>
  );
};
const OldCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h3>useState</h3>
      <p>Conteggio : {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}> + </button>
      <button onClick={() => setCount((prev) => prev - 1)}> - </button>
    </>
  );
};
const NewCounter = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <>
      <h3>useReducer</h3>
      <p>Conteggio : {state.count}</p>
      <button onClick={() => dispatch({ type: "INCR" })}> + </button>
      <button onClick={() => dispatch({ type: "DECR" })}> - </button>
      <button onClick={() => dispatch({ type: "RESET" })}> reset </button>
    </>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div className="App">
      <GenContext.Provider value={state}>
        <Navbar />
        <div className="Counters">
          <OldCounter />
          <NewCounter />
          <hr />
          <input
            className="userInput"
            type="text"
            value={state.userName}
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
          />
        </div>
      </GenContext.Provider>
    </div>
  );
}

export default App;
