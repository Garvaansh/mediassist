import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";

const API = import.meta.env.VITE_API_URL;

export default function Search() {
  const [searchParams] = useSearchParams();
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Separate filter states for better performance
  const [minRating, setMinRating] = useState(0);
  const [acceptingNewPatients, setAcceptingNewPatients] = useState(false);
  const [telehealthAvailable, setTelehealthAvailable] = useState(false);

  const specialty = searchParams.get("specialty")?.toLowerCase() || "";
  const location = searchParams.get("location")?.toLowerCase() || "";

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API}/doctors`);
        const data = await response.json();
        setAllDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Memoized filtered doctors
  const filteredDoctors = useMemo(() => {
    return allDoctors.filter((doctor) => {
      const matchSpecialty =
        !specialty || doctor.specialty.toLowerCase().includes(specialty);

      const matchLocation =
        !location || doctor.location.toLowerCase().includes(location);

      const matchRating = doctor.rating >= minRating;
      const matchNewPatients =
        !acceptingNewPatients || doctor.acceptingNewPatients;
      const matchTelehealth = !telehealthAvailable || doctor.offersTelehealth;

      return (
        matchSpecialty &&
        matchLocation &&
        matchRating &&
        matchNewPatients &&
        matchTelehealth
      );
    });
  }, [
    allDoctors,
    specialty,
    location,
    minRating,
    acceptingNewPatients,
    telehealthAvailable,
  ]);

  const clearFilters = useCallback(() => {
    setMinRating(0);
    setAcceptingNewPatients(false);
    setTelehealthAvailable(false);
  }, []);

  // Results count text
  const resultsText = useMemo(() => {
    if (loading) return "Loading...";
    if (filteredDoctors.length === 0) return "No doctors found";
    return `Found ${filteredDoctors.length} doctor${
      filteredDoctors.length !== 1 ? "s" : ""
    }`;
  }, [loading, filteredDoctors.length]);

  return (
    <div className="p-4 md:p-6 pt-12 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Find Your Doctor
        </h1>
        <p className="text-lg text-gray-600">
          {specialty ? `Specializing in ${specialty}` : "All Specialties"}
          {location ? ` in ${location}` : ""}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Enhanced UI */}
        <div className="w-full lg:w-1/4 bg-base-100 p-6 rounded-xl shadow-md h-fit sticky top-4">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:text-primary-focus font-medium transition-colors"
            >
              Clear all
            </button>
          </div>

          {/* Rating Filter */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span>⭐</span> Minimum Rating
            </h3>
            <div className="flex flex-wrap gap-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    minRating === rating
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setMinRating(rating)}
                >
                  {rating === 0 ? "Any" : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Filters */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <span>🕒</span> Availability
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={acceptingNewPatients}
                  onChange={(e) => setAcceptingNewPatients(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="text-gray-700">Accepting New Patients</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={telehealthAvailable}
                  onChange={(e) => setTelehealthAvailable(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="text-gray-700">Telehealth Available</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full lg:w-3/4">
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <p
              className={`text-center font-medium ${
                filteredDoctors.length === 0 && !loading
                  ? "text-amber-600"
                  : "text-gray-700"
              }`}
            >
              {resultsText}
            </p>
          </div>

          {error ? (
            <div className="text-center py-12 bg-red-50 rounded-xl">
              <div className="text-5xl mb-4">❌</div>
              <h3 className="text-xl font-medium mb-2">Error Loading Data</h3>
              <p className="text-gray-600 max-w-md mx-auto">{error}</p>
              <button
                className="mt-4 btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : loading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-12 bg-base-100 rounded-xl">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-medium mb-2">
                No doctors match your search
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Try adjusting your filters or search criteria
              </p>
              <button
                className="btn btn-outline btn-primary"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
