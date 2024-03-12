"use client";
import { FC, useCallback, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Event,
  SlotInfo,
  View,
} from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { addHours } from "date-fns/addHours";
import { startOfHour } from "date-fns/startOfHour";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Card from "@/components/Card";

const App: FC = () => {
  const [date, setDate] = useState(new Date());

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), []);

  const [events, setEvents] = useState<Event[]>([]);

  const isOverlapping = useCallback(
    (start: Date, end: Date, name: string) => {
      let overlap = false;
      events.forEach((event) => {
        if (event.title === name) return false;
        if (
          (event.start && event.start > start && event.start < end) ||
          (event.end && event.end > start && event.end < end)
        ) {
          overlap = true;
        }
      });
      return overlap;
    },
    [events]
  );

  const [calendarView, setCalendarView] = useState<View>("week");
  const onView = useCallback((view: View) => {
    setCalendarView(view);
  }, []);

  const handleSelectSlot = useCallback(
    ({ start, end, title }: SlotInfo & { title?: string }) => {
      const overlap = isOverlapping(start, end, title || "");
      if (overlap) {
        alert("esta ocupado!!");
        return;
      }

      const newTitle = window.prompt("New Event name");
      if (newTitle) {
        setEvents((prev) => [...prev, { start, end, title: newTitle }]);
      }
    },
    [isOverlapping]
  );

  const handleSelectEvent = useCallback(
    (event: Event) => {
      if (window.confirm(`Do you want to remove the event "${event.title}"`)) {
        const newEvents = events.filter((e) => e.title !== event.title);
        setEvents(newEvents);
      }
    },
    [events]
  );

  const onEventResize: withDragAndDropProps<Event>["onEventResize"] = (
    data
  ) => {
    const startDate = data.start as Date;
    const endDate = data.end as Date;
    const title = data.event.title?.toString() || "";

    // we must not allow even overlap
    const overlap = isOverlapping(startDate, endDate, title);
    if (overlap) {
      alert("esta ocupado!!");
      return;
    }

    const event = events.find((event) => event.title === data.event.title);
    if (event) {
      event.start = startDate;
      event.end = endDate;
      setEvents([...events]);
    }
  };

  const onEventDrop: withDragAndDropProps<Event>["onEventDrop"] = (data) => {
    const startDate = data.start as Date;
    const endDate = data.end as Date;
    const title = data.event.title?.toString() || "";

    // we must not allow even overlap
    const overlap = isOverlapping(startDate, endDate, title);
    if (overlap) {
      alert("esta ocupado!!");
      return;
    }

    const event = events.find((event) => event.title === data.event.title);
    if (event) {
      event.start = startDate;
      event.end = endDate;
      setEvents([...events]);
    }
  };

  return (
    <Card className="mx-6">
      <DnDCalendar
        defaultView={calendarView}
        view={calendarView}
        date={date}
        onView={onView}
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectSlot={handleSelectSlot}
        resizable
        selectable
        onNavigate={onNavigate}
        onSelectEvent={handleSelectEvent}
        style={{ height: "100vh", color: "rgb(37 99 235)" }}
      />
    </Card>
  );
};

const locales = {
  "en-US": enUS,
};
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const DnDCalendar = withDragAndDrop(Calendar);

export default App;
