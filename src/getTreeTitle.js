/**
 * Loops through a tree of components from a renderProps.components
 * value from React Router's match util (see: https://github.com/ReactTraining/react-router/blob/master/docs/API.md#match-routes-location-history-options--cb)
 * and calls a `renderTitle` method if it exists.
 *
 * Each component down the tree can set the title, while also using the
 * previous title or the base title values.
 */
export default function getTreeTitle (baseTitle, components) {
  return components.reduce((prev, curr) => {
    if (curr.renderTitle) {
      return curr.renderTitle(baseTitle, prev)
    }
    return prev
  }, baseTitle)
}
