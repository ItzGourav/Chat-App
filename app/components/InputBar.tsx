"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineSend } from "react-icons/ai";
import { VscSmiley } from "react-icons/Vsc";
import { MdOutlineAddCircle } from "react-icons/md";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useCtx } from "../context/ChatContext";

interface props {
  onsend: () => void;
  onimage: (s: any) => void;
  keypresshandler: (e: any) => void;
  text: string;
  settext: React.Dispatch<React.SetStateAction<string>>;
  inputChange: (e: any) => void;
}

const InputBar = ({
  onsend,
  onimage,
  keypresshandler,
  text,
  settext,
  inputChange,
}: props) => {
  const [emoji, setEmoji] = useState(false);

  const hiddenFileInput = React.useRef<any>(null);
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <InputBarDiv>
      <div className="file_select">
        <button
          onClick={() => {
            handleClick();
          }}
        >
          <MdOutlineAddCircle />
        </button>
        <input
          multiple
          type="file"
          ref={hiddenFileInput}
          onChange={(e: any) => onimage(e.target.files[0])}
          style={{ display: "none" }}
        />
      </div>
      <div className="input_field flex px-7 ">
        <input
          type="text"
          placeholder="Type your message"
          value={text}
          onChange={inputChange}
          onKeyDown={keypresshandler}
        />
        <PickerDiv>
          {emoji && (
            <Picker
              data={data}
              onEmojiSelect={(emoji: any) => settext((e) => e + emoji.native)}
            />
          )}
        </PickerDiv>

        <button
          onClick={() => {
            setEmoji(!emoji);
          }}
        >
          <VscSmiley />
        </button>
      </div>
      <div className="send ">
        <button
          onClick={() => {
            onsend(), setEmoji(false);
          }}
        >
          <AiOutlineSend />
        </button>
      </div>
    </InputBarDiv>
  );
};

export default InputBar;

const InputBarDiv = styled.div`
  position: relative;
  background-color: #2e3033;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  height: 60px;

  .input_field {
    background-color: transparent;
    flex: 1;
    box-shadow: #000000 0px 1px 3px 0px;
    border-radius: 10px;
    padding: 10px;
    margin-inline: 10px;

    & input {
      background-color: transparent;
      outline: none;
      width: 100%;
      caret-color: white;
      color: whitesmoke;
    }
  }

  & button {
    color: #4c525c;
    font-size: 20px;
  }

  .file_select {
    margin-top: 10px;
  }
`;

const PickerDiv = styled.div`
  position: absolute;
  right: 40px;
  bottom: 65px;
`;
