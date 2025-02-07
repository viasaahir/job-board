import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  HeartIcon as HeartOutlineIcon,
  ChevronRightIcon,
  HomeIcon,
  BuildingOfficeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const JobCard = ({ job, onLike, onDislike, isLiked, controls, className = '' }) => {
  const WorkLocationIcon = job.isRemote ? HomeIcon : job.isHybrid ? HomeIcon : BuildingOfficeIcon;
  const workLocationType = job.isRemote ? "Remote" : job.isHybrid ? "Hybrid" : "On-site";

  const handleHeartClick = (e) => {
    e.preventDefault();
    onLike(job.id);
  };

  const handleXClick = (e) => {
    e.preventDefault();
    onDislike?.(job.id);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 w-full mx-auto ${className}`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="w-12 h-12 rounded-lg flex-shrink-0 bg-gray-100"
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">{job.company}</p>
              </div>

              <button
                onClick={handleHeartClick}
                className="ml-2 p-2 text-gray-400 hover:text-gray-500"
              >
                {isLiked ? (
                  <HeartSolidIcon className="h-6 w-6 text-indigo-600" />
                ) : (
                  <HeartOutlineIcon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-2 gap-2 mb-3 mt-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPinIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                <span className="truncate">{job.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <BriefcaseIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                <span className="truncate">{job.type}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CurrencyDollarIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                <span className="truncate">{job.salary}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <WorkLocationIcon className="h-4 w-4 mr-1.5 text-gray-400" />
                <span className="truncate">{workLocationType}</span>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="mt-3">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Key Highlights:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {job.highlights.slice(0, 2).map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Role Consultants */}
            {job.consultants && job.consultants.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <UserGroupIcon className="h-4 w-4 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-900">Role Consultants</h3>
                </div>
                <div className="space-y-3">
                  {job.consultants.slice(0, 2).map((consultant, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <img 
                          src={consultant.avatar} 
                          alt={consultant.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{consultant.name}</p>
                          <p className="text-xs text-gray-500">{consultant.experience}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => window.open(consultant.bookingUrl, '_blank')}
                        className="px-3 py-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 bg-white rounded-md border border-gray-200 hover:border-primary-200 transition-colors"
                      >
                        Book ${consultant.rate}/hr
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Apply Button */}
        <div className="mt-4 flex justify-end">
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            View Details
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
