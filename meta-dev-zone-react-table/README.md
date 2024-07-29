# React Table

## Overview

`React Table` is a flexible and customizable React table component designed for displaying and managing tabular data with ease. This component supports various functionalities such as searching, pagination, and more.

## Installation

To install the `React Table` component, you can use npm:

```bash
npm install @meta-dev-zone/react-table

```

Or using yarn

```bash
yarn add @meta-dev-zone/react-table

```

## Simple Usage

```tsx
import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";

const members = [
  {
    _id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "+44 1233 123456",
    status: true,
    profileImage:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
  },
  {
    _id: 2,
    name: "Jane Smith",
    email: "janesmith@example.com",
    phoneNumber: "+44 1233 123456",
    status: false,
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    date_of_birth: "15-05-1985",
  },
  // ... more data
];

function App() {
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([]);
  // const [searchText, setSearchText] = useState("");

  const handleEdit = (value) => {
    console.log(value, "---value");
  };

  const handleDelete = (value) => {
    console.log(value, "---value");
  };

  const getData = () => {
    const data = members.map((item) => {
      return {
        ...item,
        is_show_celendar: true,
        link: {
          to: "https://www.google.com/",
          target: "_blank",
          show_text: "Preview",
        },
        thumbnail: {
          src: item.profileImage,
          alt: "Profile Image",
        },
        html: "<div>html text </div>",
      };
    });
    setUsers(data);
  };

  const MENU_OPTIONS = [
    {
      label: "Edit",
      icon: "📄",
      handleClick: handleEdit,
    },
    {
      label: "Delete",
      icon: "📄",
      handleClick: handleDelete,
      // child_options: [
      //   {
      //     label: "Setting",
      //      icon: "📄",
      //     handleClick: handleEdit,
      //   },
      // ],
    },
  ];

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "number",
      label: "#",
      type: "number",
      show_history: (row) => {
        return {
          is_show_history: true,
          icon: "",
          component: (
            <div className="user">
              <h3>User Info</h3>
              <div className="user-info">
                <h4>Name :</h4>
                <p>{row.name}</p>
              </div>
              <div className="user-info">
                <h4>Email :</h4>
                <p>{row.email}</p>
              </div>
              <div className="user-info">
                <h4>Phone Number :</h4>
                <p>{row.phoneNumber}</p>
              </div>
              <div className="user-info">
                <h4>Address :</h4>
                <p>{row.address}</p>
              </div>
              <div className="user-info">
                <h4>Job Title :</h4>
                <p>{row.jobTitle}</p>
              </div>
              <div className="user-info">
                <h4>Company :</h4>
                <p>{row.company}</p>
              </div>
            </div>
          ),
        };
      },
    },
    {
      id: "thumbnail",
      label: "Profile Image",
      type: "thumbnail",
    },
    { id: "name", label: "User Name" },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "Phone Number" },
    {
      id: "any",
      label: "Job Title",
      renderData: (row) => {
        return <div>{row.jobTitle}</div>;
      },
    },
    { id: "status", label: "Status", type: "row_status" },
  ];

  // const searchFunction = () => {};

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <ReactTable
        data={users} // required
        TABLE_HEAD={TABLE_HEAD} // required
        MENU_OPTIONS={MENU_OPTIONS} // required
        checkbox_selection={{
          selected: selected,
          setSelected: setSelected,
          // selected_by: "",
        }}
        // custom_search={{
        //   searchText: searchText,
        //   setSearchText: setSearchText,
        //   handleSubmit: searchFunction,
        // }}
        class_Name=""
        theme_config={{
          background: "#1d1c1d",
          color: "#fff",
          iconColor: "#f6bd4b",
        }}
        is_Sticky_Header={false}
        is_Hide_Footer_Pagination={false}
        is_Hide_Header_Pagination={false}
        is_Hide_Search={false}
      />
    </div>
  );
}

export default App;
```

## Props

| Prop                        | Type               | Description                                                             | Default |
| --------------------------- | ------------------ | ----------------------------------------------------------------------- | ------- |
| `data`                      | `Array`            | An array of objects representing the data to be displayed in the table. |         |
| `TABLE_HEAD`                | `Array`            | An array of objects defining the structure of the table header.         |         |
| `MENU_OPTIONS`              | `Array / Function` | An array of objects for action menu options (e.g., edit, delete).       |         |
| `checkbox_selection`        | `Object`           | Configuration object for managing checkbox selection in the table.      |         |
| `class_Name`                | `String`           | Custom class name for additional styling.                               |         |
| `theme_config`              | `Object`           | Configuration object for customizing the table's theme. .               |         |
| `is_Sticky_Header`          | `Boolean`          | Determines if the table header should be sticky.                        | `false` |
| `is_Hide_Footer_Pagination` | `Boolean`          | Hides the footer pagination if set to true.                             | `false` |
| `is_Hide_Header_Pagination` | `Boolean`          | Hides the header pagination if set to true.                             | `false` |
| `i_sHide_Search`            | `Boolean`          | Hides the search bar if set to true.                                    | `false` |

## Custom Cell Types

| Type           | Description                    |
| -------------- | ------------------------------ |
| `action`       | Renders custom action buttons. |
| `thumbnail`    | Displays an image thumbnail.   |
| `row_status`   | Shows the status of the row.   |
| `row_calendar` | Shows the status of the row.   |
| `link`         | Renders a clickable link.      |
| `radio_button` | Renders a radio button.        |
| `html`         | Renders HTML content.          |
| `checkbox`     | Renders a checkbox.            |

Meta Dev Zone – [@meta-dev-zone](https://www.npmjs.com/~meta-dev-zone)
