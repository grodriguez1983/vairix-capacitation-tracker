"use client";

import { useCallback, useState } from "react";
import {
  View,
  Event,
  SlotInfo,
  dateFnsLocalizer,
  Calendar,
} from "react-big-calendar";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import Card from "../Card";
import { enUS } from "date-fns/locale";
import { addHours, startOfHour } from "date-fns";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface CalendarProps {
  onNavigate?: (newDate: Date) => void;
  onView?: (view: View) => void;
  onSelectSlot?: (slotInfo: SlotInfo) => void;
  onSelectEvent?: (event: Event) => void;
  onEventResize?: withDragAndDropProps<Event>["onEventResize"];
  onEventDrop?: withDragAndDropProps<Event>["onEventDrop"];
  events: Event[];
  view?: View;
}

export const CustomCalendar = ({
  onNavigate,
  onView,
  onSelectSlot,
  onSelectEvent,
  onEventResize,
  onEventDrop,
  events,
  view = "week",
}: CalendarProps) => {
  const [date, setDate] = useState(new Date());

  const handleNavigate = useCallback(
    (newDate: Date) => {
      setDate(newDate);
      onNavigate && onNavigate(newDate);
    },
    [onNavigate]
  );

  return (
    <Card className="mx-6">
      <DnDCalendar
        defaultView={view}
        view={view}
        date={date}
        onView={onView}
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectSlot={onSelectSlot}
        resizable
        selectable
        onNavigate={handleNavigate}
        onSelectEvent={onSelectEvent}
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
