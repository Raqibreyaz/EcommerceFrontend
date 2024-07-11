// import React from 'react';

// const people = [
//   {
//     id: 1,
//     name: 'John Doe',
//     avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
//     dateJoined: '2023-01-15',
//     productsSold: 120,
//     revenueGenerated: 15000,
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
//     dateJoined: '2022-11-20',
//     productsSold: 200,
//     revenueGenerated: 25000,
//   },
//   {
//     id: 3,
//     name: 'Alice Johnson',
//     avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
//     dateJoined: '2023-03-10',
//     productsSold: 180,
//     revenueGenerated: 22000,
//   },
//   {
//     id: 4,
//     name: 'Bob Brown',
//     avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
//     dateJoined: '2022-12-05',
//     productsSold: 150,
//     revenueGenerated: 18000,
//   },
//   // Add more people as needed
// ];

// const Sellers = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4 text-center">People List</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {people.map((person) => (
//           <div
//             key={person.id}
//             className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
//           >
//             <div className="flex items-center mb-4">
//               <img
//                 src={person.avatar}
//                 alt={person.name}
//                 className="w-16 h-16 rounded-full mr-4"
//               />
//               <div>
//                 <h2 className="text-xl font-semibold">{person.name}</h2>
//                 <p className="text-gray-500">Joined: {new Date(person.dateJoined).toLocaleDateString()}</p>
//               </div>
//             </div>
//             <div className="text-gray-700">
//               <p>Products Sold: {person.productsSold}</p>
//               <p>Revenue Generated: ${person.revenueGenerated.toLocaleString()}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sellers;

import React from 'react';

const people = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    dateJoined: '2023-01-15',
    productsSold: 120,
    revenueGenerated: 15000,
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    dateJoined: '2022-11-20',
    productsSold: 200,
    revenueGenerated: 25000,
  },
  {
    id: 3,
    name: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    dateJoined: '2023-03-10',
    productsSold: 180,
    revenueGenerated: 22000,
  },
  {
    id: 4,
    name: 'Bob Brown',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    dateJoined: '2022-12-05',
    productsSold: 150,
    revenueGenerated: 18000,
  },
  // Add more people as needed
];

const PeopleList = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">People List</h1>
      <div className="space-y-6">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-blue-50 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold text-blue-900">{person.name}</h2>
                <p className="text-gray-500">Joined: {new Date(person.dateJoined).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="text-gray-700">
              <p>Products Sold: {person.productsSold}</p>
              <p>Revenue Generated: ${person.revenueGenerated.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleList;
