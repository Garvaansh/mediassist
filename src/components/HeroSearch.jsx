import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HeroSearch() {
  const [formData, setFormData] = useState({ specialty: "", location: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // clear error as user types
  }

  function handleSearch(e) {
    e.preventDefault();
    const specialty = formData.specialty.trim();
    const location = formData.location.trim();

    // ❌ Block if only location is provided
    if (!specialty && location) {
      setError("Specialty is required.");
      return;
    }

    // ✅ Proceed if valid
    const params = new URLSearchParams();
    if (specialty) params.append("specialty", specialty);
    if (location) params.append("location", location);

    navigate(`/search?${params.toString()}`);
  }

  return (
    <section className="bg-base-200 rounded-2xl shadow-md p-6 sm:p-8 mb-10">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-primary">
          Find the Right Doctor
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Search from a curated list of top-rated doctors near you
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 items-center justify-center"
      >
        {/* Specialty Input */}
        <div className="form-control w-full sm:w-64">
          <label className="input input-bordered flex items-center gap-2 rounded-full px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="Specialty"
              className="grow placeholder-gray-500 caret-primary bg-transparent focus:outline-none text-gray-800" // Added text-gray-800
            />
          </label>
          {error && (
            <p className="text-sm text-red-500 mt-1 pl-2 font-medium">
              {error}
            </p>
          )}
        </div>

        {/* Location Input */}
        <div className="form-control w-full sm:w-64">
          <label className="input input-bordered flex items-center gap-2 rounded-full px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 11c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 22c-4.418 0-8-6-8-10a8 8 0 1116 0c0 4-3.582 10-8 10z"
              />
            </svg>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="grow placeholder-gray-500 caret-primary bg-transparent focus:outline-none text-gray-800" // Added text-gray-800
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary rounded-full px-6 font-semibold w-full sm:w-auto"
        >
          Search
        </button>
      </form>
    </section>
  );
}
