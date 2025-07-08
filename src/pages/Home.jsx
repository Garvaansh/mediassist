import HeroSearch from "../components/HeroSearch";
import DoctorCard from "../components/CompactDoctorCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [topDoctors, setTopDoctors] = useState([]);

  useEffect(() => {
    fetch(`${API}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.rating - a.rating);
        setTopDoctors(sorted.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  return (
    <div className="p-6 pt-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-secondary rounded-2xl overflow-hidden shadow-xl mb-16">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/medical-healthcare-blue-color_1017-26807.jpg')] bg-cover opacity-10"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 sm:p-12 md:p-16 lg:p-20 gap-8">
          {/* Left Content */}
          <div className="lg:w-1/2 text-white text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Find the Perfect
              <br className="hidden sm:inline" /> Healthcare Specialist
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-2xl">
              Connect with top-rated doctors, book appointments instantly, and
              take control of your health journey.
            </p>
            <div className="max-w-xl mx-auto lg:mx-0">
              <HeroSearch />
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 hidden md:flex justify-center items-end">
            <img
              src="/group-doctors.png"
              alt="Doctor Group"
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain"
            />
          </div>
        </div>
      </div>

      {/* Value Propositions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-base-100 p-6 rounded-xl shadow-sm flex items-start">
          <div className="bg-primary/10 p-3 rounded-lg mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Verified Professionals</h3>
            <p className="text-gray-600">
              All doctors are thoroughly vetted for credentials and expertise.
            </p>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-xl shadow-sm flex items-start">
          <div className="bg-primary/10 p-3 rounded-lg mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Instant Booking</h3>
            <p className="text-gray-600">
              Schedule appointments 24/7 with real-time availability.
            </p>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-xl shadow-sm flex items-start">
          <div className="bg-primary/10 p-3 rounded-lg mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Digital Records</h3>
            <p className="text-gray-600">
              Access your medical history and prescriptions anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Top Doctors Section */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Top Rated Doctors
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Highly recommended by patients for their expertise and compassionate
            care
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            What Patients Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star"
                    defaultChecked
                  />
                </div>
              </div>
              <p className="italic mb-4">
                "Found an amazing cardiologist through this platform. The
                booking process was seamless and the doctor was incredibly
                knowledgeable."
              </p>
              <div className="flex items-center">
                <div className="avatar placeholder mr-3">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span>RS</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Raj Sharma</p>
                  <p className="text-sm text-white/80">Mumbai</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star"
                    defaultChecked
                  />
                </div>
              </div>
              <p className="italic mb-4">
                "The telehealth option saved me during lockdown. I could consult
                with my doctor without leaving home. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="avatar placeholder mr-3">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span>PP</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Priya Patel</p>
                  <p className="text-sm text-white/80">Pune</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-3"
                    className="mask mask-star"
                    defaultChecked
                  />
                </div>
              </div>
              <p className="italic mb-4">
                "As a senior citizen, I appreciate how easy this platform is to
                use. Found a great physician who understands my needs."
              </p>
              <div className="flex items-center">
                <div className="avatar placeholder mr-3">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span>AM</span>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Amit Mehta</p>
                  <p className="text-sm text-white/80">Bhopal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-base-200 rounded-2xl shadow-md my-16 py-12 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
          Ready to Find Your Doctor?
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Join thousands of patients who have found the right care through our
          platform.
        </p>
        <Link
          to="/search"
          className="btn btn-primary btn-lg rounded-full px-8 hover:scale-105 transition-transform"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
}
