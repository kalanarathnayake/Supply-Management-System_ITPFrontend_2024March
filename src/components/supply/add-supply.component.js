import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
const shortid = require('shortid');

export default function AddPackage() {
    const [supplierName, setSupplierName] = useState('');
    const [contactDetails, setContactDetails] = useState('');
    const [supplyDetails, setSupplyDetails] = useState('');
    const [orderQuantity, setOrderQuantity] = useState('');
    const [orderDetails, setOrderDetails] = useState('');

    const postData = (e) => {
        e.preventDefault();
        const supplierId = shortid.generate();
        const orderStatus = "Pending";

        const supply = {
            supplierId: supplierId,
            supplierName: supplierName,
            contactDetails: contactDetails,
            supplyDetails: supplyDetails,
            orderQuantity: orderQuantity,
            orderDetails: orderDetails,
            orderStatus: orderStatus,
        };
        console.log(supply);

        axios.post('http://localhost:5000/supply/add', supply)
            .then(res => {
                console.log(res);
                if (res.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Supply has been added!!Your Supply ID is ' + supplierId,
                        background: '#fff',
                        showConfirmButton: true,
                        confirmButtonText: 'Okay',
                        confirmButtonColor: '#0712e0',
                        iconColor: '#60e004',
                        timer: 2800000
                    }).then(() => {
                        window.location = '/supply';
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in adding!',
                        background: '#fff',
                        showConfirmButton: true,
                        confirmButtonText: 'Okay',
                        confirmButtonColor: '#f2220f',
                        iconColor: '#60e004',
                        timer: 2800000
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error in adding!',
                    background: '#fff',
                    showConfirmButton: true,
                    confirmButtonText: 'Okay',
                    confirmButtonColor: '#f2220f',
                    iconColor: '#60e004',
                    timer: 2800000
                });
            });
    };

    return (
        <div className="flex flex-col px-5 py-32 pb-36 pt-2 scroll-m-1 scroll-smooth ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className='items-center overflow-hidden'>
                        <div className=''>
                            <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' >
                                    <div class="">
                                        <p className='text-4xl font-semibold text-black uppercase'>Create Supply</p>
                                        <p />
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900'>
                                                    Supplier Name
                                                </label>
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    onChange={(e) => setSupplierName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900'>
                                                    Contact Information
                                                </label>
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    onChange={(e) => setContactDetails(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <p />
                                        <div className="grid grid-cols-1 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900'>
                                                    Supply Details
                                                </label>
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    onChange={(e) => setSupplyDetails(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <p />
                                        <p /><p />
                                        <div className="grid grid-cols-1 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900'>
                                                    Order Quantity
                                                </label>
                                                <input type="text" required
                                                    className="form-control"
                                                    onChange={(e) => setOrderQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div class="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900' >
                                                    Order details
                                                </label>
                                                <input type="text" required
                                                    className="form-control"
                                                    onChange={(e) => setOrderDetails(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center align-middle form-group">
                                            <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Supply Details" onClick={postData} />
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