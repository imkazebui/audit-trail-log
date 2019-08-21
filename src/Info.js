import React from "react";
import { Drawer, Button, Timeline } from "antd";

export const Info = ({ toggle, isOpen }) => (
  <Drawer title="View xxx" width={720} onClose={toggle} visible={isOpen}>
    <Timeline>
      <Timeline.Item color="green">
        Create a services site 2015-09-01
      </Timeline.Item>
      <Timeline.Item color="green">
        Create a services site 2015-09-01
      </Timeline.Item>
      <Timeline.Item color="red">
        <p>Solve initial network problems 1</p>
        <p>Solve initial network problems 2</p>
        <p>Solve initial network problems 3 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item>
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item color="gray">
        <p>Technical testing 1</p>
        <p>Technical testing 2</p>
        <p>Technical testing 3 2015-09-01</p>
      </Timeline.Item>
    </Timeline>
    ,
    <div
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        borderTop: "1px solid #e9e9e9",
        padding: "10px 16px",
        background: "#fff",
        textAlign: "right"
      }}
    >
      <Button onClick={toggle} style={{ marginRight: 8 }}>
        Cancel
      </Button>
    </div>
  </Drawer>
);
