import { useEffect, useState } from "react"
import browser from "webextension-polyfill";

function App() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    browser.runtime.onMessage.addListener((msg) => {
      console.log("message received from content script: ", msg);
      setMsg(msg.action)
    })
  }, [])

  return (
    <div className="App">
      <div>
        MSG: {msg}
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}

        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
