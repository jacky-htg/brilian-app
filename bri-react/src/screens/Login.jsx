import { useNavigate } from "react-router-dom"

function Login() {
    const navigateTo = useNavigate()
    const handleLogin = () => {
        localStorage.setItem('token', 'my-secret-token')
        navigateTo('/products/create', {replace: true})
    }

    return(
        <>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
        </>
    )
}
export default Login