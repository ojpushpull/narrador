
import { useState } from "react";
import styles from "./index.module.css";

//set input states for form
export default function App() {
  const [nameInput, setNameInput] = useState("");
  const [prodservInput, setProdservInput] = useState("");
  const [visionInput, setVisionInput] = useState("");
  const [missionInput, setMissionInput] = useState("");
  const [problemInput, setProblemInput] = useState("");
  const [solutionInput, setSolutionInput] = useState("");
  const [futureInput, setFutureInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [villianInput, setVillianInput] = useState("");
  const [heroInput, setHeroInput] = useState("");
  const [descripInput, setDescripInput] = useState("");
  const [result, setResult] = useState();

  //add catch functions to the fetch request
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: nameInput, prodserv: prodservInput, vision: visionInput, mission: missionInput, problem: problemInput, solution: solutionInput,
        future: futureInput, colors: colorInput, villian: villianInput, hero: heroInput, descrip: descripInput }),
      });

      const text = await response.text();


      const data = JSON.parse(text);
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setNameInput("");
      setProdservInput("");
      setVisionInput("");
      setMissionInput("");
      setProblemInput("");
      setSolutionInput("");
      setFutureInput("");
      setColorInput("");
      setVillianInput("");
      setHeroInput("");
      setDescripInput("");
    } catch(error) {
      console.error('Failed to parse JSON:', text);
  alert(error.message);
    }
  }

  return (
    <div>
      
        <title>Business Narrative Generator</title>
        
      

      <main className={styles.main}>
        <img src="/logo192.png" alt="power generating" className={styles.icon} />
        <h3>Create your narrative</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter an company name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input
            type="text"
            name="prodserv"
            placeholder="Enter your product or service"
            value={prodservInput}
            onChange={(e) => setProdservInput(e.target.value)}
          />
          <input
            type="text"
            name="vision"
            placeholder="Enter the vision of the organization"
            value={visionInput}
            onChange={(e) => setVisionInput(e.target.value)}
          />
          <input
            type="text"
            name="mission"
            placeholder="Enter the mission of the organization"
            value={missionInput}
            onChange={(e) => setMissionInput(e.target.value)}
          />
          <input
            type="text"
            name="problem"
            placeholder="What problem are you solving"
            value={problemInput}
            onChange={(e) => setProblemInput(e.target.value)}
          />
          <input
            type="text"
            name="solution"
            placeholder="What is the solution to the problem"
            value={solutionInput}
            onChange={(e) => setSolutionInput(e.target.value)}
          />
          <input
            type="text"
            name="future"
            placeholder="what is the future you are fighting for"
            value={futureInput}
            onChange={(e) => setFutureInput(e.target.value)}
          />
          <input
            type="text"
            name="descrip"
            placeholder="Enter descriptive words that best describe your organization"
            value={descripInput}
            onChange={(e) => setDescripInput(e.target.value)}
          />
          <input
            type="text"
            name="colors"
            placeholder="What colors represent your organization"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
          />
          <input
            type="text"
            name="villian"
            placeholder="What is the villian of your organization"
            value={villianInput}
            onChange={(e) => setVillianInput(e.target.value)}
          />
          <input
            type="text"
            name="hero"
            placeholder="If your organization had a hero who would it be"
            value={heroInput}
            onChange={(e) => setHeroInput(e.target.value)}
          />
          <input type="submit" value="Generate narrative" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}