import React, { useState, useEffect } from "react";
// import ReactTable from "@meta-dev-zone/react-table";
import ReactTable from "./ReactDateTablePro";

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
            <>
              <h2>History</h2>
              <div className="history-item">
                <div className="history-content">
                  <div className="date">July 24, 2024</div>
                  <div className="event">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque omnis soluta, aperiam incidunt, eveniet illum ipsum
                    odio fugit reprehenderit,
                  </div>
                </div>
              </div>
            </>
          ),
        };
      },
    },
    { id: "thumbnail", label: "Profile Image", type: "thumbnail" },
    { id: "name", label: "User Name" },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "Phone Number" },
    { id: "status", label: "Status", type: "row_status" },
    {
      id: "any",
      label: "Render Data",
      renderData: (row) => {
        return <div>Render Data {row._id}</div>;
      },
    },
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
        className=""
        theme_config={{
          background: "#1d1c1d",
          color: "#fff",
          iconColor: "#f6bd4b",
        }}
        isStickyHeader={false}
        isHideFooterPagination={false}
        isHideHeaderPagination={false}
        isHideSearch={false}
      />
    </div>
  );
}

export default App;
