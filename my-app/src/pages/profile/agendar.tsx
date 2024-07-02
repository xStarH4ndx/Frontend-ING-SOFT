import React, { useEffect } from "react";

const GoogleCalendarButton: React.FC = () => {
  useEffect(() => {
    const scriptId = "google-calendar-script";
    const linkId = "google-calendar-link";
    const buttonScriptId = "google-calendar-button-script";

    // Check if the script is already added
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }

    // Check if the link is already added
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
      link.rel = "stylesheet";
      link.id = linkId;
      document.head.appendChild(link);
    }

    // Function to load the calendar button
    const loadCalendarButton = () => {
      const target = document.getElementById('calendar-button');
      if (window.calendar && window.calendar.schedulingButton && target) {
        window.calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3FJ0hRmUzpEOUYCjrsPFD86GafYbry4FaBz1_QgAOreFQwwWITaxgqB8gRIGt0Pf18BtW9j3qR?gv=true',
          color: '#039BE5',
          label: 'Programar una cita',
          target,
        });
      }
    };

    // Add the calendar button script only once
    if (!document.getElementById(buttonScriptId)) {
      const calendarButtonScript = document.createElement("script");
      calendarButtonScript.id = buttonScriptId;
      calendarButtonScript.innerHTML = `
        (function() {
          var target = document.getElementById('calendar-button');
          window.addEventListener('load', function() {
            calendar.schedulingButton.load({
              url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3FJ0hRmUzpEOUYCjrsPFD86GafYbry4FaBz1_QgAOreFQwwWITaxgqB8gRIGt0Pf18BtW9j3qR?gv=true',
              color: '#039BE5',
              label: 'Programar una cita',
              target,
            });
          });
        })();
      `;
      document.body.appendChild(calendarButtonScript);
    }

    // Attempt to load the calendar button after the script is added
    if (window.calendar && window.calendar.schedulingButton) {
      loadCalendarButton();
    } else {
      window.addEventListener('load', loadCalendarButton);
    }

    return () => {
      window.removeEventListener('load', loadCalendarButton);
    };
  }, []);

  return <div id="calendar-button"></div>;
};

export default GoogleCalendarButton;
