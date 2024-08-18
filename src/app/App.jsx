import { useState } from "react"

function App() {
  const [state, setState] = useState(0)

  function count(val) {
    setState((state) => state + val)
  }
  return (
    <>
      <h1 className="mb-2 flex text-red-500">Hello world</h1>
      <div className="flex items-center gap-3">
        <button onClick={() => count(-1)}>&lt;</button> <p>{state}</p>
        <button onClick={() => count(1)}>&gt;</button>
      </div>
    </>
  )
}

export default App
