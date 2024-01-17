import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import './Main.css';

const RackDeviceList = ({ data, id }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the data based on the search query
  const filteredData = data.filter((item) =>
  item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <div className="stocklist">
      <div className="opmAddEditDeviceListhdr">
        Available Devices (<span id="remaingDevList_Rck">{filteredData.length}</span>)
        <br />
        <span
          style={{
            fontSize: "10px",
            textDecoration: "none",
            cursor: "pointer",
          }}
          id="dragMenu"
        >
          (Drag and Drop)
        </span>
      </div>
      <div
        className="bvDeviceSrch"
        style={{
          top: "20px",
          width: "91%",
          marginLeft: "7px",
        }}
      >
        <input
          type="text"
          id="rack_devNameSearchTxt"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search devices..."
        />
      </div>
      <div
        className="opmAddEditDeviceListContent"
        style={{ top: "50px", height: "300px", overflowY: "auto" }}
      >
        {/* Added container div for scroll */}
        <Droppable droppableId={id} isDropDisabled={true}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              style={{ height: "100%", overflowY: "scroll" }}
            > 
              <table
                cellSpacing="0"
                cellPadding="0"
                style={{}}
                width="220px"
                id="rbDeviceTable"
                height="100px"
              >
                <tbody>
                  {filteredData.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr key={item.id}>
                          <td className="rackDevicesList">
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              isDragging={snapshot.isDragging}
                              id={item.id}
                            >
                              {item.title}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default RackDeviceList;
