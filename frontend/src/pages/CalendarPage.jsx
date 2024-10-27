// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../contexts/AuthContext';
// import { Navigate } from 'react-router-dom';
// import CreateEventPopup from '../components/CreateEventPopup';
// import CalendarView from '../components/CalendarView';
// import { Plus, Calendar as CalendarIcon, Layout, Grid, Clock } from 'lucide-react';

// const CalendarPage = () => {
//   const { token } = useContext(AuthContext);
//   const [showPopup, setShowPopup] = useState(false);
//   const [refreshFlag, setRefreshFlag] = useState(false);

//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   const handleEventAdded = () => {
//     setRefreshFlag((prev) => !prev);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
//       {/* Background Decorations */}
//       <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
//         <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Main Content */}
//       <div className="relative min-h-screen pt-8 pb-12 px-4">
//         {/* Header Section */}
//         <div className="max-w-7xl mx-auto mb-6">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-8">
//             <div className="flex items-center space-x-4">
//               <div className="p-3 bg-white/10 backdrop-blur-lg rounded-xl">
//                 <CalendarIcon className="w-8 h-8 text-blue-300" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold text-white">My Calendar</h1>
//                 <p className="text-blue-200">Manage your schedule efficiently</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowPopup(true)}
//               className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl
//                 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               <Plus className="w-5 h-5 mr-2" />
//               Create Event
//             </button>
//           </div>

//           {/* Quick Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//             {[
//               {
//                 icon: <Layout className="w-6 h-6 text-blue-300" />,
//                 title: "Today's Events",
//                 value: "5 Scheduled"
//               },
//               {
//                 icon: <Grid className="w-6 h-6 text-purple-300" />,
//                 title: "This Week",
//                 value: "12 Events"
//               },
//               {
//                 icon: <Clock className="w-6 h-6 text-green-300" />,
//                 title: "Meeting Hours",
//                 value: "8.5 Hours"
//               }
//             ].map((stat, index) => (
//               <div
//                 key={index}
//                 className="flex items-center p-4 bg-white/10 backdrop-blur-lg rounded-xl space-x-4
//                   transform hover:scale-105 transition-all duration-300"
//               >
//                 <div className="p-3 bg-white/10 rounded-lg">
//                   {stat.icon}
//                 </div>
//                 <div>
//                   <p className="text-blue-200">{stat.title}</p>
//                   <p className="text-xl font-semibold text-white">{stat.value}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Calendar Section */}
//         <div className="max-w-7xl mx-auto backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10">
//           <CalendarView refreshFlag={refreshFlag} />
//         </div>
//       </div>

//       {/* Create Event Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
//           <div className="flex items-center justify-center min-h-screen px-4">
//             <div className="w-full max-w-2xl">
//               <CreateEventPopup
//                 onClose={() => setShowPopup(false)}
//                 token={token}
//                 onEventAdded={handleEventAdded}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CalendarPage;







import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import CreateEventPopup from '../components/CreateEventPopup';
import CalendarView from '../components/CalendarView';
import { Plus, Calendar as CalendarIcon, Layout, Grid, Clock } from 'lucide-react';

const CalendarPage = () => {
  const { token } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  if (!token) {
    return <Navigate to="/" />;
  }

  const handleEventAdded = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Background Decorations - Made responsive */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content - Improved padding for smaller screens */}
      <div className="relative min-h-screen pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-10 md:pb-12 px-2 sm:px-3 md:px-4">
        {/* Header Section - Enhanced mobile layout */}
        <div className="max-w-7xl mx-auto mb-4 sm:mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6 sm:mb-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-white/10 backdrop-blur-lg rounded-xl">
                <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">My Calendar</h1>
                <p className="text-sm sm:text-base text-blue-200">Manage your schedule efficiently</p>
              </div>
            </div>
            <button
              onClick={() => setShowPopup(true)}
              className="w-full md:w-auto flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl
                hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Create Event
            </button>
          </div>

          {/* Quick Stats - Improved grid responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {[
              {
                icon: <Layout className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />,
                title: "Today's Events",
                value: "5 Scheduled"
              },
              {
                icon: <Grid className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />,
                title: "This Week",
                value: "12 Events"
              },
              {
                icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" />,
                title: "Meeting Hours",
                value: "8.5 Hours"
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="flex items-center p-3 sm:p-4 bg-white/10 backdrop-blur-lg rounded-xl space-x-3 sm:space-x-4
                  transform hover:scale-105 transition-all duration-300"
              >
                <div className="p-2 sm:p-3 bg-white/10 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm sm:text-base text-blue-200">{stat.title}</p>
                  <p className="text-lg sm:text-xl font-semibold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Section - Added responsive padding */}
        <div className="max-w-7xl mx-auto backdrop-blur-lg rounded-xl sm:rounded-2xl overflow-hidden border border-white/10">
          <CalendarView refreshFlag={refreshFlag} />
        </div>
      </div>

      {/* Create Event Popup - Improved mobile padding */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="flex items-center justify-center min-h-screen p-2 sm:p-3 md:p-4">
            <div className="w-full max-w-2xl">
              <CreateEventPopup
                onClose={() => setShowPopup(false)}
                token={token}
                onEventAdded={handleEventAdded}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;