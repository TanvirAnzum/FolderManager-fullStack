import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteFolder, getFolders } from "../APIs/foldersAPI";
import addIcon from "../assets/icons/add.png";
import expandIcon from "../assets/icons/expand.png";
import deleteIcon from "../assets/icons/remove.png";
import InputModal from "./InputModal";
import { BgDiv } from "./styles/BgDiv.styled";
import { Folder } from "./styles/Folder.styled";
import { FolderChildren } from "./styles/FolderChildren.styled";
import { Img } from "./styles/Img.styled";
import { Item } from "./styles/Item.styled";
import { Loader } from "./styles/Loader.styled";

const FolderItem = ({ folder }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [isModal, setIsModal] = useState(false);

  // for invalidation
  const queryClient = useQueryClient();

  const { title, _id, parentId } = folder || {};

  // fetch child folders
  const { data, isLoading } = useQuery([`folders_${_id}`, _id], () =>
    getFolders(_id)
  );

  // delete handlers
  const { mutate: remove, isLoading: isDeleting } = useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`folders_${parentId}`] });
    },
  });

  const deleteHandler = (_id) => {
    remove(_id);
  };

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
          <p>{title}</p>
        </Item>

        <Item>
          <Img src={addIcon} alt="" onClick={openModal} />
          <Img src={deleteIcon} alt="" onClick={() => deleteHandler(_id)} />
        </Item>
      </Folder>

      {isExpand && (
        <FolderChildren>
          {data?.map((child) => (
            <FolderItem folder={child} key={child._id} />
          ))}
        </FolderChildren>
      )}
      {isModal && (
        <InputModal
          setIsModal={setIsModal}
          invalidate={`folders_${_id}`}
          parent={_id}
        />
      )}
      {(isLoading || isDeleting) && (
        <>
          <BgDiv></BgDiv>
          <Loader></Loader>
        </>
      )}
    </>
  );
};

export default FolderItem;
