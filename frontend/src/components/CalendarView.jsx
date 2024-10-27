// // frontend/src/components/CalendarView.jsx

// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import { AuthContext } from '../contexts/AuthContext';
// import axios from 'axios';
// import gsap from 'gsap';
// import moment from 'moment-timezone';
// import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Search } from 'lucide-react';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Tooltip } from 'react-tooltip'; // Updated import

// const localizer = momentLocalizer(moment);

// const CalendarView = () => {
//   const { token } = useContext(AuthContext);
//   const [events, setEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const calendarRef = useRef(null);
//   const headerRef = useRef(null);
//   const tl = useRef(null);
//   const datePickerRef = useRef(null);

//   // Initialize GSAP timeline
//   useEffect(() => {
//     tl.current = gsap.timeline({ defaults: { ease: "power3.out" } });
//   }, []);

//   // Date Picker Component
//   const DatePickerComponent = () => {
//     const handleDateChange = (date) => {
//       animateDateTransition(() => {
//         setCurrentDate(date);
//       });
//       setShowDatePicker(false);
//     };

//     if (!showDatePicker) return null;

//     return (
//       <div
//         className="absolute top-16 right-4 bg-white rounded-lg shadow-xl p-4 z-50 border"
//         ref={datePickerRef}
//       >
//         <DatePicker
//           selected={currentDate}
//           onChange={handleDateChange}
//           inline
//           showMonthDropdown
//           showYearDropdown
//           dropdownMode="select"
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <div className="flex justify-end space-x-2 mt-2">
//           <button
//             type="button"
//             onClick={() => setShowDatePicker(false)}
//             className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Custom toolbar component with enhanced animations
//   const CustomToolbar = (toolbar) => {
//     const goToBack = () => {
//       animateDateTransition(() => toolbar.onNavigate('PREV'), 'right');
//     };

//     const goToNext = () => {
//       animateDateTransition(() => toolbar.onNavigate('NEXT'), 'left');
//     };

//     const goToToday = () => {
//       animateDateTransition(() => toolbar.onNavigate('TODAY'));
//     };

//     return (
//       <div className="flex items-center justify-between p-4 bg-white rounded-t-lg border-b" ref={headerRef}>
//         <div className="flex items-center space-x-4">
//           <button
//             className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
//             onClick={goToBack}
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-600" />
//           </button>
//           <button
//             className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
//             onClick={goToNext}
//           >
//             <ChevronRight className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//         <div className="flex items-center space-x-4">
//           <h2 className="text-xl font-semibold text-gray-800">
//             {moment(toolbar.date).format('MMMM YYYY')}
//           </h2>
//           <button
//             className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
//             onClick={() => setShowDatePicker(!showDatePicker)}
//           >
//             <Search className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//         <button
//           className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 hover:shadow-md"
//           onClick={goToToday}
//         >
//           <CalendarIcon className="w-4 h-4 mr-2" />
//           Today
//         </button>
//       </div>
//     );
//   };

//   // Enhanced animation functions
//   const animateDateTransition = (callback, direction = null) => {
//     const element = calendarRef.current;

//     tl.current.clear();
//     tl.current
//       .to(element, {
//         opacity: 0,
//         x: direction ? (direction === 'left' ? 20 : -20) : 0,
//         y: direction ? 0 : 20,
//         scale: 0.98,
//         duration: 0.3,
//       })
//       .add(() => {
//         callback();
//       })
//       .to(element, {
//         opacity: 1,
//         x: 0,
//         y: 0,
//         scale: 1,
//         duration: 0.4,
//         clearProps: "all",
//       });
//   };

//   // Fetch events
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         // Use the correct URL with protocol and hostname
//         const response = await axios.get('http://localhost:5000/api/events/list', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const transformedEvents = response.data.events.map((event) => {
//           const isAllDay = event.start.date ? true : false;
//           const start = isAllDay
//             ? moment(event.start.date).toDate()
//             : moment(event.start.dateTime).toDate();
//           const end = isAllDay
//             ? moment(event.end.date).toDate()
//             : moment(event.end.dateTime).toDate();

//           return {
//             id: event.id,
//             title: event.summary || '(No Title)',
//             start: start,
//             end: end,
//             allDay: isAllDay,
//             description: event.description || '', // Include description
//             color: getRandomEventColor(),
//           };
//         });

//         gsap.to(calendarRef.current, {
//           opacity: 1,
//           duration: 0.5,
//           onComplete: () => {
//             setEvents(transformedEvents);
//             setIsLoading(false);
//           },
//         });
//       } catch (err) {
//         console.error('Error fetching events:', err);
//         setIsLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [token]);

//   // Enhanced random color generation
//   const getRandomEventColor = () => {
//     const colors = [
//       'bg-blue-100 text-blue-800 border-blue-200',
//       'bg-emerald-100 text-emerald-800 border-emerald-200',
//       'bg-violet-100 text-violet-800 border-violet-200',
//       'bg-rose-100 text-rose-800 border-rose-200',
//       'bg-amber-100 text-amber-800 border-amber-200',
//       'bg-cyan-100 text-cyan-800 border-cyan-200',
//     ];
//     return colors[Math.floor(Math.random() * colors.length)];
//   };

//   // Enhanced event component with tooltip
//   const EventComponent = ({ event }) => (
//     <>
//       <div
//         id={`event-${event.id}`} // Add id for anchor
//         className={`
//           p-1.5 rounded-lg ${event.color} border 
//           transform transition-all duration-200 
//           hover:scale-[1.02] hover:shadow-sm
//           cursor-pointer
//         `}
//       >
//         <div className="truncate text-sm font-medium">{event.title}</div>
//       </div>
//       <Tooltip
//         anchorId={`event-${event.id}`}
//         place="top"
//         effect="solid"
//         clickable
//         className="max-w-sm"
//       >
//         <div className="text-left">
//           <p className="font-semibold">{event.title}</p>
//           <p>
//             {moment(event.start).format('MMMM Do YYYY, h:mm A')} -{' '}
//             {moment(event.end).format('h:mm A')}
//           </p>
//           <p>
//             Duration:{' '}
//             {moment
//               .duration(moment(event.end).diff(event.start))
//               .asHours()
//               .toFixed(2)}{' '}
//             hours
//           </p>
//           {event.description && (
//             <p className="mt-2">{event.description}</p>
//           )}
//         </div>
//       </Tooltip>
//     </>
//   );

//   return (
//     <div className="mt-6 max-w-7xl mx-auto px-4 relative">
//       <div
//         className={`bg-white rounded-lg shadow-xl overflow-hidden ${
//           isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'
//         }`}
//         ref={calendarRef}
//       >
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 800 }}
//           components={{
//             toolbar: CustomToolbar,
//             event: EventComponent,
//           }}
//           className="font-sans"
//           views={['month', 'week', 'day']}
//           defaultView="month"
//           date={currentDate}
//           onNavigate={(date) => setCurrentDate(date)}
//           tooltipAccessor={null} // Disable default tooltip
//           popup
//           selectable
//         />
//       </div>
//       <DatePickerComponent />
//     </div>
//   );
// };

// export default CalendarView;







import React, { useState, useEffect, useContext, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import gsap from 'gsap';
import moment from 'moment-timezone';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  Clock,
  Calendar as CalendarDate,
  Info,
  X,
  MenuIcon
} from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Tooltip } from 'react-tooltip';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentView, setCurrentView] = useState('month');
  const calendarRef = useRef(null);
  const headerRef = useRef(null);
  const tl = useRef(null);
  const datePickerRef = useRef(null);

  useEffect(() => {
    tl.current = gsap.timeline({ defaults: { ease: "power3.out" } });
  }, []);

  const ViewButton = ({ view, currentView, onClick, icon: Icon, label }) => (
    <button
      onClick={() => onClick(view)}
      className={`
        flex items-center px-3 py-2 rounded-lg transition-all duration-200
        ${currentView === view 
          ? 'bg-blue-100 text-blue-700 font-medium' 
          : 'text-gray-600 hover:bg-gray-100'}
      `}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );

  const DatePickerComponent = () => {
    const handleDateChange = (date) => {
      animateDateTransition(() => {
        setCurrentDate(date);
      });
      setShowDatePicker(false);
    };

    if (!showDatePicker) return null;

    return (
      <div
        className="absolute top-20 right-4 bg-white rounded-xl shadow-2xl p-6 z-50 border border-gray-200"
        ref={datePickerRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Select Date</h3>
          <button
            onClick={() => setShowDatePicker(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <DatePicker
          selected={currentDate}
          onChange={handleDateChange}
          inline
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className="w-full"
        />
      </div>
    );
  };

  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      animateDateTransition(() => toolbar.onNavigate('PREV'), 'right');
    };

    const goToNext = () => {
      animateDateTransition(() => toolbar.onNavigate('NEXT'), 'left');
    };

    const goToToday = () => {
      animateDateTransition(() => toolbar.onNavigate('TODAY'));
    };

    return (
      <div className="flex flex-col space-y-4 p-6 bg-white rounded-t-xl border-b" ref={headerRef}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              onClick={goToBack}
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              onClick={goToNext}
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 ml-4">
              {moment(toolbar.date).format('MMMM YYYY')}
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <Search className="w-4 h-4 mr-2" />
              Find Date
            </button>
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
              onClick={goToToday}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Today
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ViewButton
            view="month"
            currentView={currentView}
            onClick={(view) => setCurrentView(view)}
            icon={CalendarDate}
            label="Month"
          />
          <ViewButton
            view="week"
            currentView={currentView}
            onClick={(view) => setCurrentView(view)}
            icon={MenuIcon}
            label="Week"
          />
          <ViewButton
            view="day"
            currentView={currentView}
            onClick={(view) => setCurrentView(view)}
            icon={Clock}
            label="Day"
          />
        </div>
      </div>
    );
  };

  const animateDateTransition = (callback, direction = null) => {
    const element = calendarRef.current;

    tl.current.clear();
    tl.current
      .to(element, {
        opacity: 0,
        x: direction ? (direction === 'left' ? 20 : -20) : 0,
        y: direction ? 0 : 20,
        scale: 0.98,
        duration: 0.3,
      })
      .add(() => {
        callback();
      })
      .to(element, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.4,
        clearProps: "all",
      });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const transformedEvents = response.data.events.map((event) => {
          const isAllDay = event.start.date ? true : false;
          const start = isAllDay
            ? moment(event.start.date).toDate()
            : moment(event.start.dateTime).toDate();
          const end = isAllDay
            ? moment(event.end.date).toDate()
            : moment(event.end.dateTime).toDate();

          return {
            id: event.id,
            title: event.summary || '(No Title)',
            start: start,
            end: end,
            allDay: isAllDay,
            description: event.description || '',
            color: getRandomEventColor(),
          };
        });

        gsap.to(calendarRef.current, {
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            setEvents(transformedEvents);
            setIsLoading(false);
          },
        });
      } catch (err) {
        console.error('Error fetching events:', err);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [token]);

  const getRandomEventColor = () => {
    const colors = [
      'bg-blue-50 text-blue-700 border-blue-100',
      'bg-emerald-50 text-emerald-700 border-emerald-100',
      'bg-violet-50 text-violet-700 border-violet-100',
      'bg-rose-50 text-rose-700 border-rose-100',
      'bg-amber-50 text-amber-700 border-amber-100',
      'bg-cyan-50 text-cyan-700 border-cyan-100'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const EventComponent = ({ event }) => (
    <>
      <div
        id={`event-${event.id}`}
        className={`
          p-2 rounded-lg ${event.color} border shadow-sm
          transform transition-all duration-200 
          hover:scale-[1.02] hover:shadow-md
          cursor-pointer
        `}
      >
        <div className="truncate text-sm font-medium">{event.title}</div>
      </div>
      <Tooltip
        anchorId={`event-${event.id}`}
        place="top"
        effect="solid"
        clickable
        className="shadow-xl"
      >
        <div className="p-3 max-w-sm">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg">{event.title}</h3>
            <Info className="w-4 h-4 text-gray-400 ml-2" />
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              {moment(event.start).format('MMMM Do YYYY, h:mm A')}
            </p>
            <p className="text-gray-600">
              Duration: {moment.duration(moment(event.end).diff(event.start)).asHours().toFixed(2)} hours
            </p>
            {event.description && (
              <p className="mt-3 pt-3 border-t text-gray-700">{event.description}</p>
            )}
          </div>
        </div>
      </Tooltip>
    </>
  );

  return (
    <div className="mt-6 max-w-7xl mx-auto px-4 relative">
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden ${
          isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'
        }`}
        ref={calendarRef}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800 }}
          components={{
            toolbar: CustomToolbar,
            event: EventComponent,
          }}
          className="font-sans"
          views={['month', 'week', 'day']}
          view={currentView}
          onView={setCurrentView}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          tooltipAccessor={null}
          popup
          selectable
        />
      </div>
      <DatePickerComponent />
    </div>
  );
};

export default CalendarView;