import React from "react";
import { Drawer, Button, Card, Row, Col, Icon, Table } from "antd";

import { items } from "./data";
import TimeLine from "./TimeLine";

export class Info extends React.Component {
  state = {
    viewMode: "raw"
  };

  setviewMode = mode => () => {
    const { viewMode } = this.state;

    if (mode !== viewMode) {
      this.setState({ viewMode: mode });
    }
  };

  render() {
    const { toggle, isOpen } = this.props;
    const { viewMode } = this.state;
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
        <TimeLine items={items} viewMode={viewMode} />
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
