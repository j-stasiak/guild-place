import { Collapse } from "antd";

type CalendarItem = {
  id: string;
  title: string;
  description: string;
  guild: string;
};

type CalendarData = {
  events: { [k: string]: CalendarItem[] };
};

interface MobileEventListProps {
  data: CalendarData;
}

export const MobileEventList: React.FC<MobileEventListProps> = ({
  data: { events },
}) => (
  <Collapse>
    {Object.keys(events).map((eventDate) => (
      <Collapse.Panel key={eventDate} header={eventDate}>
        <Collapse>
          {events[eventDate].map((event) => (
            <Collapse.Panel
              key={event.id}
              header={`[${event.guild}] ${event.title}`}
            >
              {event.description}
            </Collapse.Panel>
          ))}
        </Collapse>
      </Collapse.Panel>
    ))}
  </Collapse>
);
