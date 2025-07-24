"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const quotes = [
  {
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
    role: "Founding Father of the United States"
  },
  {
    text: "Do not save what is left after spending, but spend what is left after saving.",
    author: "Warren Buffett",
    role: "Investor, CEO of Berkshire Hathaway"
  },
  {
    text: "It's not your salary that makes you rich, it's your spending habits.",
    author: "Charles A. Jaffe",
    role: "Financial Journalist"
  },
  {
    text: "The stock market is filled with individuals who know the price of everything, but the value of nothing.",
    author: "Philip Fisher",
    role: "Investor, Author"
  },
  {
    text: "Beware of little expenses; a small leak will sink a great ship.",
    author: "Benjamin Franklin",
    role: "Founding Father of the United States"
  },
  {
    text: "Financial freedom is available to those who learn about it and work for it.",
    author: "Robert Kiyosaki",
    role: "Entrepreneur, Author of Rich Dad Poor Dad"
  },
  {
    text: "The goal isn’t more money. The goal is living life on your terms.",
    author: "Chris Brogan",
    role: "Author, Entrepreneur"
  },
  {
    text: "Try to save something while your salary is small; it’s impossible to save after you begin to earn more.",
    author: "Jack Benny",
    role: "Comedian, Entertainer"
  },
  {
    text: "Never spend your money before you have earned it.",
    author: "Thomas Jefferson",
    role: "3rd President of the United States"
  },
  {
    text: "Money is a terrible master but an excellent servant.",
    author: "P.T. Barnum",
    role: "Showman, Businessman"
  }
];

type QuoteType = {
  text: string;
  author: string;
  role: string;
};

const Quote = () => {
  return (
    <section id="quote" className="bg-[#E0F2FE] w-full shadow-md ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {quotes.map((quote: QuoteType, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col m-auto w-full px-10 md:w-1/2 items-center justify-evenly gap-5 text-white py-20 box-border">
              <p className="text-gray-700 text-center text-2xl md:text-4xl italic font-semibold">“{quote.text}”</p>
              <div className="text-center">
                <p className="text-lg text-primary md:text-base font-semibold mt-2">{quote.author}</p>
                <p className="text-sm text-gray-500">{quote.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Quote;
