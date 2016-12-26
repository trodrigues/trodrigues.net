import App from './App'
import Home from './Home'
import About from './About'
import PageRenderer from './PageRenderer'

export default {
  path: '/',
  component: App,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'about', component: About },
    { path: 'w/*', component: PageRenderer }
  ]
}
