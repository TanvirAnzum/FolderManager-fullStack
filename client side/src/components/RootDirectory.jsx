import React from "react";
import RootFolderItem from "./RootFolderItem";
import { FolderContainer } from "./styles/FolderContainer.style";

const RootDirectory = () => {
  return (
    <FolderContainer>
      <RootFolderItem />
    </FolderContainer>
  );
};

export default RootDirectory;
