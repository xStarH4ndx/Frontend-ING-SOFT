import React, { useEffect } from "react";

const GoogleCalendarButton: React.FC = () => {
  useEffect(() => {
    const scriptId = "google-calendar-script";
    const linkId = "google-calendar-link";

    // Function to load the calendar button
    const loadCalendarButton = () => {
      const target = document.getElementById('calendar-button');
      if (window.calendar && window.calendar.schedulingButton && target) {
        window.calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0x2QuCQNyUtfM2C5WOTBtPOpZadoBIRd431Jmib-pQF1kdWlh8Z1yYOyNziE9lJKwdv5nscEEq?gv=true',
          color: '#039BE5',
          label: 'Book an appointment',
          target,
        });
      }
    };

    // Check if the script is already added
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);

      // Load the calendar button after the script is loaded
      script.onload = () => {
        loadCalendarButton();
      };
    } else {
      loadCalendarButton();
    }

    // Check if the link is already added
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
      link.rel = "stylesheet";
      link.id = linkId;
      document.head.appendChild(link);
    }

    return () => {
      window.removeEventListener('load', loadCalendarButton);
    };
  }, []);

  return <div id="calendar-button"></div>;
};

export default GoogleCalendarButton;
