import React, { memo, useMemo, useState } from 'react';
import { useFetchMessagesQuery } from '../dashboardSlice.js'
import { Container, Pagination } from '../../../components/index.js'


const MessageCard = ({ userDetails = {}, subject = '', createdAt = '', description = '', }) => {

    const isOfToday = useMemo(() => {
        const providedDate = new Date(createdAt)
        const today = new Date()

        const isToday = (today - providedDate) / (1000 * 60 * 60 * 24)

        return isToday <= 1
    }, [createdAt])

    return (
        <div className="bg-white p-3 rounded-lg border-y mb-6 flex max-sm:flex-col items-start">
            <img
                src={userDetails.avatar.url}
                alt={`${userDetails.fullname}'s avatar`}
                className="w-16 h-16 rounded-full border mr-2"
            />
            <div className="flex-1 max-sm:w-full">
                <div className="flex justify-between items-center mb-2">
                    {/* name */}
                    <h3 className="text-lg font-semibold capitalize">{userDetails.fullname}</h3>
                    {/* date */}
                    <div className='text-end'>
                        <span className="text-sm text-gray-500 block h-4">{new Date(createdAt).toLocaleTimeString()}</span>
                        <span className="text-sm text-gray-500">{isOfToday ? 'today' : new Date(createdAt).toDateString()}</span>
                    </div>
                </div>
                {/* details */}
                <div className="text-sm text-gray-500 mb-2">
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Phone No:</strong> {userDetails.phoneNo}</p>
                    <p><strong>Role:</strong> {userDetails.role}</p>
                    <p><strong>Address:</strong> {`${userDetails.address.house_no}, ${userDetails.address.city}, ${userDetails.address.state}, ${userDetails.address.pincode}`}</p>
                </div>
                <h4 className="text-md text-gray-700 mb-2 font-semibold">{subject}</h4>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

const Messages = () => {

    const [page, setPage] = useState(1)

    const { data: { messages = [], filteredTotal = 0, totalPages } = {}, isLoading: isLoadingMessages } = useFetchMessagesQuery(`page=${page}&&limit=10`)

    return (
        <Container
            LoadingConditions={[!!isLoadingMessages]}
            RenderingConditions={[!!messages, messages.length > 0]}
            className="w-full bg-white shadow-md rounded-lg overflow-hidden"
            backupElem={<h1 className='text-2xl text-center font-semibold'>no messages found</h1>
            }
        >
            <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold">Messages</h3>
                <p className="text-sm text-gray-500">{filteredTotal} messages</p>
            </div>
            <div>
                {messages.map(message => (
                    <MessageCard key={message._id} {...message} />
                ))}
            </div>
            <Pagination totaPages={totalPages} filteredTotal={filteredTotal} page={page} PageChanger={setPage} />
        </Container>
    );
};

export default Messages;
