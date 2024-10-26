import React, { useState, useEffect } from 'react';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProductList from '../components/ProductList';
import Categories from '../components/Categories';
import basicOps from '../utility/basicOps';
import { usePaginationContext } from '../contexts/PaginationContext';
import axios from "axios";
import urlConfig from '../../urlConfig';
function Home() {
    
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDir, setsortDir] = useState(0);
    const [currCategory, setCurrCategory] = useState("All categories");
    const { pageSize, pageNum,
        setPageNum,
        setPageSize } = usePaginationContext();
    useEffect(() => {
        (async function () {
            const resp = await axios.get(urlConfig.ALL_PRODUCT_URL);
            const productArr = resp.data.message;
            console.log(productArr);
            const productMappedArr = productArr.map((product) => {
                return {
                    ...product,
                    id: product["_id"],
                    images: product.productImages,
                    title: product.name
                }
            })
            setProducts(productMappedArr);
        })()
    }, [])

    const object = basicOps(products, searchTerm, sortDir, currCategory, pageNum, pageSize);
    const filteredSortedgroupByArr = object.filteredSortedgroupByArr;
    const totalPages = object.totalPages;
    return (
        <>
            <header className="nav_wrapper">
                <div className="search_sortWrapper">
                    <input
                        className='search_input'
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setPageNum(1);
                        }} />
                    <div className="icons_container">
                        <ArrowCircleUpIcon
                            style={{ color: "white" }}
                            fontSize="large"
                            onClick={() => {
                                setsortDir(1)
                                setPageNum(1)
                            }}
                        ></ArrowCircleUpIcon>
                        <ArrowCircleDownIcon
                            fontSize="large"
                            style={{ color: "white" }}
                            onClick={() => {
                                setsortDir(-1)
                                setPageNum(1)
                            }}
                        ></ArrowCircleDownIcon>
                    </div>
                </div>
            </header>

            <main className="product_wrapper">
                <ProductList productList={filteredSortedgroupByArr}> ̰</ProductList>
            </main>
            <div className="pagination">
                <button
                    onClick={() => {
                        if (pageNum == 1)
                            return
                        setPageNum((pageNum) => pageNum - 1)
                    }}

                    disabled={pageNum == 1 ? true : false}
                >
                    <KeyboardArrowLeftIcon fontSize='large'></KeyboardArrowLeftIcon>
                </button>
                <div className="pagenum">
                    {pageNum}
                </div>
                <button
                    onClick={() => {
                        if (pageNum == totalPages)
                            return
                        setPageNum((pageNum) => pageNum + 1)
                    }}
                    disabled={pageNum == totalPages ? true : false}

                >
                    <ChevronRightIcon fontSize='large'

                    ></ChevronRightIcon>
                </button>
            </div>
        </>

    )
}

export default Home;