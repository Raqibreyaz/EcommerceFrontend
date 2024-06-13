import React from 'react';

const messages = [
    {
        id: 1,
        name: 'James Cartel',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        message: 'Hey, can you share me new design course? because I do not have this one. Thanks! :)',
        time: 'Now',
        isOnline: true,
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

const MessageItem = ({ name, avatar, message, time, isOnline }) => {
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
};

const MessageList = () => {
    return (
        <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
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

const DetailedMessage = () => {
    return (
        <div className="max-w-[65%] bg-white shadow-md rounded-lg overflow-hidden p-6">
            {/* Header */}
            <div className="flex items-center mb-4">
                <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="James Cartel"
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <h4 className="text-xl font-bold">James Cartel</h4>
                    <p className="text-sm text-gray-500">Design student</p>
                </div>
            </div>

            {/* Image */}
            <div className="mb-4">
                <img
                    src="https://via.placeholder.com/400x200"
                    alt="Example"
                    className="w-full h-auto rounded-lg"
                />
            </div>

            {/* Main Message */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">I need new design course files! <span role="img" aria-label="smile">😃</span></h2>
                <div className="flex space-x-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">Student</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">Design</span>
                </div>
            </div>

            {/* Content */}
            <div className="text-gray-700 text-sm">
                <p className="mb-4">Hey, can you share me new design course? because I do not have this one. Thanks! :)</p>
                <p className="mb-4">Maecenas egestas magna eu rutrum tincidunt. Phasellus dapibus tortor ac lorem bibendum tempus eu ornare nulla. Suspendisse neque nulla, euismod a orci eget, egestas lacinia purus. Morbi ac vestibulum erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                <p className="mb-4">Aenean ut dolor nec est efficitur viverra id vel est. Aenean ac velit in arcu aliquam aliquet at vitae est. Donec porttitor, ex vel consectetur gravida, nulla lacus facilisis eros, commodo convallis libero elit a eros. Nunc quis elit viverra massa cursus ultrices. Fusce ultricies, velit eu suscipit vulputate, tortor elit convallis dolor, sed dictum quam neque eget est.</p>
                <p>Nam sed tincidunt nulla, a commodo libero. Nulla viverra erat nec enim fermentum porta.</p>
            </div>
        </div>
    );
};

const MessageCompo = () => {
    return (
        <div className='w-full flex gap-2'>
            <MessageList />
            <DetailedMessage />
        </div>
    )
}


export default MessageCompo;
