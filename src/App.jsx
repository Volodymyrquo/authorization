import React from 'react'
import './assets/scss/index.scss'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { OneStepAuth } from './OneStepAuth.js'
import { LoginWithSumraId } from './LoginWithSumraId'

const App = ({ img = [], type, socialLinks = [], getPath, welcome }) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route
            path='/verify'
            render={() => <OneStepAuth getPath={getPath} />}
          />
          <Route
            path='/welcome'
            render={() => (
              <LoginForm
                type={type}
                img={img}
                socialLinks={socialLinks}
                getPath={getPath}
              />
            )}
          />
          <Route path='/idlogin' component={LoginWithSumraId} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
