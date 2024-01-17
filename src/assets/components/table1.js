<TableContainer component={Paper}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    ref={provided.innerRef}
    isDragging={snapshot.isDragging}
    style={provided.draggableProps.style}>
    <Table
        // sx={{
        //   minWidth: 650,
        // }}
        size="small"
        aria-label="a dense table"
    >
        <TableHead>
            <TableRow>
                <TableCell>#{task.id}</TableCell>
                <TableCell sx={{position:'absolute',left:'85%'}}> 
                    <IconButton onClick={() => onDelete(task.id)} >
                    <CloseIcon></CloseIcon>
                </IconButton>
                </TableCell>
            </TableRow>
            
                <TableRow
                    key={row.name}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell>{row.name}</TableCell>
                </TableRow>
           
        </TableHead>
        
            
        
    </Table>
</TableContainer>