import React from 'react'
import './App.scss'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Home from './components/Home/Home'

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <Home />
      <Switch>
        <Route path='/' component={ Home } />
      </Switch>
    </div>
    </BrowserRouter>
  )
}

export default App
