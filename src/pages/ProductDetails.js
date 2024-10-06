// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router'
// import "../styles/ProductDetailsStyles.css";


// const ProductDetails = () => {
//     const params = useParams();
//     const navigate = useNavigate();
//     const [product, setProduct] = useState({});
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const history = useHistory()


//     //initalp details
//     useEffect(() => {
//         if (params?.slug) getProduct();
//     }, [params?.slug]);

//     //getProduct
//     const getProduct = async () => {
//         try {
//             const { data } = await axios.get(
//                 `/api/v1/product/get-product/${params.slug}`
//             );
//             setProduct(data?.product);
//             getSimilarProduct(data?.product._id, data?.product.category._id);

//             // for reviews
//             setReviews(data?.review)

//         } catch (error) {
//             console.log(error);
//         }
//     };




//     //get similar product
//     const getSimilarProduct = async (pid, cid) => {
//         try {
//             const { data } = await axios.get(
//                 `/api/v1/product/related-product/${pid}/${cid}`
//             );
//             setRelatedProducts(data?.products);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <Layout>
//             <div className="row container product-details">
//                 <div className="col-md-6">
//                     <img
//                         src={`/api/v1/product/product-photo/${product._id}`}
//                         className="card-img-top"
//                         alt={product.name}
//                         height="300"
//                         width={"350px"}
//                     />
//                 </div>
//                 <div className="col-md-6 product-details-info">
//                     <h1 className="text-center">Product Details</h1>
//                     <hr />
//                     <h6>Name : {product.name}</h6>
//                     <h6>Description : {product.description}</h6>
//                     <h6>
//                         Price :
//                         {product?.price?.toLocaleString("en-US", {
//                             style: "currency",
//                             currency: "INR",
//                         })} /KG
//                     </h6>
//                     <h6>Quantity : {product.quantity} Quintal</h6>
//                     <h6>Category : {product?.category?.name}</h6>
//                     <h6>Seller Name : {product.sellerName}</h6>
//                     <h6>Seller Contact No : {product.sellerContactNo}</h6>
//                     <h6>Seller Address : {product.sellerAddress}</h6>

//                     {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
//                 </div>
//             </div>

//             {/* 
//             <Row>
//                 <Col md={6}>
//                     <h2>Reviews</h2>
//                     {product.reviews.length === 0 && <Message>No Reviews</Message>}
//                     <ListGroup variant="flush">
//                         {product.reviews.map((review) => (
//                             <ListGroup.Item key={review._id}>
//                                 <strong>{review.name}</strong>
//                                 <Rating value={review.rating} />
//                                 <p>{review.createdAt.substring(0, 10)}</p>
//                                 <p>{review.comment}</p>
//                             </ListGroup.Item>
//                         ))}
//                         <ListGroup.Item>
//                             {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
//                             {userInfo ? (
//                                 <form className="form" onSubmit={submitHandler}>
//                                     <div>
//                                         <h2>Write a customer review</h2>
//                                     </div>
//                                     <div>
//                                         <label htmlFor="rating">Rating</label>
//                                         <select
//                                             id="rating"
//                                             value={rating}
//                                             onChange={(e) => setRating(e.target.value)}
//                                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                         >
//                                             <option value="">Select</option>
//                                             <option value="1">1- Bad</option>
//                                             <option value="2">2- Fair</option>
//                                             <option value="3">3- Good</option>
//                                             <option value="4">4- Very good</option>
//                                             <option value="5">5- Excellent</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label htmlFor="comment">Comment</label>
//                                         <textarea
//                                             id="comment"
//                                             value={comment}
//                                             onChange={(e) => setComment(e.target.value)}
//                                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                                         ></textarea>
//                                     </div>

//                                     <div>
//                                         <label />
//                                         <button
//                                             className="bg-indigo-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
//                                             type="submit"
//                                         >
//                                             Submit
//                                         </button>
//                                     </div>
//                                 </form>
//                             ) : (
//                                 <Message>
//                                     Please{' '}
//                                     <Link to="/login" className="text-indigo-500 hover:text-indigo-700">
//                                         sign in
//                                     </Link>{' '}
//                                     to write a review
//                                 </Message>
//                             )}
//                         </ListGroup.Item>
//                     </ListGroup>
//                 </Col>
//             </Row> */}

//             <hr />

//             <div className="row container similar-products">
//                 <h4>Similar Products ➡️</h4>
//                 {relatedProducts.length < 1 && (
//                     <p className="text-center">No Similar Products found</p>
//                 )}
//                 <div className="d-flex flex-wrap">
//                     {relatedProducts?.map((p) => (
//                         <div className="card m-2" key={p._id}>
//                             <img
//                                 src={`/api/v1/product/product-photo/${p._id}`}
//                                 className="card-img-top"
//                                 alt={p.name}
//                             />
//                             <div className="card-body">
//                                 <div className="card-name-price">
//                                     <h5 className="card-title">{p.name}</h5>
//                                     <h5 className="card-title card-price">
//                                         {p.price.toLocaleString("en-US", {
//                                             style: "currency",
//                                             currency: "INR",
//                                         })}
//                                     </h5>
//                                 </div>
//                                 <p className="card-text ">
//                                     {p.description.substring(0, 60)}...
//                                 </p>
//                                 <div className="card-name-price">
//                                     <button
//                                         className="btn btn-info ms-1"
//                                         onClick={() => navigate(`/product/${p.slug}`)}
//                                     >
//                                         More Details
//                                     </button>
//                                     {/* <button
//                                         className="btn btn-dark ms-1"
//                                         onClick={() => {
//                                             setCart([...cart, p]);
//                                             localStorage.setItem(
//                                                 "cart",
//                                                 JSON.stringify([...cart, p])
//                                             );
//                                             toast.success("Item Added to cart");
//                                         }}
//                                     >
//                                         ADD TO CART
//                                     </button> */}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default ProductDetails;



import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            <div className="row container product-details">
                <div className="col-md-6">
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height="300"
                        width={"350px"}
                    />
                </div>
                <div className="col-md-6 product-details-info">
                    <h1 className="text-center">Product Details</h1>
                    <hr />
                    <h6>Name : {product.name}</h6>
                    <h6>Description : {product.description}</h6>
                    <h6>
                        Price :
                        {product?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                        })} /KG
                    </h6>
                    <h6>Quantity : {product.quantity} Quintal</h6>
                    <h6>Category : {product?.category?.name}</h6>
                    <h6>Seller Name : {product.sellerName}</h6>
                    <h6>Seller Contact No : {product.sellerContactNo}</h6>
                    <h6>Seller Address : {product.sellerAddress}</h6>

                    {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
                </div>
            </div>
            <hr />
            <div className="row container similar-products">
                <h4>Similar Products ➡️</h4>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
                        <div className="card m-2" key={p._id}>
                            <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                            />
                            <div className="card-body">
                                <div className="card-name-price">
                                    <h5 className="card-title">{p.name}</h5>
                                    <h5 className="card-title card-price">
                                        {p.price.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "INR",
                                        })}
                                    </h5>
                                </div>
                                <p className="card-text ">
                                    {p.description.substring(0, 60)}...
                                </p>
                                <div className="card-name-price">
                                    <button
                                        className="btn btn-info ms-1"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    {/* <button
                                        className="btn btn-dark ms-1"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            toast.success("Item Added to cart");
                                        }}
                                    >
                                        ADD TO CART
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;