export default function CompactDoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 h-full">
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-center mb-4">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
          />
        </div>

        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
          <p className="text-md text-primary font-medium">{doctor.specialty}</p>
        </div>

        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold text-gray-800">{doctor.rating}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{doctor.location}</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {doctor.acceptingNewPatients && (
              <span className="badge badge-success gap-1 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Accepting Patients
              </span>
            )}

            {doctor.offersTelehealth && (
              <span className="badge badge-info gap-1 text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                Telehealth
              </span>
            )}
          </div>

          <button className="btn btn-primary w-full rounded-full">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
