
import React from "react"
import "./index.css"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Routes } from "react-router"
import { Layout, LinkSchedules } from "./component"
import { DataContextProvider } from "./context/DataContext"


export default function App() {

  if (localStorage.getItem("link_schedules") === null) {
    localStorage.setItem("link_schedules", JSON.stringify([]))
  }

  return (
    <DataContextProvider>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<LinkSchedules />} />
          </Routes>
        </Router>
      </Layout>
    </DataContextProvider>
  )
}
