import React from "react";
import { Drawer, Button, Timeline, Card } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { mapColors } from "./constants";
import { items } from "./data";

const checkDiff = (current, past) => {
  let diffLines = [];

  if (!past || !current) {
    return diffLines;
  }

  Object.keys(current).map((key, idx) =>
    current[key] !== past[key] ? diffLines.push(idx) : null
  );

  return diffLines;
};

const renderCodeDiff = datas => {
  let ui = [];

  datas.forEach((it, idx) => {
    const diffLines = checkDiff(it.valueData, (datas[idx + 1] || {}).valueData);
    console.log("diff", diffLines);
    const el = (
      <Timeline.Item color={mapColors[it.type]} key={idx}>
        <Card
          title={`${it.type} - ${it.time} - ${it.userName}`}
          extra={<a href="#">Copy</a>}
        >
          {it.type !== "Delete" && it.type !== "Access" && (
            <SyntaxHighlighter
              language="json"
              style={dark}
              wrapLines={true}
              lineProps={lineNumber => {
                let style = { display: "block" };

                if (diffLines.includes(lineNumber - 2)) {
                  style.backgroundColor = "#dbffdb";
                }

                return {
                  style
                };
              }}
            >
              {JSON.stringify(it.valueData, null, "\t") || ""}
            </SyntaxHighlighter>
          )}
        </Card>
      </Timeline.Item>
    );

    ui.push(el);
  });

  return ui;
};

export const Info = ({ toggle, isOpen }) => (
  <Drawer title="View xxx" width={720} onClose={toggle} visible={isOpen}>
    <Timeline>{renderCodeDiff(items)}</Timeline>
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
