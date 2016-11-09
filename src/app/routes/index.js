import CoreLayout from '../components/CoreLayout';
import Home from '../components/Home';
import ObjFormWrapper from './ObjFormWrapper';
import ObjListWrapper from './ObjListWrapper';

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: {component:Home},
  childRoutes: [
    {path:'/object/form/:name(/:id)', component: ObjFormWrapper },
    {path:'/object/list/:name', component: ObjListWrapper },
  ]
})

export default createRoutes
