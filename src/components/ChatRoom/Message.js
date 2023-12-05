import React from "react";
import { Avatar, Card, Typography, Badge } from "antd";
import { formatRelative } from "date-fns/esm";

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
  isOnline,
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
        <Badge dot={isOnline}>
          <Avatar
            size={"default"}
            src={photoURL}
            style={{
              marginLeft: "10px",
            }}
          >
            {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
        </Badge>
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
        <Badge dot={isOnline}>
          <Avatar
            size={"default"}
            src={photoURL}
            style={{
              marginRight: "10px",
            }}
          >
            {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
        </Badge>
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
