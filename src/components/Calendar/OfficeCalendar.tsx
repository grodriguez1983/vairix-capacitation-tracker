"use client";

import { CustomCalendar } from "@/components/Calendar";
import { Office } from "@/types/offices";
import { useCallback, useMemo, useState } from "react";
import { Event, SlotInfo, View } from "react-big-calendar";
import { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";

export const OfficeCalendar = ({ office }: { office: Office }) => {
  const events = useMemo(() => office.events || [], [office.events]);
  const [calendarView, setCalendarView] = useState<View>("week");

  const isOverlapping = useCallback(
    (start: Date, end: Date, name: string) => {
      let overlap = false;
      events.forEach((event) => {
        if (event.name === name) return false;
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

  const onView = useCallback((view: View) => {
    setCalendarView(view);
  }, []);

  const onSelectSlot = useCallback((props: SlotInfo) => {
    // TODO
  }, []);

  const onSelectEvent = useCallback((event: Event) => {
    // TODO
  }, []);

  const onEventResize: withDragAndDropProps<Event>["onEventResize"] = (
    data
  ) => {
    // TODO
  };

  const onEventDrop: withDragAndDropProps<Event>["onEventDrop"] = (data) => {
    // TODO
  };

  return (
    <CustomCalendar
      events={office?.events || []}
      onView={onView}
      onSelectSlot={onSelectSlot}
      onSelectEvent={onSelectEvent}
      onEventResize={onEventResize}
      onEventDrop={onEventDrop}
      view={calendarView}
    />
  );
};
