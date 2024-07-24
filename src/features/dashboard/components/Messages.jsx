import React, { memo } from 'react';

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

const MessageItem = memo(({ name, avatar, message, time, isOnline = false }) => {
    return (
        <div className={`flex items-start p-4 ${isOnline ? 'bg-blue-100' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200 ease-in-out`}>
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-4" />
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold">{name}</h4>
                    <span className="text-sm text-gray-500">{time}</span>
                </div>
                <p className="text-gray-700 text-sm">{message}</p>
            </div>
            {isOnline && <span className="ml-2 px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">Now</span>}
        </div>
    );
})

const Messages = () => {
    return (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold">Messages</h3>
                <p className="text-sm text-gray-500">23 messages</p>
            </div>
            <div>
                {messages.map(message => (
                    <MessageItem key={message.id} {...message} />
                ))}
            </div>
        </div>
    );
};

export default Messages;
