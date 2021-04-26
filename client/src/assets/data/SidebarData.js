import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";
// import * as FiIcons from 'react-icons/fi'

export const SidebarData = [
  {
    title: "Overview",
    path: "/user/dashboard",
    icon: <AiIcons.AiFillHome />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
    // subNav: [
    //   {
    //     title: "Users",
    //     path: "/overview/users",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    //   {
    //     title: "Revenue",
    //     path: "/overview/revenue",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    // ],
  },
  {
    title: "Reports",
    path: "/user/reports",
    icon: <IoIcons.IoIosPaper />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
    // subNav: [
    //   {
    //     title: "Reports 1",
    //     path: "/overview/reports1",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    //   {
    //     title: "Reports 2",
    //     path: "/overview/reports2",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    //   {
    //     title: "Reports 3",
    //     path: "/overview/reports3",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    // ],
  },
  {
    title: "Mindfullnes",
    path: "/user/meditation",
    icon: <GiIcons.GiMeditation />,
  },
  {
    title: "Chatroom",
    path: "/user/chatroom",
    icon: <IoIcons.IoMdPeople />,
  },
  {
    title: "Messages",
    path: "/user/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
    // iconClosed: <RiIcons.RiArrowDownSFill />,
    // iconOpened: <RiIcons.RiArrowUpSFill />,
    // subNav: [
    //   {
    //     title: "Message 1",
    //     path: "/overview/message1",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    //   {
    //     title: "Message 2",
    //     path: "/overview/message2",
    //     icon: <IoIcons.IoIosPaper />,
    //   },
    // ],
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];
