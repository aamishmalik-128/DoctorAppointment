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
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        review:
            "Booking an appointment took less than two minutes. The doctor was professional and the digital prescription was available immediately.",
        rating: 5,
    },
    {
        id: 2,
        name: "Ahmed Khan",
        role: "Patient",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        review:
            "The interface is incredibly simple. I no longer wait for hours at hospitals. Everything is organized perfectly.",
        rating: 5,
    },
    {
        id: 3,
        name: "Fatima Noor",
        role: "Patient",
        image: "https://randomuser.me/api/portraits/women/52.jpg",
        review:
            "Finding specialists has never been easier. Highly recommended for anyone looking for quality healthcare.",
        rating: 5,
    },
    {
        id: 4,
        name: "Usman Ali",
        role: "Patient",
        image: "https://randomuser.me/api/portraits/men/29.jpg",
        review:
            "Very smooth experience from booking to consultation. Definitely the future of healthcare.",
        rating: 5,
    },
];

const TestimonialsSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/60 to-emerald-50 py-20 lg:py-28 text-slate-800 border-t border-teal-100/60">

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center flex flex-col items-center"
                >

                    <span className="inline-flex items-center gap-2 rounded-full bg-teal-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 border border-teal-200/80">
                        <Sparkles size={14} className="text-teal-600" />
                        Patient Testimonials
                    </span>

                    <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                        What Our{" "}
                        <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Patients Say
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
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
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    }}
                    className="mt-16 !pb-14"
                >

                    {testimonials.map((item) => (

                        <SwiperSlide key={item.id} className="h-auto">

                            <motion.div
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.2 }}
                                className="h-full rounded-2xl bg-white/90 border border-teal-100 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-200 flex flex-col justify-between backdrop-blur-md"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-1">
                                            {[...Array(item.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className="fill-amber-400 text-amber-400"
                                                />
                                            ))}
                                        </div>

                                        <Quote size={24} className="text-teal-400/40" />
                                    </div>

                                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal italic">
                                        "{item.review}"
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center gap-3.5 pt-4 border-t border-teal-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-12 w-12 rounded-full border-2 border-teal-500 object-cover shrink-0 shadow-sm"
                                    />

                                    <div>
                                        <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs font-semibold text-teal-700">
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
