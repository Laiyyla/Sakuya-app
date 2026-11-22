import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/health")
      .then((res) => res.json())
      .then((data) => setStatus(data.staus));
  }, []);
  return (
    <>
      <h1 className="text-center">OOOOOOOOOO</h1>
      <div className="flex items-center justify-center">{status}</div>
    </>
  );
}

export default App;
