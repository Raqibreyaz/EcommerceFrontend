
const products = [
    {
        "id": 1,
        "name": "Premium Quality T-Shirt",
        "brand": "Nike",
        "description": "A comfortable and stylish premium quality t-shirt made from soft fabric. Perfect for casual wear or workouts.",
        "category": "Clothing",
        "price": 19.99,
        "discount": 0,
        "stock": 100,
        "rating": 4.8,
        "thumbnail": "https://picsum.photos/id/1000/200/200",
        "images": [
            "https://picsum.photos/id/1000/400/400",
            "https://picsum.photos/id/1001/400/400"
        ]
    },
    {
        "id": 2,
        "name": "Wireless Bluetooth Earbuds",
        "brand": "Apple",
        "description": "Experience high-quality sound and convenience with these wireless Bluetooth earbuds from Apple. Perfect for workouts and daily commutes.",
        "category": "Electronics",
        "price": 39.99,
        "discount": 15,
        "stock": 50,
        "rating": 4.5,
        "thumbnail": "https://picsum.photos/id/1002/200/200",
        "images": [
            "https://picsum.photos/id/1002/400/400",
            "https://picsum.photos/id/1003/400/400",
            "https://picsum.photos/id/1004/400/400"
        ]
    },
    {
        "id": 3,
        "name": "Stylish Leather Wallet",
        "brand": "Tommy Hilfiger",
        "description": "Carry your essentials in style with this genuine leather wallet from Tommy Hilfiger. With multiple compartments, it's perfect for everyday use.",
        "category": "Accessories",
        "price": 29.99,
        "discount": 0,
        "stock": 80,
        "rating": 4.2,
        "thumbnail": "https://picsum.photos/id/1005/200/200",
        "images": [
            "https://picsum.photos/id/1005/400/400",
            "https://picsum.photos/id/1006/400/400"
        ]
    },
    {
        "id": 4,
        "name": "Comfortable Running Shoes",
        "brand": "Adidas",
        "description": "Get the ultimate comfort and support for your runs with these comfortable running shoes from Adidas. Featuring cushioned soles and breathable mesh.",
        "category": "Footwear",
        "price": 79.99,
        "discount": 20,
        "stock": 30,
        "rating": 4.6,
        "thumbnail": "https://picsum.photos/id/1007/200/200",
        "images": [
            "https://picsum.photos/id/1007/400/400",
            "https://picsum.photos/id/1008/400/400"
        ]
    },
    {
        "id": 5,
        "name": "Classic Stainless Steel Watch",
        "brand": "Casio",
        "description": "Add a touch of elegance to your wrist with this classic stainless steel watch from Casio. Perfect for both formal and casual occasions.",
        "category": "Accessories",
        "price": 99.99,
        "discount": 5,
        "stock": 20,
        "rating": 4.7,
        "thumbnail": "https://picsum.photos/id/1009/200/200",
        "images": [
            "https://picsum.photos/id/1009/400/400",
            "https://picsum.photos/id/1010/400/400"
        ]
    },
    {
        "id": 6,
        "name": "Vintage Leather Jacket",
        "brand": "Ralph Lauren",
        "description": "Make a bold statement with this vintage leather jacket from Ralph Lauren. Crafted from high-quality leather, it exudes timeless style.",
        "category": "Clothing",
        "price": 149.99,
        "discount": 0,
        "stock": 10,
        "rating": 4.9,
        "thumbnail": "https://picsum.photos/id/1011/200/200",
        "images": [
            "https://picsum.photos/id/1011/400/400",
            "https://picsum.photos/id/1012/400/400"
        ]
    },
    {
        "id": 7,
        "name": "Smart LED TV",
        "brand": "Samsung",
        "description": "Bring entertainment to life with this smart LED TV from Samsung. With stunning picture quality and smart features, it's perfect for any home.",
        "category": "Electronics",
        "price": 599.99,
        "discount": 10,
        "stock": 15,
        "rating": 4.7,
        "thumbnail": "https://picsum.photos/id/1013/200/200",
        "images": [
            "https://picsum.photos/id/1013/400/400",
            "https://picsum.photos/id/1014/400/400",
            "https://picsum.photos/id/1015/400/400"
        ]
    },
    {
        "id": 8,
        "name": "Leather Messenger Bag",
        "brand": "Fossil",
        "description": "Stay organized and stylish on the go with this leather messenger bag from Fossil. It offers plenty of space for your essentials and more.",
        "category": "Accessories",
        "price": 89.99,
        "discount": 5,
        "stock": 25,
        "rating": 4.4,
        "thumbnail": "https://picsum.photos/id/1016/200/200",
        "images": [
            "https://picsum.photos/id/1016/400/400",
            "https://picsum.photos/id/1017/400/400"
        ]
    },
    {
        "id": 9,
        "name": "Running Jacket",
        "brand": "Under Armour",
        "description": "Stay warm and comfortable on your runs with this running jacket from Under Armour. It's designed to protect you from the elements.",
        "category": "Clothing",
        "price": 69.99,
        "discount": 0,
        "stock": 30,
        "rating": 4.6,
        "thumbnail": "https://picsum.photos/id/1018/200/200",
        "images": [
            "https://picsum.photos/id/1018/400/400",
            "https://picsum.photos/id/1019/400/400"
        ]
    },
    {
        "id": 10,
        "name": "Wireless Headphones",
        "brand": "Sony",
        "description": "Enjoy immersive sound and wireless freedom with these wireless headphones from Sony. Perfect for music lovers and gamers alike.",
        "category": "Electronics",
        "price": 79.99,
        "discount": 0,
        "stock": 40,
        "rating": 4.3,
        "thumbnail": "https://picsum.photos/id/1020/200/200",
        "images": [
            "https://picsum.photos/id/1020/400/400",
            "https://picsum.photos/id/1021/400/400"
        ]
    },
    {
        "id": 11,
        "name": "Gaming Mouse",
        "brand": "Logitech",
        "description": "Enhance your gaming experience with this gaming mouse from Logitech. Featuring high precision and customizable buttons.",
        "category": "Electronics",
        "price": 49.99,
        "discount": 0,
        "stock": 60,
        "rating": 4.8,
        "thumbnail": "https://picsum.photos/id/1022/200/200",
        "images": [
            "https://picsum.photos/id/1022/400/400",
            "https://picsum.photos/id/1023/400/400"
        ]
    },
    {
        "id": 12,
        "name": "Casual Backpack",
        "brand": "Herschel Supply Co.",
        "description": "Carry your essentials in style with this casual backpack from Herschel Supply Co. Perfect for daily commutes or weekend adventures.",
        "category": "Accessories",
        "price": 39.99,
        "discount": 0,
        "stock": 50,
        "rating": 4.5,
        "thumbnail": "https://picsum.photos/id/1024/200/200",
        "images": [
            "https://picsum.photos/id/1024/400/400",
            "https://picsum.photos/id/1025/400/400"
        ]
    },
    {
        "id": 13,
        "name": "Slim Fit Jeans",
        "brand": "Levi's",
        "description": "Achieve a sleek and stylish look with these slim fit jeans from Levi's. Made from high-quality denim, they're a wardrobe essential.",
        "category": "Clothing",
        "price": 49.99,
        "discount": 0,
        "stock": 70,
        "rating": 4.2,
        "thumbnail": "https://picsum.photos/id/1026/200/200",
        "images": [
            "https://picsum.photos/id/1026/400/400",
            "https://picsum.photos/id/1027/400/400"
        ]
    },
    {
        "id": 14,
        "name": "Home Security Camera",
        "brand": "Ring",
        "description": "Keep your home safe and secure with this home security camera from Ring. With motion detection and night vision, you can monitor your property 24/7.",
        "category": "Electronics",
        "price": 129.99,
        "discount": 10,
        "stock": 20,
        "rating": 4.7,
        "thumbnail": "https://picsum.photos/id/1028/200/200",
        "images": [
            "https://picsum.photos/id/1028/400/400",
            "https://picsum.photos/id/1029/400/400"
        ]
    },
    {
        "id": 15,
        "name": "Leather Boots",
        "brand": "Dr. Martens",
        "description": "Step out in style with these leather boots from Dr. Martens. With a classic design and durable construction, they're built to last.",
        "category": "Footwear",
        "price": 89.99,
        "discount": 0,
        "stock": 35,
        "rating": 4.6,
        "thumbnail": "https://picsum.photos/id/1030/200/200",
        "images": [
            "https://picsum.photos/id/1030/400/400",
            "https://picsum.photos/id/1031/400/400"
        ]
    },
    {
        "id": 16,
        "name": "Denim Jacket",
        "brand": "Wrangler",
        "description": "Add a rugged touch to your look with this denim jacket from Wrangler. Made from durable denim, it's perfect for layering.",
        "category": "Clothing",
        "price": 69.99,
        "discount": 0,
        "stock": 25,
        "rating": 4.8,
        "thumbnail": "https://picsum.photos/id/1032/200/200",
        "images": [
            "https://picsum.photos/id/1032/400/400",
            "https://picsum.photos/id/1033/400/400"
        ]
    },
    {
        "id": 17,
        "name": "Bluetooth Speaker",
        "brand": "JBL",
        "description": "Enjoy powerful sound on the go with this Bluetooth speaker from JBL. With a compact design and long battery life, it's perfect for outdoor adventures.",
        "category": "Electronics",
        "price": 59.99,
        "discount": 5,
        "stock": 40,
        "rating": 4.4,
        "thumbnail": "https://picsum.photos/id/1034/200/200",
        "images": [
            "https://picsum.photos/id/1034/400/400",
            "https://picsum.photos/id/1035/400/400"
        ]
    },
    {
        "id": 18,
        "name": "Leather Belt",
        "brand": "Calvin Klein",
        "description": "Complete your look with this leather belt from Calvin Klein. With a timeless design, it adds a touch of sophistication to any outfit.",
        "category": "Accessories",
        "price": 29.99,
        "discount": 0,
        "stock": 60,
        "rating": 4.7,
        "thumbnail": "https://picsum.photos/id/1036/200/200",
        "images": [
            "https://picsum.photos/id/1036/400/400",
            "https://picsum.photos/id/1037/400/400"
        ]
    },
    {
        "id": 19,
        "name": "Hiking Boots",
        "brand": "Merrell",
        "description": "Take on the trails with confidence in these hiking boots from Merrell. With rugged construction and advanced traction, they're built for adventure.",
        "category": "Footwear",
        "price": 119.99,
        "discount": 10,
        "stock": 15,
        "rating": 4.5,
        "thumbnail": "https://picsum.photos/id/1038/200/200",
        "images": [
            "https://picsum.photos/id/1038/400/400",
            "https://picsum.photos/id/1039/400/400"
        ]
    },
    {
        "id": 20,
        "name": "Cotton Polo Shirt",
        "brand": "Lacoste",
        "description": "Stay cool and stylish with this cotton polo shirt from Lacoste. With a classic design and breathable fabric, it's perfect for everyday wear.",
        "category": "Clothing",
        "price": 34.99,
        "discount": 0,
        "stock": 70,
        "rating": 4.6,
        "thumbnail": "https://picsum.photos/id/1040/200/200",
        "images": [
            "https://picsum.photos/id/1040/400/400",
            "https://picsum.photos/id/1041/400/400"
        ]
    },
    {
        "id": 21,
        "name": "External Hard Drive",
        "brand": "Seagate",
        "description": "Back up your files with ease using this external hard drive from Seagate. With high-speed data transfer and ample storage space, it's perfect for storing your important documents and media files.",
        "category": "Electronics",
        "price": 89.99,
        "discount": 0,
        "stock": 25,
        "rating": 4.3,
        "thumbnail": "https://picsum.photos/id/1042/200/200",
        "images": [
            "https://picsum.photos/id/1042/400/400",
            "https://picsum.photos/id/1043/400/400"
        ]
    },
    {
        "id": 22,
        "name": "Sunglasses",
        "brand": "Ray-Ban",
        "description": "Protect your eyes in style with these sunglasses from Ray-Ban. With a timeless design and UV protection, they're perfect for sunny days.",
        "category": "Accessories",
        "price": 49.99,
        "discount": 0,
        "stock": 40,
        "rating": 4.5,
        "thumbnail": "https://picsum.photos/id/1044/200/200",
        "images": [
            "https://picsum.photos/id/1044/400/400",
            "https://picsum.photos/id/1045/400/400"
        ]
    },
    {
        "id": 23,
        "name": "Gaming Keyboard",
        "brand": "Razer",
        "description": "Dominate the competition with this gaming keyboard from Razer. With customizable RGB lighting and responsive keys, it gives you the edge you need to win.",
        "category": "Electronics",
        "price": 79.99,
        "discount": 0,
        "stock": 50,
        "rating": 4.6,
        "thumbnail": "https://picsum.photos/id/1046/200/200",
        "images": [
            "https://picsum.photos/id/1046/400/400",
            "https://picsum.photos/id/1047/400/400"
        ]
    },
    {
        "id": 24,
        "name": "Leather Wallet with Coin Pocket",
        "brand": "Michael Kors",
        "description": "Organize your essentials in style with this leather wallet from Michael Kors. With multiple card slots and a convenient coin pocket, it's perfect for everyday use.",
        "category": "Accessories",
        "price": 39.99,
        "discount": 0,
        "stock": 45,
        "rating": 4.4,
        "thumbnail": "https://picsum.photos/id/1048/200/200",
        "images": [
            "https://picsum.photos/id/1048/400/400",
            "https://picsum.photos/id/1049/400/400"
        ]
    },
    {
        "id": 25,
        "name": "Ankle Boots",
        "brand": "Steve Madden",
        "description": "Add a trendy touch to your outfit with these ankle boots from Steve Madden. With a sleek design and comfortable fit, they're perfect for any occasion.",
        "category": "Footwear",
        "price": 69.99,
        "discount": 0,
        "stock": 30,
        "rating": 4.7,
        "thumbnail": "https://picsum.photos/id/1050/200/200",
        "images": [
            "https://picsum.photos/id/1050/400/400",
            "https://picsum.photos/id/1051/400/400"
        ]
    }
];

// taking all the categories from every product
const categories = [...new Set(products.map(p => p.category))]

console.log(categories);

// taking all the brands from all the products
const brands = [...new Set(products.map(b => b.brand))]

console.log(brands);

     // sizes.length > 0 && colors.length > 0 && (
                //     <div className="border p-4 rounded-lg space-y-4">
                //         <h2 className="text-lg font-semibold">Stocks:</h2>
                //         {
                //             sizeFields.map((size, sizeIndex) => {
                //                 // if (!size)
                //                 //     return null
                //                 return colorFields.map((color, colorIndex) => {
                //                     // if (!color.color)
                //                     //     return null
                //                     return <div key={`${size.size}-${color.color}`} className="flex space-x-2 mb-2">
                //                         <span className="font-semibold">Size: {size.size}, Color: {color.color}</span>
                //                         <input
                //                             type="number"
                //                             placeholder="Stock"
                //                             {...register(`stocks.${sizeIndex * colors.length + colorIndex}.stock`, { required: true })}
                //                             className="border p-2 rounded"
                //                         />

                //                     </div>
                //                 })
                //             })}
                //     </div>
                // )})