import React from "react";
import { Drawer, Button, Timeline, Card } from "antd";
import { UnControlled as CodeMirror } from "react-codemirror2";

import { mapColors } from "./constants";
import { item } from "./data";

const checkDiff = (current, past) => {};

export const Info = ({ toggle, isOpen }) => (
  <Drawer title="View xxx" width={720} onClose={toggle} visible={isOpen}>
    <Timeline>
      {item.map((it, idx) => (
        <Timeline.Item color={mapColors[it.type]} key={idx}>
          <Card
            title={`${it.type} - ${it.time} - ${it.userName}`}
            extra={<a href="#">Copy</a>}
          >
            {it.type !== "Delete" && it.type !== "Access" && (
              <CodeMirror
                value={JSON.stringify(it.valueData, null, "\t") || ""}
                options={{
                  mode: {
                    name: "javascript",
                    json: true
                  },
                  theme: "material",
                  lineNumbers: true,
                  readOnly: true,
                  styleActiveLine: true,
                  lineWrapping: true
                }}
              />
            )}
          </Card>
        </Timeline.Item>
      ))}
    </Timeline>
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
