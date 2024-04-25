import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";

export default function ProductList() {
    // State variables to manage component state
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [APIData, setAPIData] = useState([]);
    const [packages, setPackages] = useState([]);

    // Fetch supply data from the server on component mount
    useEffect(() => {
        axios.get(`http://localhost:5000/product/`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    // Function to fetch data from the server
    const getData = () => {
        axios.get(`http://localhost:5000/product/`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    // Function to delete a supply item
    const onDelete = (id) => {
        axios.delete(`http://localhost:5000/product/${id}`).then(response => {
            console.log(response.status)

            // Display success/failure message based on response status
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Product has been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#0a5bf2',
                    iconColor: '#60e004'
                })

                getData();
            } else {
                Swal.fire({
                    icon: 'Unsuccess',
                    title: 'Unsuccessful',
                    text: "Product has not been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
                    iconColor: '#60e004'
                })
            }
        })
    }

    // Function to set data in local storage for later use
    const setData = (data) => {

        let { _id, productID, imgUrl, productName, productCategory, price, quantity, description } = data;

        localStorage.setItem('Id', _id);
        localStorage.setItem('productId', productID);
        localStorage.setItem('imageUrl', imgUrl);
        localStorage.setItem('productName', productName);
        localStorage.setItem('productCategory', productCategory);
        localStorage.setItem('price', price);
        localStorage.setItem('quantity', quantity);
        localStorage.setItem('description', description);

        console.log("List data is" + localStorage.setItem('CustomerName', _id));
    }

    // Function to filter supply items based on search input
    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((data) => {
                return Object.values(data).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    }

    return (
        <div className=''>
            <div className="flex flex-col px-5 py-32 pt-2 scroll-m-1 scroll-smooth ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table className=''>

                                    <tr>
                                        <th className='drop-shadow-md'><h1>Product Management Dashboard</h1></th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/addProduct"}>
                                                        Add New Product
                                                    </Link></button>
                                            </div>

                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    required
                                                    icon='search'
                                                    placeholder='Search '
                                                    onChange={(e) => searchItems(e.target.value)}
                                                />


                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div className='relative grid content-start grid-cols-1 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead ">Product Id</th>
                                            <th className="p-2 tbhead">Product Name</th>
                                            <th className="p-2 tbhead">Product Category</th>
                                            <th className="p-2 tbhead">Price</th>
                                            <th className="p-2 tbhead">Quantity</th>
                                            <th className="p-2 tbhead">Description</th>
                                            <th className="p-2 tbhead">Image</th>
                                            <th className="p-2 tbhead text-center">Update Information</th>
                                            <th className="p-2 tbhead text-center">Remove Informations</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* search list */}
                                        {searchInput.length > 1 ? (
                                            filteredResults.map((data) => {
                                                if (searchInput) {
                                                    return (
                                                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                                            <td className='px-6 py-4'>{data.productID}</td>
                                                            <td className='px-6 py-4'>{data.productName}</td>
                                                            <td className='px-6 py-4'>{data.productCategory}</td>
                                                            <td className='px-6 py-4'>{data.price}</td>
                                                            <td className='px-6 py-4'>{data.quantity}</td>
                                                            <td className='px-6 py-4'><textarea cols="20" rows="1">{data.description}</textarea></td>
                                                            <td className='px-6 py-4'><img className='max-w-12 max-h-12' src={data.imgUrl} /></td>


                                                            <td className='px-6 py-4'>
                                                                <div class="flex justify-center">
                                                                    <div class="">

                                                                        <Link to='/editProduct'><button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => setData(data)}>
                                                                            <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                                                                <div class="">
                                                                                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                                                    </svg>
                                                                                </div>
                                                                                <div class="">
                                                                                    Update
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className='px-6 py-4'>
                                                                <div class="flex justify-center">
                                                                    <div class="">

                                                                        <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => onDelete(data._id)}>
                                                                            <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                                                                <div class="">
                                                                                    <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                    </svg>
                                                                                </div>
                                                                                <div class="">
                                                                                    Delete
                                                                                </div>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    )
                                                }
                                            })
                                        ) : (
                                            APIData.map((data) => {

                                                return (
                                                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                                                        <td className='px-6 py-4'>{data.productID}</td>
                                                        <td className='px-6 py-4'>{data.productName}</td>
                                                        <td className='px-6 py-4'>{data.productCategory}</td>
                                                        <td className='px-6 py-4'>{data.price}</td>
                                                        <td className='px-6 py-4'>{data.quantity}</td>
                                                        <td className='px-6 py-4'><textarea cols="20" rows="1">{data.description}</textarea></td>
                                                        <td className='px-6 py-4'><img className='max-w-12 max-h-12' src={data.imgUrl} /></td>

                                                        <td className='px-6 py-4'>
                                                            <div class="flex justify-center">
                                                                <div class="">
                                                                    <Link to='/editProduct'><button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => setData(data)}>
                                                                        <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                                                            <div class="">
                                                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                                                </svg>
                                                                            </div>
                                                                            <div class="">
                                                                                Update
                                                                            </div>
                                                                        </div>
                                                                    </button></Link>
                                                                </div></div></td>

                                                        <td className='px-6 py-4'>
                                                            <div class="flex justify-center">
                                                                <div class="">

                                                                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => onDelete(data._id)}>
                                                                        <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                                                            <div class="">
                                                                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                </svg>
                                                                            </div>
                                                                            <div class="">
                                                                                Delete
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>


                                                    </tr>
                                                )

                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}