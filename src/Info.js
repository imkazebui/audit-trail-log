import React from "react";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { Drawer, Button, Row, Col, Icon, Modal } from "antd";
import ReactDiffViewer from "react-diff-viewer";

import { items } from "./data";
import TimeLine from "./TimeLine";

export class Info extends React.Component {
  state = {
    viewMode: "raw",
    listCompare: [],
    isShowCompare: false
  };

  setviewMode = mode => () => {
    const { viewMode } = this.state;

    if (mode !== viewMode) {
      this.setState({ viewMode: mode });
    }
  };

  handleChooseItem = itemIdx => () => {
    const { listCompare } = this.state;

    const indexOfItemInArray = listCompare.indexOf(itemIdx);

    if (indexOfItemInArray !== -1) {
      listCompare.splice(indexOfItemInArray, 1);
    } else {
      if (listCompare.length >= 2) {
        return;
      }
      listCompare.push(itemIdx);
    }

    this.setState({ listCompare });
  };

  handleUnCheck = () => this.setState({ listCompare: [] });

  toggleModalCompare = () =>
    this.setState(({ isShowCompare }) => ({ isShowCompare: !isShowCompare }));

  highlightSyntax = str => (
    <pre
      style={{ display: "inline" }}
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(str, Prism.languages.json)
      }}
    />
  );

  render() {
    const { toggle, isOpen } = this.props;
    const { viewMode, listCompare, isShowCompare } = this.state;

    let newValue = "";
    let oldValue = "";

    if (isShowCompare) {
      const isFirst = listCompare[0] < listCompare[1];

      const firstItem = isFirst ? items[listCompare[0]] : items[listCompare[1]];
      const secondItem = isFirst
        ? items[listCompare[1]]
        : items[listCompare[0]];

      newValue = firstItem.valueData || {};
      oldValue = secondItem.valueData || {};

      newValue = JSON.stringify(newValue, null, "\t");
      oldValue = JSON.stringify(oldValue, null, "\t");
    }

    const activeStyle = {
      color: "blue"
    };

    return (
      <Drawer title="View xxx" width={720} onClose={toggle} visible={isOpen}>
        <Row type="flex" justify="end">
          <Col>
            <Icon
              type="table"
              style={viewMode === "table" ? activeStyle : {}}
              onClick={this.setviewMode("table")}
            />
            <Icon type="line" rotate={90} />
            <Icon
              type="code"
              style={viewMode === "raw" ? activeStyle : {}}
              onClick={this.setviewMode("raw")}
            />
          </Col>
        </Row>
        <br />
        <TimeLine
          items={items}
          viewMode={viewMode}
          listCompare={listCompare}
          handleChooseItem={this.handleChooseItem}
        />
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
          <Button
            type="danger"
            disabled={listCompare.length < 1}
            onClick={this.handleUnCheck}
            style={{ marginRight: 8 }}
          >
            UnCheck All
          </Button>
          <Button
            type="primary"
            disabled={listCompare.length < 2}
            onClick={this.toggleModalCompare}
            style={{ marginRight: 8 }}
          >
            Compare
          </Button>
          <Button onClick={toggle} style={{ marginRight: 8 }}>
            Cancel
          </Button>
        </div>
        <Modal
          title="Compare"
          width="50vw"
          visible={isShowCompare}
          onOk={this.toggleModalCompare}
          onCancel={this.toggleModalCompare}
        >
          <ReactDiffViewer
            oldValue={oldValue}
            newValue={newValue}
            splitView={true}
            renderContent={this.highlightSyntax}
          />
        </Modal>
      </Drawer>
    );
  }
}
