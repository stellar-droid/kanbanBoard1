// DRAG DROP CONTEXT Containing all the drag and drop contents

import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import TaskForm from "./TaskForm";
import { Modal, Paper } from "@mui/material";
import LeftPanel from "./LeftPanel";
import Test from "./test";
export default function KanbanBoard() {
  const [rack1, setRack1] = useState([""]);
  const [rack2, setRack2] = useState([""]);
  const [rack3, setRack3] = useState([""]);
  const [rack4, setRack4] = useState([""]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const staticData = [
    { id: "2", title: "Device 2", rack: "4" },
    { id: "1", title: "Device 1", rack: "4" },
    { id: "3", title: "Device 3", rack: "4" },
    { id: "4", title: "Device 4", rack: "4" },
    { id: "5", title: "Device 5", rack: "4" },
    { id: "6", title: "Device 6", rack: "4" },
    { id: "7", title: "Device 7", rack: "4" },
    { id: "8", title: "Device 8", rack: "4" },
    { id: "192.148.11.45", title: "OPM-Server31", rack: "4" },
    { id: "192.148.11.89", title: "OPM-Switch6", rack: "4" },
    { id: "192.148.11.43", title: "OPM-Server29", rack: "4" },
    { id: "172.168.22.16", title: "OPM-Server23", rack: "4" },
    { id: "172.16.22.100", title: "OPM-Server24", rack: "4" },
    { id: "10.10.10.145", title: "OPM-Server25", rack: "4" },
    { id: "10.10.10.144", title: "OPM-Server26", rack: "4" },
    { id: "10.10.10.143", title: "OPM-Server27", rack: "4" },
    { id: "10.10.10.142", title: "OPM-Server28", rack: "4" },
    { id: "10.10.10.141", title: "OPM-Server32", rack: "4" },
    { id: "10.10.10.140", title: "OPM-Server33", rack: "4" },

    // Add more devices as needed
  ];

  // <-------------------USE EFFECT----------------->
  useEffect(() => {
    // Use static data instead of fetching from the API
    const rack1 = staticData.filter((task) => task.rack === "1");
    const rack2 = staticData.filter((task) => task.rack === "2");
    const rack3 = staticData.filter((task) => task.rack === "3");
    const rack4 = staticData.filter((task) => task.rack === "4");

    setRack1(rack1);
    setRack2(rack2);
    setRack3(rack3);
    setRack4(rack4);

    // Add event listener for the Escape key
    document.addEventListener("keydown", handleEscapeKey);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);
  // USE EFFECT ENDS

  // <-------------------HANDLE ESCAPE KEY----------------->
  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      closeForm();
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  // <-------------------HANDLE ESCAPE KEY ENDS----------------->

  // <-------------------HANDLE DRAG START----------------->
  const handleDragEnd = (result) => {

    setIsDragging(false); // Reset isDragging after drag ends

    if (!formSubmitted) {
      // Prevent drag-drop if formSubmitted is false
      return;
    }


    const { destination, source, draggableId } = result;

    console.log("Dragged Device Id:", draggableId);
    console.log("Source Rack Id:", source.droppableId);
    console.log("Destination Rack Id:", destination.droppableId);
    console.log("Destination Rack Index:", destination.index);
    console.log("Source Rack Index:", source.index);

    // If there is no destination or the item is dropped in the same place
    if (!destination || destination.droppableId === source.droppableId) {
      // Rearrange tasks within the same rack
      const updatedRack =
        source.droppableId === "1"
          ? Array.from(rack1)
          : source.droppableId === "2"
          ? Array.from(rack2)
          : Array.from(rack3);
      const [removedTask] = updatedRack.splice(source.index, 1);
      updatedRack.splice(destination.index, 0, removedTask);

      if (source.droppableId === "1" && formSubmitted === true) {
        setRack1(updatedRack);
      } else if (source.droppableId === "2" && formSubmitted === true) {
        setRack2(updatedRack);
      } else if (source.droppableId === "3" && formSubmitted === true) {
        setRack3(updatedRack);
      }

      {
        source.index !== destination.index ||
        source.droppableId !== destination.droppableId
          ? setIsFormOpen(true)
          : null;
      }
      return;
    }

    // If dragging between racks
    // source.droppableId === "2"
    //   ? rack2[source.index]
    //   : source.droppableId === "3"
    //   ? rack3[source.index]
    //   : rack1[source.index];

    // if dragging between racks
    const getTask = () => {
      switch (source.droppableId) {
        case "1":
          return rack1[source.index];
        case "2":
          return rack2[source.index];
        case "3":
          return rack3[source.index];
        case "4":
          return rack4[source.index];
        default:
          return rack1[source.index];
      }
    };
    const task = getTask();

    console.log("task", task);
    // Remove the task from the source rack
    const updatedSource =
      source.droppableId === "2"
        ? Array.from(rack2)
        : source.droppableId === "3"
        ? Array.from(rack3)
        : source.droppableId === "4"
        ? Array.from(rack4)
        : Array.from(rack1);
    updatedSource.splice(source.index, 1);
    // if (source.droppableId === "4") {
    //   setRack4(updatedSource);
    // }
    // else{

    // }
    console.log("Updated Source Rack:", updatedSource);

    // Update the destination rack with the task at the correct position
    const updatedDestination =
      destination.droppableId === "2"
        ? Array.from(rack2)
        : destination.droppableId === "3"
        ? Array.from(rack3)
        : destination.droppableId === "4"
        ? Array.from(rack4)
        : Array.from(rack1);
    updatedDestination.splice(destination.index, 0, {
      ...task,
      rack1: destination.droppableId === "1",
      rack2: destination.droppableId === "2",
      rack3: destination.droppableId === "3",
    });

    console.log("Updated Destination Rack:", updatedDestination);

    // Check the length of the destination rack after rearranging
    if (updatedDestination.length > 42) {
      // Rack is full, prevent dropping
      return alert("Rack is full!");
    }

    // Update state with the new task positions
    if (source.droppableId === "1") {
      setRack1(updatedSource);
    } else if (source.droppableId === "2") {
      setRack2(updatedSource);
    } else if (source.droppableId === "3") {
      setRack3(updatedSource);
    } else if (source.droppableId === "4") {
      setRack4(updatedSource);
    } else {
      return;
    }

    if (destination.droppableId === "1") {
      setRack1(updatedDestination);
    } else if (destination.droppableId === "2") {
      setRack2(updatedDestination);
    } else if (destination.droppableId === "3") {
      setRack3(updatedDestination);
    }

    alert(
      "you dragged the device no. " +
        draggableId +
        " from rack no. " +
        source.droppableId +
        " to rack no. " +
        destination.droppableId +
        "at index " +
        destination.index
    );
    {
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
        ? setIsFormOpen(true)
        : null;
    }
  };
  const DragUpdate = (update) => {
    console.log("update", update);
  };
  // <-------------------HANDLE DRAG START ENDS----------------->

  // <-------------------OPEN FORM----------------->
  const closeForm = () => {
    setIsFormOpen(false);
    setFormSubmitted(false);
  };
  // <-------------------OPEN FORM ENDS----------------->

  // <-------------------DELETE DEVICE STARTS----------------->
  const onDelete = (taskId) => {
    // Implement the logic to delete the task with the specified taskId
    const updatedRack2 = rack2.filter((task) => task.id !== taskId);
    const updatedRack1 = rack1.filter((task) => task.id !== taskId);
    const updatedRack3 = rack3.filter((task) => task.id !== taskId);

    setRack2(updatedRack2);
    setRack1(updatedRack1);
    setRack3(updatedRack3);
    console.log(" Deleted Device : ", taskId);

    // Move the deleted device back to rack 4
    const deletedDevice = staticData.find((device) => device.id === taskId);
    setRack4([...rack4, deletedDevice]);

    console.log("Deleted Device: ", taskId);
  };
  // <-------------------DELETE DEVICE ENDS----------------->

  // const [stockDevices, setStockDevices] = useState([
  //   { id: "device1", name: "Device 1" },
  //   { id: "device2", name: "Device 2" },
  //   // Add more devices as needed
  // ]);

  return (
    <>
      <DragDropContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragUpdate={DragUpdate}
      >
        <h2 style={{ textAlign: "center" }}>Rack View </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginLeft: "220px",
          }}
        >
          <Column
            title={"Rack 1"}
            tasks={rack1}
            id={"1"}
            style={{ zIndex: 1 }}
            onDelete={onDelete}
          />
          <Column
            title={"Rack 2"}
            tasks={rack2}
            id={"2"}
            style={{ zIndex: 2 }}
            onDelete={onDelete}
          />
          <Column
            title={"Rack 3"}
            tasks={rack3}
            id={"3"}
            style={{ zIndex: 2 }}
            onDelete={onDelete}
          />
          {/* <LeftPanel
            stockDevices={stockDevices}
            index={stockDevices.id}
            id={stockDevices.id}
          /> */}
          <Test data={rack4} id={"4"} />
          {/* <Column title={"Rack 3"} tasks={[]} id={"3"} /> */}
          <Modal open={isFormOpen} onKeyDown={handleEscapeKey}>
            {/* <Paper style={{height:'570px',width:700}}> */}
            <TaskForm
              onClose={closeForm}
              action={action}
              setAction={setAction}
              setFormSubmitted={setFormSubmitted}
              formSubmitted={formSubmitted}
            />
            {/* </Paper> */}
          </Modal>{" "}
          {/* Render the form when isFormOpen is true */}
        </div>
      </DragDropContext>
    </>
  );
}
