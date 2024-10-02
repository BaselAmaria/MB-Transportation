import { Suspense, lazy, useEffect } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ProtectedRoute from "./ProtectedRoute";
import UnprotectedRoute from "./UnprotectedRoute.jsx";
import Error from "../pages/Error.jsx"; 
import AuthLayout from "../components/layouts/AuthLayout.jsx";
import MainLayout from "../components/layouts/MainLayout.jsx";
import AdminLayout from "../components/layouts/AdminLayout.jsx";
import CustomerRoute from "./CustomerRoute.jsx";
import SupplierRoute from "./SupplierRoute.jsx";
import AdminProtectedRoute from "./AdminProtectedRoute.jsx";

const lazyRetry = function (componentImport) {
    return new Promise((resolve, reject) => {
        componentImport()
            .then((component) => {
                resolve(component);
            })
            .catch((error) => {
                console.log(error)
                reject(error);
            });
    });
};

const Loading = (
    <div
        style={{
            position:'fixed',
            left:0  ,
            top:0,
            zIndex:999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: "var(--primaryColor)",
        }}
    >
        <CircularProgress size={'1.1rem'} color="inherit" />
    </div>
);

// auth pages
const Signin = lazy(() =>
    lazyRetry(() => import("../pages/SignIn.jsx"))
);

const Signup = lazy(() =>
    lazyRetry(() => import("../pages/SignUp.jsx"))
)

const ForgetPassword = lazy(() =>
    lazyRetry(() => import("../pages/ForgetPassword"))
)
// const ChangePassword = lazy(() =>
//     lazyRetry(() => import("../pages/main/Settings/ChangePassword.jsx"))
// )


// main pages
const Home = lazy(() =>
    lazyRetry(() => import("../pages/Home.jsx"))
)
const AdminPage = lazy(() =>
    lazyRetry(() => import("../pages/AdminPage.jsx"))
)


const Profile = lazy(() =>
    lazyRetry(() => import("../pages/Profile"))
)
const SupplierProfile = lazy(() =>
    lazyRetry(() => import("../pages/SupplierProfile"))
)
const Sales = lazy(() =>
    lazyRetry(() => import("../pages/Deals.jsx"))
)
const Request = lazy(() =>
    lazyRetry(() => import("../pages/Request.jsx"))
)




const router = createBrowserRouter([
    {
        path: "auth",
        errorElement:Loading,
        element: <AuthLayout/>,
        children: [
            {   index: true,
                element: (
                <UnprotectedRoute>
                    <Suspense fallback={Loading}>
                        <Signin />
                    </Suspense>
                </UnprotectedRoute>
                )
            },
            {   path: "sign-up",
                element: (
                <UnprotectedRoute>
                    <Suspense fallback={Loading}>
                        <Signup />
                    </Suspense>
                </UnprotectedRoute>
                )
            },
            {   path: "reset-password",
                element: (
                <UnprotectedRoute>
                    <Suspense fallback={Loading}>
                        <ForgetPassword />
                    </Suspense>
                </UnprotectedRoute>
                )
            },
        ]
           
    },
    {
        path: "admin",
        element: (
            <ProtectedRoute>
                    <Suspense fallback={Loading}>
                        <AdminPage />
                    </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: "",
        errorElement: Loading,
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={Loading}>
                        <AdminProtectedRoute>
                            <Home />
                        </AdminProtectedRoute>
                    </Suspense>
                )
            },
           
            {
                path: "sales",
                element: (
                        <Suspense fallback={Loading}>
                            <AdminProtectedRoute>
                                <Sales />
                            </AdminProtectedRoute>
                        </Suspense>
                )
            },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <AdminProtectedRoute>
                            <CustomerRoute>
                                    <Suspense fallback={Loading}>
                                        <Profile />
                                    </Suspense>
                            </CustomerRoute>
                        </AdminProtectedRoute>
                     </ProtectedRoute>
                )
            },
            {
                path: "supplier-profile",
                element: (
                    <ProtectedRoute>
                        <AdminProtectedRoute>
                            <SupplierRoute>
                                <Suspense fallback={Loading}>
                                    <SupplierProfile />
                                </Suspense>
                            </SupplierRoute>
                        </AdminProtectedRoute>
                     </ProtectedRoute>
                )
            },
            {
                path: "order/create",
                element: (
                    <ProtectedRoute>
                        <AdminProtectedRoute>
                            <Suspense fallback={Loading}>
                                <Request />
                            </Suspense>
                        </AdminProtectedRoute>
                    </ProtectedRoute>
                )
            },
           
            // {
            //     path: "user-profile/:id",
            //     element: (
            //         <Suspense fallback={Loading}>
            //             <UserProfile />
            //         </Suspense>
            //     ),
            // },
           
            {
                path:"*",
                element: (
                    <Suspense fallback={Loading}>
                        <Error />
                    </Suspense>
                )
            }
          
        ]
    },
])

export default router