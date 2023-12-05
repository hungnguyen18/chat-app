import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const {
    user: { uid },
  } = useContext(AuthContext);

  const { updateUser } = useFirestore("users", null);

  useEffect(() => {
    const handleUnload = async (e) => {
      e.preventDefault();
      e.returnValue = ""; // Cho phép đóng tab

      await updateUser(uid, {
        isOnline: false,
      });
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  useEffect(async () => {
    // Mã thực thi khi component được mount
    await updateUser(uid, {
      isOnline: true,
    });

    return async () => {
      // Mã thực thi khi component bị unmount
    };
  }, []); // Tham số thứ hai là một mảng rỗng để chỉ thực thi mã khi component được mount lần đầu tiên

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const { documents: rooms } = useFirestore("rooms", roomsCondition);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const { documents: members } = useFirestore("users", usersCondition);

  const clearState = () => {
    setSelectedRoomId("");
    setIsAddRoomVisible(false);
    setIsInviteMemberVisible(false);
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
