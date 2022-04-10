import { Affix, Button, Calendar } from "antd";

import { MobileEventList } from "./components/MobileEventList";
import { PlusOutlined } from "@ant-design/icons";
import { useIsMobile } from "../../hooks/useIsMobile";

export const CalendarPage: React.FC = () => {
  // download data here via use query
  // use render cell override to show guild events
  const [isMobile] = useIsMobile();

  const mockData = {
    events: {
      "17 august": [
        {
          id: "1",
          title: "Raid",
          description: "Raid desc",
          guild: "Foo",
        },
        {
          id: "2",
          title: "Raid2",
          description: "Raid2 desc",
          guild: "Bar",
        },
      ],
    },
  };

  return (
    <>
      {isMobile ? (
        <MobileEventList data={mockData} />
      ) : (
        <Calendar fullscreen mode="month" />
      )}
      <Affix style={{ position: "fixed", bottom: 64, right: 64 }}>
        <Button
          style={{ width: "64px", height: "64px" }}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
        />
      </Affix>
    </>
  );
};
