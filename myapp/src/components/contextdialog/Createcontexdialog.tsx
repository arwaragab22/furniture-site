import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. عرفي نوع البيانات اللي هيتم مشاركتها في الـ context
type DialogContextType = {
  opendialog: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
};

// 2. أنشيء context بنوع مبدئي ممكن يكون undefined
const UserContext = createContext<DialogContextType | undefined>(undefined);

// 3. عرفي نوع props للمكون اللي بيغلف الأطفال
type CreateContextDialogProps = {
  children: ReactNode;
};

function Createcontexdialog({ children }: CreateContextDialogProps) {
  const [opendialog, setOpendialog] = useState(false); // عدلت اسم المتغير من `setOpendialig` للصح

  const handleClickOpen = () => {
    setOpendialog(true);
  };

  const handleClose = () => {
    setOpendialog(false);
  };

  return (
    <UserContext.Provider value={{ opendialog, handleClickOpen, handleClose }}>
      {children}
    </UserContext.Provider>
  );
}

// 4. Hook مخصص لاستخدام الـ context، مع حماية ضد الاستخدام خارج الـ Provider
export const Usedialogcontext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "Usedialogcontext must be used within a Createcontexdialog"
    );
  }
  return context;
};

export default Createcontexdialog;
