"use client"
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "John.K",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      text: "TaasGrid AI matched me to my dream job within 2 weeks of signing up! The process was seamless and the opportunities were top-notch. Highly recommend for any professional looking to advance their career."
    },
    {
      id: 2,
      name: "Sarah.M",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      text: "The platform's AI-driven matching is incredible. I found a role that perfectly aligned with my skills and career goals. The entire experience exceeded my expectations."
    },
    {
      id: 3,
      name: "Michael.R",
      role: "UX Designer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      text: "TaasGrid transformed my job search journey. Within a month, I had multiple offers from top companies. The personalized approach made all the difference."
    },
    {
      id: 4,
      name: "Emily.L",
      role: "Data Scientist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      text: "Outstanding service! The AI matching algorithm understood exactly what I was looking for. I landed my ideal position faster than I ever thought possible."
    },
    {
      id: 5,
      name: "David.C",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      text: "From start to finish, TaasGrid provided exceptional support. The quality of opportunities and the efficiency of the process was truly impressive. Highly recommended!"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            What our <span className="text-teal-500">clients</span> say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Here from satisfied professionals who have advanced their careers with our dedicated services.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-3xl shadow-xl p-12 max-w-5xl mx-auto transform hover:scale-105 transition-transform duration-300">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      {/* Image Section */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-72 h-72 rounded-2xl overflow-hidden shadow-2xl">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-4 -right-4 bg-teal-500 rounded-full p-4 shadow-lg">
                            <Quote className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-teal-500 text-xl font-semibold mb-6">
                          Client Testimonial
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed mb-8">
                          "{testimonial.text}"
                        </p>
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-1">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-500 text-lg">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-4 shadow-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-teal-500/20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-4 shadow-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-teal-500/20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-12 bg-teal-500' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}