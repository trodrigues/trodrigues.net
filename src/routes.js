import App from './App'
import Home from './Home'
import About from './About'

export default {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'about', component: About }
  ]
}
