import React, { useState, createContext } from "react";

export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   // const [scheduleInfo, setScheduleInfo] = useState({ type: '', sid: '' });
//   const [user, setUser] = useState({ username: "", id: "" });

//   const userSetter = (username, id) => {
//     const loggedInUser = { username: { username }, id: { id } };
//     setUser(loggedInUser);
//   };

//   // const setSid = (sid) => {
//   //     const newSchedule = { ...scheduleInfo, sid };
//   //     setScheduleInfo(newSchedule);
//   // };

//   // const scheduleContextSetters = {
//   //     setType,
//   //     setSid,
//   //     setScheduleInfo,
//   // };

//   return (
//     <ScheduleContext.Provider value={{ ...userSetter }}>
//       {children}
//     </ScheduleContext.Provider>
//   );
// };
