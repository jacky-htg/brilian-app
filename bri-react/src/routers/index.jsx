import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from '../screens/Login'
import ListProduct from '../screens/ProductList'
import CreateProduct from '../screens/ProductCreate'
import ViewProduct from '../screens/ProductView'
import PrivateRoute from './PrivateRoute'

function Router() {
    const publicRoutes = [
        {
            path: "/login",
            component: <Login/>
        }
    ]

    const privateRoutes = [
        {
            path: "/products",
            component: <ListProduct/>
        },
        {
            path: "/products/create",
            component: <CreateProduct/>
        },
        {
            path: "/products/:id",
            component: <ViewProduct/>
        },
    ]
    return (
        <BrowserRouter>
            <Routes>
                {
                   publicRoutes.map((route, index) => 
                        <Route
                            exact
                            key={index}
                            path={route.path}
                            element={route.component}
                        />
                    )
                }

                {
                    privateRoutes.map((route, index) => 
                        <Route
                            exact
                            key={index}
                            path={route.path}
                            element={<PrivateRoute element={route.component}/>}
                        />
                    )
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Router