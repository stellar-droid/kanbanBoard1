//  DROPPABLE COMPONENT

import React from "react";
import styled from "styled-components";
import Task from "./Task";
import "./Main.css";
import { Droppable } from "react-beautiful-dnd";
import { Button } from "@mui/material";

import { useState } from "react";
const Container = styled.div`
  // background-color: #f4f5f7;
  border-radius: 25px;
  width: 300px;
  // height: 150vh;
  min-height: 100vh;
  overflow-y: hidden;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 2px solid skyblue;

`;

const Title = styled.h3`
  padding: 8px;
  // background-color: pink;
  text-align: center;
`;

const TaskList = styled.div`
  padding: 3px;
  transistion: background-color 0.2s ease;
  // background-color: #f4f5f7;
  // flex-grow: 1;
  min-height: 5px;
  height: 400px;
  width:250px
`;
const myArray = Array.from({ length: 10 }, (_, index) => index + 1);
export default function Column({ title, tasks, id, onDelete }) {
  return (
    <>
      <Container className="column">
        <Title
          style={{
            backgroundColor: "#0073e6",
            position: "stick",
          }}
        >
          {title}
        </Title>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {myArray.map((task, index) => (
              <span>{index + 1}</span>
            ))}
          </div>
          <div>
            <Droppable droppableId={id}>
              {(provided, snapshot) => (
                <>
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {tasks.map((task, index) => (
                      <Task
                        key={index}
                        index={index}
                        task={task}
                        onDelete={onDelete}
                      />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                </>
              )}
            </Droppable>
          </div>
        </div>
      </Container>
    </>
  );
}
