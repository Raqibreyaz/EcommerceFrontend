import React, { memo, useMemo, useState } from 'react';
import { useFetchMessagesQuery } from '../dashboardSlice.js'
import { Container, Pagination } from '../../../components/index.js'

// userDetails,subject,description
const messages = [
    {
        id: 1,
        name: 'James Cartel',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        message: 'Hey, can you share me new design course? because I do not have this one. Thanks! :)',
        time: 'Now',
        isOnline: false,
    },
    {
        id: 2,
        name: 'Sarah Mint',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        message: 'I think about it, but in my opinion I can work as a UI/UX designer, what is your opinion?',
        time: '13min',
        isOnline: false,
    },
    {
        id: 3,
        name: 'Jack Newson',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        message: 'Hi! I have a question, can you help me with new design app? I have a problem with User experience.',
        time: '24min',
        isOnline: false,
    },
    {
        id: 4,
        name: 'Mark Musk',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        message: 'Hi man! Thanks for your course, it’s really cool. Tomorrow I go to new job! Great! Thank you :)',
        time: '1hour',
        isOnline: false,
    },
    {
        id: 5,
        name: 'Andrew Pyrirakow',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        message: 'Hey, can you share me new design course? because I do not have this one. Thanks! :)',
        time: '3hours',
        isOnline: false,
    },
];

const MessageItem = memo(({ userDetails = {}, subject = '', createdAt = '', description = '', }) => {

    const isOfToday = useMemo(() => {
        const providedDate = new Date(createdAt)
        const today = new Date()

        const isToday = (today - providedDate) / (1000 * 60 * 60 * 24)

        return isToday <= 1
    }, [createdAt])

    return (
        <div className={`flex items-start p-4 bg-white hover:bg-gray-100 transition-colors duration-200 ease-in-out`}>
            <img src={userDetails?.avatar?.url} alt={userDetails?.fullname} className="w-10 h-10 rounded-full mr-4" />
            <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold capitalize">{userDetails?.fullname}</h4>
                    <span className="text-sm text-gray-500">
                        {isOfToday ? 'today' : (new Date(createdAt)).toDateString()}
                    </span>
                </div>
                <p className="text-gray-700 font-semibold text-sm">{subject}</p>
                <p className="text-gray-700 text-sm">{description}</p>
                <p className='ml-auto w-20 text-sm text-gray-500'>{new Date(createdAt).toLocaleTimeString()}</p>
            </div>
            {/* {isOnline && <span className="ml-2 px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">Now</span>} */}
        </div>
    );
})

const MessageCard = ({ userDetails = {}, subject = '', createdAt = '', description = '', }) => {

    const isOfToday = useMemo(() => {
        const providedDate = new Date(createdAt)
        const today = new Date()

        const isToday = (today - providedDate) / (1000 * 60 * 60 * 24)

        return isToday <= 1
    }, [createdAt])

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-start">
            <img
                src={userDetails.avatar.url}
                alt={`${userDetails.fullname}'s avatar`}
                className="w-16 h-16 rounded-full mr-4"
            />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold capitalize">{userDetails.fullname}</h3>
                    <div className=''>
                        <span className="text-sm text-gray-500 block h-4">{new Date(createdAt).toLocaleTimeString()}</span>
                        <span className="text-sm text-gray-500">{!isOfToday ? 'today' : new Date(createdAt).toDateString()}</span>
                    </div>
                </div>
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

// _id: 1,
//     subject: 1,
//         description: 1,
//             "userDetails.fullname": 1,
//                 "userDetails.email": 1,
//                     "userDetails.phoneNo": 1,
//                         "userDetails.avatar": 1,
//                             'userDetails.address': { $arrayElemAt: ["$userDetails.addresses", 0] },
// "userDetails.role": 1

const Messages = () => {

    const [page, setPage] = useState(1)

    const { data: { messages = [], filteredTotal = 0, totalPages } = {}, isLoading: isLoadingMessages } = useFetchMessagesQuery(`page=${page}&&limit=10`)

    console.log(messages);

    return (
        <Container
            LoadingConditions={[!!isLoadingMessages]}
            RenderingConditions={[!!messages, messages.length > 0]}
            className="w-full bg-white shadow-md rounded-lg overflow-hidden"
        >
            <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold">Messages</h3>
                <p className="text-sm text-gray-500">{filteredTotal} messages</p>
            </div>
            <div>
                {messages.map(message => (
                    <MessageCard key={message._id} {...message} />
                    // <MessageItem key={message._id} {...message} />
                ))}
            </div>
            <Pagination totaPages={totalPages} filteredTotal={filteredTotal} page={page} PageChanger={setPage} />
        </Container>
    );
};

export default Messages;
