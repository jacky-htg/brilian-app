import {useParams, Link} from 'react-router-dom'

function ProductView() {
    const { id } = useParams()
    return(
        <>
            <h1>View Product for id {id} </h1>
            <Link to={"/products"}>List Products</Link>
        </>
    )
}
export default ProductView