import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getFolders } from "../APIs/foldersAPI";
import addIcon from "../assets/icons/add.png";
import expandIcon from "../assets/icons/expand.png";
import FolderItem from "./FolderItem";
import InputModal from "./InputModal";
import { Folder } from "./styles/Folder.styled";
import { FolderChildren } from "./styles/FolderChildren.styled";
import { Img } from "./styles/Img.styled";
import { Item } from "./styles/Item.styled";

const RootFolderItem = () => {
  const [isExpand, setIsExpand] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const parentId = process.env.REACT_APP_ROOT_ID;

  // all root folders are fetching from server
  const { data } = useQuery([`folders_${parentId}`, parentId], () =>
    getFolders(parentId)
  );

  const openModal = () => setIsModal(true);

  const expandHandler = () => setIsExpand(!isExpand);

  return (
    <>
      <Folder>
        <Item>
          <Img
            isExpand={isExpand}
            src={expandIcon}
            alt=""
            onClick={expandHandler}
          />
          <p>Root</p>
        </Item>

        <Item>
          <Img src={addIcon} alt="" onClick={openModal} />
        </Item>
      </Folder>
      {isExpand && (
        <FolderChildren>
          {data?.map((folder) => (
            <FolderItem folder={folder} key={folder._id} />
          ))}
        </FolderChildren>
      )}
      {isModal && (
        <InputModal
          parent={parentId}
          setIsModal={setIsModal}
          invalidate={`folders_${parentId}`}
        />
      )}
    </>
  );
};

export default RootFolderItem;
