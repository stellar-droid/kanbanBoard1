import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const LeftPanel = ({ stockDevices, index, id }) => {
  return (
    <div>
      <h2>Stock Devices in Stock</h2>
      <Droppable droppableId={id} isDroppable={false}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {stockDevices.map((device, index) => (
              <Draggable
                key={device.id}
                draggableId={device.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                  >
                    <h3>{device.name}</h3>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default LeftPanel;