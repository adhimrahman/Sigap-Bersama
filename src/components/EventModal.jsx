// EventModal.js
import React, { useState } from 'react';

const EventModal = ({ isOpen, onClose, onSubmit }) => {
    const [eventDetails, setEventDetails] = useState({
        description: '',
        activityDetail: '',
        jobDetail: '',
        volunteerCriteria: '',
        volunteerSupplies: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({ ...eventDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(eventDetails);
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
                <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Add Event</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Deskripsi Event:
                        <input
                            type="text"
                            name="description"
                            value={eventDetails.description}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Detail Aktivitas:
                        <input
                            type="text"
                            name="activityDetail"
                            value={eventDetails.activityDetail}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Detail Pekerjaan:
                        <input
                            type="text"
                            name="jobDetail"
                            value={eventDetails.jobDetail}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Kriteria Relawan:
                        <input
                            type="text"
                            name="volunteerCriteria"
                            value={eventDetails.volunteerCriteria}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                    <label className="block mb-2">
                        Perlengkapan Relawan:
                        <input
                            type="text"
                            name="volunteerSupplies"
                            value={eventDetails.volunteerSupplies}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </label>
                    <button type="submit" className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventModal;