import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"

export default function EditPackage() {
    const [id, setId] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [contactDetails, setContactDetails] = useState('');
    const [supplyDetails, setSupplyDetails] = useState('');
    const [orderQuantity, setOrderQuantity] = useState('');
    const [orderDetails, setOrderDetails] = useState('');
    const [orderStatus, setOrderStatus] = useState('');

    useEffect(() => {
        setId(localStorage.getItem('Id'))
        setSupplierId(localStorage.getItem('SupplierID'))
        setSupplierName(localStorage.getItem('SupplierName'))
        setContactDetails(localStorage.getItem('ContactDetails'))
        setSupplyDetails(localStorage.getItem('SupplyDetails'))
        setOrderQuantity(localStorage.getItem('Quantity'))
        setOrderDetails(localStorage.getItem('OrderDetails'))
        setOrderStatus(localStorage.getItem('OrderStatus'))

    }, []);

    const updateAPIData = (e) => {

        e.preventDefault();
        const supplySet = {
            supplierId: supplierId,
            supplierName: supplierName,
            contactDetails: contactDetails,
            supplyDetails: supplyDetails,
            orderQuantity: orderQuantity,
            orderDetails: orderDetails,
            orderStatus: orderStatus,
        }
        console.log(supplySet);
        axios.put(`http://localhost:5000/supply/${id}`, supplySet)
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Supply has been Updated!!',
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
    return (
        <div className="flex flex-col px-5 py-32 pt-2 scroll-m-1 scroll-smooth ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className='items-center overflow-hidden'>
                        <div className=''>
                            <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' >
                                    <div class="">
                                        <p className='text-4xl font-semibold text-black uppercase'>Update Supply Details</p>
                                        <p />
                                        <br />
                                        <p />
                                        <div className="grid grid-cols-1 gap-4 form-group">
                                            <div class="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Supply ID
                                                </label>
                                                <input type="text"
                                                    required
                                                    disabled
                                                    readOnly
                                                    className="form-control"
                                                    value={supplierId}
                                                />
                                            </div>
                                        </div>
                                        <p />
                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Supplier Name
                                                </label>
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    value={supplierName}
                                                    onChange={(e) => setSupplierName(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Contact Details
                                                </label>
                                                <input type="number"
                                                    required
                                                    className="form-control"
                                                    value={contactDetails}
                                                    onChange={(e) => setContactDetails(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <p />
                                        <div className="grid grid-cols-3 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Order Quantity
                                                </label>
                                                <input type="number"
                                                    required
                                                    className="form-control"
                                                    value={orderQuantity}
                                                    onChange={(e) => setOrderQuantity(e.target.value)}
                                                />
                                            </div>

                                            <div class="">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 ' >
                                                    Order Status
                                                </label>
                                                <select
                                                    type="text"
                                                    required
                                                    value={orderStatus}
                                                    className="form-control"
                                                    onChange={(e) => setOrderStatus(e.target.value)}
                                                >
                                                    <option>Select From Here</option>
                                                    <option>Pending</option>
                                                    <option>Confirmed</option>
                                                    <option>Declined</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 '>
                                                    Supply Details
                                                </label>
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    value={supplyDetails}
                                                    onChange={(e) => setSupplyDetails(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <p />

                                        <div class="">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 ' >
                                                Order Details
                                            </label>
                                            <input type="text"
                                                required
                                                className="form-control"
                                                value={orderDetails}
                                                onChange={(e) => setOrderDetails(e.target.value)}
                                            />
                                        </div>

                                        <p />

                                        <div className="text-center align-middle form-group">
                                            <input className='text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Update Supply Details" onClick={updateAPIData} />
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