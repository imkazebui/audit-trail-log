import React from "react";
import { Drawer, Button, Timeline, Card, Row, Col, Icon, Table } from "antd";
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

const renderContent = (datas, modeView) => {
  let ui = [];

  datas.forEach((it, idx) => {
    const diffLines = checkDiff(it.valueData, (datas[idx + 1] || {}).valueData);

    let view = "";

    switch (modeView) {
      case "table":
        view = <ItemTableViewMode diffLines={diffLines} data={it.valueData} />;
        break;
      case "raw":
        view = <ItemObjectViewMode diffLines={diffLines} data={it.valueData} />;
        break;
      default:
        break;
    }

    const el = (
      <Timeline.Item color={mapColors[it.type]} key={idx}>
        <Card
          title={`${it.type} - ${it.time} - ${it.userName}`}
          extra={<a href="#">Copy</a>}
        >
          {it.type !== "Delete" && it.type !== "Access" && view}
        </Card>
      </Timeline.Item>
    );

    ui.push(el);
  });

  return ui;
};

const ItemObjectViewMode = ({ diffLines, data }) => (
  <SyntaxHighlighter
    language="json"
    style={dark}
    wrapLines={true}
    lineProps={lineNumber => {
      let className = "";

      if (diffLines.includes(lineNumber - 2)) {
        className = "row-diff";
      }

      return {
        class: className,
        style: {
          display: "block"
        }
      };
    }}
  >
    {JSON.stringify(data, null, "\t") || ""}
  </SyntaxHighlighter>
);

const ItemTableViewMode = ({ diffLines, data }) => (
  <Table
    pagination={false}
    rowClassName={(record, idx) => (diffLines.includes(idx) ? "row-diff" : "")}
    dataSource={Object.keys(data).map(key => ({ key, value: data[key] }))}
    columns={[
      {
        title: "Key",
        dataIndex: "key",
        key: "key"
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value"
      }
    ]}
  />
);

export class Info extends React.Component {
  state = {
    modeView: "raw"
  };

  setModeView = mode => () => {
    const { modeView } = this.state;

    if (mode !== modeView) {
      this.setState({ modeView: mode });
    }
  };

  render() {
    const { toggle, isOpen } = this.props;
    const { modeView } = this.state;
    const activeStyle = {
      color: "blue"
    };

    return (
      <Drawer title="View xxx" width={720} onClose={toggle} visible={isOpen}>
        <Row type="flex" justify="end">
          <Col>
            <Icon
              type="table"
              style={modeView === "table" ? activeStyle : {}}
              onClick={this.setModeView("table")}
            />
            <Icon type="line" rotate={90} />
            <Icon
              type="code"
              style={modeView === "raw" ? activeStyle : {}}
              onClick={this.setModeView("raw")}
            />
          </Col>
        </Row>
        <br />
        <Timeline>{renderContent(items, modeView)}</Timeline>
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
  }
}
