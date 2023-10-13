import React, { PropsWithChildren } from "react";

export const SafeAreaView: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>
}