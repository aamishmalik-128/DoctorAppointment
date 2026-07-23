import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
    {
        id: 1,
        name: "Ayesha Malik",
        role: "Patient",
        image:
            "https://randomuser.me/api/portraits/women/65.jpg",
        review:
            "Booking an appointment took less than two minutes. The doctor was professional and the digital prescription was available immediately.",
        rating: 5,
    },
    {
        id: 2,
        name: "Ahmed Khan",
        role: "Patient",
        image:
            "https://randomuser.me/api/portraits/men/45.jpg",
        review:
            "The interface is incredibly simple. I no longer wait for hours at hospitals. Everything is organized perfectly.",
        rating: 5,
    },
    {
        id: 3,
        name: "Fatima Noor",
        role: "Patient",
        image:
            "https://randomuser.me/api/portraits/women/52.jpg",
        review:
            "Finding specialists has never been easier. Highly recommended for anyone looking for quality healthcare.",
        rating: 5,
    },
    {
        id: 4,
        name: "Usman Ali",
        role: "Patient",
        image:
            "https://randomuser.me/api/portraits/men/29.jpg",
        review:
            "Very smooth experience from booking to consultation. Definitely the future of healthcare.",
        rating: 5,
    },
];

const TestimonialsSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 py-20 lg:py-28 text-white">

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center flex flex-col items-center"
                >

                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 border border-teal-500/30">
                        <Sparkles size={14} className="text-teal-400" />
                        Patient Testimonials
                    </span>

                    <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                        What Our{" "}
                        <span className="text-teal-400">
                            Patients Say
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
                        Thousands of patients trust our platform for booking appointments with verified healthcare professionals.
                    </p>

                </motion.div>

                {/* Swiper Slider Carousel */}
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1200: {
                            slidesPerView: 3,
                        },
                    }}
                    className="mt-16 !pb-14"
                >

                    {testimonials.map((item) => (

                        <SwiperSlide key={item.id} className="h-auto">

                            <motion.div
                                whileHover={{
                                    y: -6,
                                }}
                                transition={{ duration: 0.2 }}
                                className="h-full rounded-2xl bg-slate-800/60 p-7 sm:p-8 border border-slate-700/80 shadow-md hover:border-teal-500/50 transition-all duration-200 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        {/* Rating Stars */}
                                        <div className="flex gap-1">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className="fill-amber-400 text-amber-400"
                                                />
                                            ))}
                                        </div>

                                        <Quote size={24} className="text-teal-500/30" />
                                    </div>

                                    {/* Quote Content */}
                                    <p className="text-xs sm:text-sm leading-relaxed text-slate-200 font-normal italic">
                                        "{item.review}"
                                    </p>
                                </div>

                                {/* Author Profile */}
                                <div className="mt-8 flex items-center gap-3.5 pt-4 border-t border-slate-700/50">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-12 w-12 rounded-full border-2 border-teal-500/40 object-cover shrink-0 shadow-sm"
                                    />

                                    <div>

                                        <h3 className="font-heading font-bold text-slate-100 text-sm sm:text-base">
                                            {item.name}
                                        </h3>

                                        <p className="text-xs font-semibold text-teal-400">
                                            {item.role}
                                        </p>

                                    </div>

                                </div>

                            </motion.div>

                        </SwiperSlide>

                    ))}

                </Swiper>

            </div>

        </section>
    );
};

export default TestimonialsSection;
