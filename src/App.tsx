import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DummyComponent from "./DummyComponent";
import { useState } from "react";

function App() {
  const [number, setNumber] = useState<number>(0);

  return (
    <div className="App-header">
      <DummyComponent number={number} setNumber={setNumber} />
    </div>
  );
}

export default App;
