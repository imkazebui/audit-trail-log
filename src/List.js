import React from "react";
import { Table, Tag, Avatar } from "antd";

import { mapColors } from "./constants";
import { data } from "./data";

const columns = [
  {
    title: "No",
    dataIndex: "no",
    render: (text, record, recordIdx) => recordIdx + 1
  },
  {
    title: "Time",
    dataIndex: "time",
    render: time => Date(time).toString()
  },
  {
    title: "Type",
    dataIndex: "type",
    render: type => (
      <span>
        <Tag color={mapColors[type]}>{type.toUpperCase()}</Tag>
      </span>
    )
  },
  {
    title: "User",
    children: [
      {
        title: "Avatar",
        dataIndex: "userAvatar",
        render: url => <Avatar src={url} />
      },
      {
        title: "Name",
        dataIndex: "userName"
      },
      {
        title: "Type",
        dataIndex: "userType"
      },
      {
        title: "IP",
        dataIndex: "userIP"
      }
    ]
  },
  {
    title: "ID",
    dataIndex: "valueId"
  },
  {
    title: "Entity",
    dataIndex: "valueEntity"
  },
  {
    title: "Description",
    dataIndex: "description"
  }
];

const List = ({ onClick }) => (
  <Table
    bordered
    rowKey={record => record.id}
    columns={columns}
    dataSource={data}
    onRow={(record, rowIdx) => ({
      onClick: onClick()
    })}
    pagination={{
      total: 100,
      pageSize: 20,
      defaultCurrent: 1,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
    }}
  />
);

export default List;
