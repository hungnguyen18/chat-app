import React from "react";
import styled from "styled-components";
import { Avatar, Card, Typography } from "antd";
import { formatRelative } from "date-fns/esm";

const WrapperStyled = styled.div`
  margin-bottom: 10px;

  .author {
    margin-left: 5px;
    font-weight: bold;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }

  .content {
    margin-left: 30px;
  }
`;

function formatDate(seconds) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}

export default function Message({
  text,
  displayName,
  createdAt,
  photoURL,
  isOwner,
}) {
  return isOwner ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <Card
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            padding: "10px",
            backgroundColor: "#5FBDFF",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Typography.Text
              className="date"
              style={{
                marginRight: "5px",
                fontSize: "11px",
                color: "black",
              }}
            >
              {formatDate(createdAt?.seconds)}
            </Typography.Text>
            <Typography.Text
              className="author"
              style={{
                fontWeight: "bold",
              }}
            >
              {displayName}
            </Typography.Text>
          </div>

          <div
            style={{
              textAlign: "right",
            }}
          >
            <Typography.Text className="content">{text}</Typography.Text>
          </div>
        </Card>
        <Avatar
          size="small"
          src={photoURL}
          style={{
            marginLeft: "10px",
          }}
        >
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <Avatar
          size="small"
          src={photoURL}
          style={{
            marginRight: "10px",
          }}
        >
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Card
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              textAlign: "left",
            }}
          >
            <Typography.Text
              className="author"
              style={{
                fontWeight: "bold",
              }}
            >
              {displayName}
            </Typography.Text>
            <Typography.Text
              className="date"
              style={{
                marginLeft: "5px",
                fontSize: "11px",
                color: "black",
              }}
            >
              {formatDate(createdAt?.seconds)}
            </Typography.Text>
          </div>

          <div
            style={{
              textAlign: "left",
            }}
          >
            <Typography.Text className="content">{text}</Typography.Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
