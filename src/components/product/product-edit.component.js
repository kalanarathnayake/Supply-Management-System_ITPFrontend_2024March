import React, { useState, useEffect } from 'react';
import { storage } from "../../firebase";
import axios from 'axios';
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"

export default function EditProduct() {
    const [id, setId] = useState('');
    const [productID, setproductID] = useState('');
    const [imgUrl, setimgUrl] = useState('');
    const [productName, setproductName] = useState('');
    const [productCategory, setproductCategory] = useState('');
    const [price, setprice] = useState('');
    const [quantity, setquantity] = useState('');
    const [description, setdescription] = useState('');


    useEffect(() => {
        setId(localStorage.getItem('Id'))
        setproductID(localStorage.getItem('productId'))
        setimgUrl(localStorage.getItem('imageUrl'))
        setproductName(localStorage.getItem('productName'))
        setproductCategory(localStorage.getItem('productCategory'))
        setprice(localStorage.getItem('price'))
        setquantity(localStorage.getItem('quantity'))
        setdescription(localStorage.getItem('description'))
    }, []);

    const updateAPIData = (e) => {

        e.preventDefault();
        const productSet = {
            productID: productID,
            imgUrl: imgUrl,
            productName: productName,
            productCategory: productCategory,
            price: price,
            quantity: quantity,
            description: description,
        }
        console.log(productSet);
        axios.put(`http://localhost:5000/product/${id}`, productSet)
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'product has been Updated!!',
                        background: '#fff',
                        showConfirmButton: true,
                        confirmButtonText: 'Okay',
                        confirmButtonColor: '#0712e0',
                        iconColor: '#60e004',
                        timer: 2800000
                    }).then(() => {
                        window.location = '/product';
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in updating!',
                        background: '#fff',
                        showConfirmButton: true,
                        confirmButtonText: 'Okay',
                        confirmButtonColor: '#f2220f',
                        iconColor: '#60e004',
                        timer: 2800000
                    })
                }
            })
    }

    const uploadImage = (e) => {
        if (e.target.files[0] !== null) {
            const fileName = e.target.files[0].name + "-" + new Date();
            const uploadTask = storage
                .ref(`digitalbook/${fileName}`)
                .put(e.target.files[0]);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    //progress function
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (error) => {
                    //error function
                    console.log(error);
                },
                () => {
                    //complete function
                    storage
                        .ref("digitalbook")
                        .child(fileName)
                        .getDownloadURL()
                        .then((url) => {
                            setimgUrl(url);
                        });
                }
            );
        } else {
            console.log("Something went wrong");
        }
    };

    return (
        <div className="flex flex-col px-5 py-32 mb-14 pb-36 pt-2 scroll-m-1 scroll-smooth ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className='items-center overflow-hidden'>
                        <div className=''>
                            <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' >
                                    <div class="">
                                        <p className='text-4xl font-semibold text-black uppercase'>Create Product</p>
                                        <p />
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900'>
                                                    Product Id
                                                </label>
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    value={productID}
                                                    readOnly
                                                    disabled
                                                    onChange={(e) => setproductName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900'>
                                                    Product Name
                                                </label>
                                                <input type="text"
                                                    required
                                                    value={productName}
                                                    className="form-control"
                                                    onChange={(e) => setproductName(e.target.value)}
                                                />
                                            </div>

                                        </div>
                                        <p />
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900'>
                                                    Product Category
                                                </label>
                                                <input type="text"
                                                    required
                                                    value={productCategory}
                                                    className="form-control"
                                                    onChange={(e) => setproductCategory(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900'>
                                                    Price
                                                </label>
                                                <input type="number"
                                                    required
                                                    value={price}
                                                    className="form-control"
                                                    onChange={(e) => setprice(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <p />
                                        <p /><p />
                                        <div className="grid grid-cols-1 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900'>
                                                    Quantity
                                                </label>
                                                <input type="text" required
                                                    className="form-control"
                                                    value={quantity}
                                                    onChange={(e) => setquantity(e.target.value)}
                                                />
                                            </div>
                                            <div class="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900' >
                                                    Description
                                                </label>
                                                <input type="text" required
                                                    className="form-control"
                                                    value={description}
                                                    onChange={(e) => setdescription(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <label
                                                className="block mb-2 text-xxl font-medium text-gray-900 dark:text-white"
                                                for="file_input">
                                                Upload file
                                            </label>
                                            {imgUrl && <img className='mb-10 max-w-80 max-h-80 min-w-80 min-h-80 ' src={imgUrl} />}
                                            <input
                                                className="block w-full text-xxl text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                id="file_input"
                                                onChange={(e) => uploadImage(e)}
                                                type="file"
                                                required />
                                        </div>
                                        <div className="text-center align-middle form-group">
                                            <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Product Details" onClick={updateAPIData} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}