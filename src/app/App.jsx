import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { useState } from "react"
import { Outlet } from "react-router-dom"

function App() {
  const [state, setState] = useState(0)

  function count(val) {
    setState((state) => state + val)
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-2 flex text-red-500">Hello world</h1>
      <div className="flex items-center gap-3">
        <button onClick={() => count(-1)}>
          <IconArrowLeft size={20} />
        </button>
        <p>{state}</p>
        <button onClick={() => count(1)}>
          <IconArrowRight size={20} />
        </button>
      </div>
      <Outlet />
    </div>
  )
}

export default App
