import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef } from "react";
import { createFolder } from "../APIs/foldersAPI";
import { BgDiv } from "./styles/BgDiv.styled";
import { Button } from "./styles/Button.styled";
import { Form } from "./styles/Form.style";
import { Input } from "./styles/Input.styled";
import { Item } from "./styles/Item.styled";

const InputModal = ({ setIsModal, invalidate, parent }) => {
  const inputRef = useRef("");

  //   invalidate query
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [invalidate] });
    },
  });

  const closeModal = (e) => {
    e.preventDefault();
    setIsModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const folderObject = {
      title: inputRef.current.value,
      parentId: parent,
    };

    mutate(folderObject);
    setIsModal(false);
  };

  return (
    <>
      <BgDiv></BgDiv>
      <Form onSubmit={submitHandler}>
        <Input type="text" placeholder="Folder Title" ref={inputRef} required />
        <Item>
          <Button type="submit" bg={true}>
            Create
          </Button>
          <Button type="Button" onClick={closeModal}>
            Close
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default InputModal;
