import React from "react";
import { Timeline, Card, Table, Icon } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { FaRegCheckCircle, FaRegCircle } from "react-icons/fa";

import { mapColors } from "./constants";

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

export default class TimeLine extends React.Component {
  state = {
    listCompare: []
  };

  handleChooseItem = itemIdx => () => {
    const { listCompare } = this.state;

    const indexOfItemInArray = listCompare.indexOf(itemIdx);

    if (indexOfItemInArray !== -1) {
      listCompare.splice(indexOfItemInArray, 1);
    } else {
      listCompare.push(itemIdx);
    }

    this.setState({ listCompare });
  };

  render() {
    const { viewMode, items } = this.props;
    const { listCompare } = this.state;

    let ui = [];

    items.forEach((it, idx) => {
      const diffLines = checkDiff(
        it.valueData,
        (items[idx + 1] || {}).valueData
      );

      let view = "";

      switch (viewMode) {
        case "table":
          view = (
            <ItemTableViewMode diffLines={diffLines} data={it.valueData} />
          );
          break;
        case "raw":
          view = (
            <ItemObjectViewMode diffLines={diffLines} data={it.valueData} />
          );
          break;
        default:
          break;
      }

      const el = (
        <Timeline.Item
          color={mapColors[it.type]}
          key={idx}
          dot={
            <span onClick={this.handleChooseItem(idx)}>
              {listCompare.includes(idx) ? (
                <FaRegCheckCircle />
              ) : (
                <FaRegCircle />
              )}
            </span>
          }
        >
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

    return <Timeline>{ui}</Timeline>;
  }
}
