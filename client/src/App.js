import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const ENDPOINT = `http://localhost:5000/openai/generateimage`;

const App = () => {
  const [promptData, setPromptData] = useState("");
  const [imgData, setImg] = useState("");
  const options = ["Small", "Medium", "Large"];
  const [selected, setSelected] = useState(options[0]);
  const generateImage = (e) => {
    e.preventDefault();
    if (!promptData) {
      alert("Please enter message to continue!");
    }
    axios
      .post(ENDPOINT, {
        prompt: promptData,
        size: selected,
      })
      .then(function (response) {
        setImg(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(promptData, selected);
  };
  console.log(selected);
  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <form onSubmit={generateImage}>
          <input
            className="input"
            type="text"
            placeholder="Type some random text to render.."
            onChange={(e) => setPromptData(e.target.value)}
          />
          <select
            className="input"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {options.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
          <button className="input" type="submit">
            Generate Image
          </button>
        </form>
      </div>
      <div className="imageContainer">
        <img src={imgData} />
      </div>
    </div>
  );
};

export default App;
