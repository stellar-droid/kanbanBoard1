const handleDragEnd = (result) => {
  const { destination, source, draggableId } = result;
  console.log("Source:", source);

  console.log("Dragged Device Id:", draggableId);

  // If there is no destination or the item is dropped in the same place
  if (!destination || destination.droppableId === source.droppableId) {
    // Rearrange tasks within the same rack
    const updatedRacks =
      source.droppableId === "1"
        ? Array.from(rack1)
        : source.droppableId === "2"
        ? Array.from(rack2)
        : Array.from(rack3);
    const [removedTask] = updatedRacks.splice(source.index, 1);
    updatedRacks.splice(destination.index, 0, removedTask);

    if (source.droppableId === "1") {
      setRack1(updatedRacks);
    } else if (source.droppableId === "2") {
      setRack2(updatedRacks);
    } else source.droppableId === "3";  //elseif (source.droppableId === "3")
    {
      setRack3(updatedRacks);
    }
    setIsFormOpen(true);
    return;
  }

  // If dragging between racks
  const task =
    source.droppableId === "2"
      ? rack2[source.index]
      : source.droppableId === "3"
      ? rack3[source.index]
      : rack1[source.index];

  // Remove the task from the source rack
  const updatedSource =
    source.droppableId === "2"
      ? Array.from(rack2)
      : source.droppableId === "3"
      ? Array.from(rack3)
      : Array.from(rack1);
  updatedSource.splice(source.index, 1);

  // Update the destination rack with the task at the correct position
  const updatedDestination =
    destination.droppableId === "2"
      ? Array.from(rack2)
      : destination.droppableId === "3"
      ? Array.from(rack3)
      : Array.from(rack1);
  updatedDestination.splice(destination.index, 0, {
    ...task,
    rack1: destination.droppableId === "1",
    rack2: destination.droppableId === "2",
    rack3: destination.droppableId === "3",
  });

  // Check the length of the destination rack after rearranging
  if (updatedDestination.length > 42) {
    // Rack is full, prevent dropping
    return alert("Rack is full!");
  }

  // Update state with the new task positions
  setRack1(
    destination.droppableId === "1" ? updatedDestination : updatedSource
  );
  setRack2(
    destination.droppableId === "2" ? updatedDestination : updatedSource
  );
  setRack3(
    destination.droppableId === "3" ? updatedDestination : updatedSource
  );

  setIsFormOpen(true);
};