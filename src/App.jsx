import { useState } from 'react'
import { Layout } from './Components/Layout'
import Rock from "../imgs/rock.png"
import './App.css'

import dataJson from "../"

function App() {
  return (
    <Layout>
       <img src={Rock} className="App-logo" alt="logo" />
       <div> </div>
    </Layout>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={Rock} className="App-logo" alt="logo" />
    //       <p>Hello Vite + React!</p>
        /* <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p> */
  )
}

export default App
