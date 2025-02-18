import { useState } from 'react'
import './css/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
          <div className={"section1"}>
              <h1>Section 1</h1>
          </div>
          <div className={"section2"}>
              <h1>Section 2</h1>
          </div>
          <div className={"section3"}>
              <h1>Section 3</h1>
          </div>
          <div className={"section4"}>
              <h1>Section 4</h1>
          </div>
          <div className={"section5"}>
              <h1>Section 5</h1>
          </div>
          <div className={"section6"}>
              <h1>Section 6</h1>
          </div>
          <div className={"section7"}>
              <h1>Section 7</h1>
          </div>
          <div className={"section8"}>
              <h1>Section 8</h1>
          </div>
      </>
  )
}

export default App
