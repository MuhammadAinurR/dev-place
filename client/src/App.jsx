import { RouterProvider } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import router from "./router"
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google"

function App() {

  return (
    <>
      <ToastContainer />
      <GoogleOAuthProvider clientId="307747605125-ipj32ju7dca41cr242o3qbc42a668h3g.apps.googleusercontent.com">
      <RouterProvider router={router}/>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
