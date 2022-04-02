import React, { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import './style.css'
import './style.mobile';
import loadComponent from './loadComponent'

// const AsyncComp = lazy(() => import('./AsyncComp'))
// const App = () => <div className="title">
//     <div>App</div>
//     <Suspense fallback={<>loading</>}>
//       <AsyncComp/>
//     </Suspense>
//   </div>

const AsyncComp = loadComponent(() => import('./AsyncComp'))
const App = () => <div className="title">
    <div>App-DefinedComp</div>
    <AsyncComp/>
  </div>

render(<App/>, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept(App, () => {
    render(<App/>, document.querySelector('#app'));
})
}
