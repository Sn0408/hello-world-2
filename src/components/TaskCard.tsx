interface TaskCardProps {
  title: string;
  description: string;
  completed: boolean;
  onToggle: () => void;
  onEdit?: () => void;
}

const TaskCard = ({ title, description, completed, onToggle, onEdit }: TaskCardProps) => {
  return (
    <div className={`p-6 rounded-lg border transition-all duration-200 hover:shadow-md ${
      completed 
        ? 'bg-green-50 border-green-200 shadow-sm' 
        : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <div className="flex items-start space-x-4">
        {/* Improved Checkbox */}
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-6 h-6 rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            completed
              ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
              : 'bg-white border-gray-400 hover:border-gray-500 hover:bg-gray-50'
          }`}
          aria-label={completed ? 'Mark task as incomplete' : 'Mark task as complete'}
        >
          {completed && (
            <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold mb-2 transition-colors duration-200 ${
            completed ? 'text-green-800 line-through' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <p className={`text-sm transition-colors duration-200 ${
            completed ? 'text-green-600' : 'text-gray-600'
          }`}>
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-end space-y-2">
          {/* Status Badge */}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            completed
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {completed ? 'Completed' : 'Pending'}
          </span>
          
          {/* Edit Button */}
          {onEdit && (
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-1 rounded hover:bg-blue-50"
              aria-label="Edit task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
