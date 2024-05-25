import React ,{Fragment,useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import {  isJsonString } from './utils'
import { jwtDecode } from 'jwt-decode'
import * as UserService from '../src/services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slides/userSilde'
import axios from 'axios'

function App() {
   const user = useSelector((state) => state.user)
//   const dispatch = useDispatch();
//   useEffect(() =>  {

//     let storageData = localStorage.getItem('access_token')
//     if(storageData && isJsonString(storageData)){
//       storageData = JSON.parse(storageData) 
//         const decoded = jwtDecode(storageData)
//         console.log('decodeApp', decoded)
//         if (decoded?.id) {
//             handleGetDetailsUser(decoded?.id, storageData)
//         }
//     }
//     console.log('storageData', storageData)
//   }, [])


//   const handleGetDetailsUser = async (id, token) => {
//     const res = await UserService.getDetailsUser(id, token)
//     dispatch(updateUser({ ...res?.data, access_token: token}))
// }

  return (
    <div>
      <Router>
        <Routes>  
          {routes.map((route) => {
            const Page = route.page
            const isCheckAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader && route.isShowFooter ? DefaultComponent : Fragment
            return (
              <Route
                    key={route.path}
                    path={isCheckAuth ? route.path : null} // or some default path
                    element={
                      isCheckAuth ? (
                        <Layout>
                          <Page />
                        </Layout>
                      ) : null // or some default component
                    }
              />
            )
          })}
        </Routes>
      </Router>
  </div>
  )
  
}

export default App