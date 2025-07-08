// Search.jsx
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";

const API = import.meta.env.VITE_API_URL;

export default function Search() {
  const [searchParams] = useSearchParams();
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minRating: 0,
    acceptingNewPatients: false,
    telehealthAvailable: false,
    specialties: [],
    locations: [],
  });

  const specialty = searchParams.get("specialty")?.toLowerCase() || "";
  const location = searchParams.get("location")?.toLowerCase() || "";

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setAllDoctors(data);
        setFilteredDoctors(data);
        setLoading(false);

        // Extract unique specialties and locations
        const uniqueSpecialties = [
          ...new Set(data.map((doc) => doc.specialty)),
        ];
        const uniqueLocations = [...new Set(data.map((doc) => doc.location))];

        setFilters((prev) => ({
          ...prev,
          specialties: uniqueSpecialties,
          locations: uniqueLocations,
        }));
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      });
  }, []);

  // Apply filters whenever filters state changes
  useEffect(() => {
    if (allDoctors.length === 0) return;

    const filtered = allDoctors.filter((doctor) => {
      // Initial search params
      const matchSpecialty =
        specialty === "" || doctor.specialty.toLowerCase().includes(specialty);

      const matchLocation =
        location === "" || doctor.location.toLowerCase().includes(location);

      // Additional filters
      const matchRating = doctor.rating >= filters.minRating;
      const matchNewPatients =
        !filters.acceptingNewPatients || doctor.acceptingNewPatients;
      const matchTelehealth =
        !filters.telehealthAvailable || doctor.offersTelehealth;

      return (
        matchSpecialty &&
        matchLocation &&
        matchRating &&
        matchNewPatients &&
        matchTelehealth
      );
    });

    setFilteredDoctors(filtered);
  }, [allDoctors, specialty, location, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleSpecialtyChange = (specialty) => {
    setFilters((prev) => {
      const newSpecialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty];

      return { ...prev, specialties: newSpecialties };
    });
  };

  const handleLocationChange = (location) => {
    setFilters((prev) => {
      const newLocations = prev.locations.includes(location)
        ? prev.locations.filter((l) => l !== location)
        : [...prev.locations, location];

      return { ...prev, locations: newLocations };
    });
  };

  const clearFilters = () => {
    setFilters({
      minRating: 0,
      acceptingNewPatients: false,
      telehealthAvailable: false,
      specialties: [],
      locations: filters.locations, // Preserve location options
    });
  };

  return (
    <div className="p-6 pt-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-2 text-center">
        Find Your Doctor
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        {specialty ? `Specializing in ${specialty}` : "All Specialties"}
        {location ? ` in ${location}` : ""}
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 bg-base-100 p-6 rounded-xl shadow-md h-fit">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:underline"
            >
              Clear all
            </button>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Minimum Rating</h3>
            <div className="flex gap-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  className={`btn btn-sm ${
                    filters.minRating === rating ? "btn-primary" : "btn-ghost"
                  }`}
                  onClick={() => handleFilterChange("minRating", rating)}
                >
                  {rating === 0 ? "Any" : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Filters */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.acceptingNewPatients}
                  onChange={(e) =>
                    handleFilterChange("acceptingNewPatients", e.target.checked)
                  }
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span>Accepting New Patients</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.telehealthAvailable}
                  onChange={(e) =>
                    handleFilterChange("telehealthAvailable", e.target.checked)
                  }
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span>Telehealth Available</span>
              </label>
            </div>
          </div>

          {/* Specialty Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Specialties</h3>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {filters.specialties.map((spec) => (
                <label
                  key={spec}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.specialties.includes(spec)}
                    onChange={() => handleSpecialtyChange(spec)}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span>{spec}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="font-semibold mb-3">Locations</h3>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {filters.locations.map((loc) => (
                <label
                  key={loc}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.locations.includes(loc)}
                    onChange={() => handleLocationChange(loc)}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span>{loc}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {loading
                ? "Loading..."
                : filteredDoctors.length === 0
                ? "No doctors found"
                : `Found ${filteredDoctors.length} doctor${
                    filteredDoctors.length !== 1 ? "s" : ""
                  }`}
            </p>
            <div className="text-sm">
              <span className="mr-4">Sort by: </span>
              <select className="select select-bordered select-sm">
                <option>Rating: High to Low</option>
                <option>Rating: Low to High</option>
                <option>Name: A-Z</option>
                <option>Name: Z-A</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">😕</div>
              <h3 className="text-xl font-medium mb-2">
                No doctors match your search
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your filters or search criteria to find what
                you're looking for.
              </p>
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
