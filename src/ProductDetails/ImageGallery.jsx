import React from 'react'
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { SwiperSlide, Swiper } from 'swiper/react'
import { Autoplay, Navigation, Pagination,A11y } from 'swiper/modules';

const ImageGallery = React.memo(function ({ selectedColor }) {

    return (
        <div>
            {
                selectedColor &&
                selectedColor.images &&
                selectedColor.images.length &&
                <div>
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 max-lg:hidden">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={selectedColor.images[0]?.image?.url}
                                alt=''
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    src={selectedColor.images[1]?.image?.url}
                                    alt=''
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    src={selectedColor.images[2]?.image?.url || ''}
                                    alt=''
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img
                                src={selectedColor.images[3]?.image?.url || ''}
                                alt=''
                                className="h-full w-full object-cover object-center "
                            />
                        </div>
                    </div>
                    <div className='hidden max-lg:block'>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay,A11y]}
                            spaceBetween={30}
                            pagination={{ clickable: true }}
                            navigation
                            scrollbar={{draggable:true}}
                            autoPlay={{ delay: 1000 }}
                            loop
                            slidesPerView={1}
                        >
                            {
                                selectedColor.images.map(({ image: { url } }, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={url}
                                            alt=''
                                            className="size-full object-cover object-center"
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            }
        </div>
    )
})

export default ImageGallery
