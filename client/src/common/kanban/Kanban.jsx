import { Divider } from 'antd';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import HeadlessMenu from '../menu/HeadlessMenu';

// Test data with unique task IDs and descriptive sentences
const initialTasks = {
  Todo: [
    { id: 'task-1', content: 'Review project documentation' },
    { id: 'task-2', content: 'Set up development environment' },
    { id: 'task-3', content: 'Outline feature requirements' },
    { id: 'task-4', content: 'Create wireframes' },
  ],
  'In Progress': [
    { id: 'task-5', content: 'Develop authentication module' },
    { id: 'task-6', content: 'Integrate API endpoints' },
    { id: 'task-7', content: 'Implement responsive design' },
  ],
  Completed: [
    { id: 'task-8', content: 'Set up project repository' },
    { id: 'task-9', content: 'Complete initial project setup' },
  ],
};

const Kanban = () => {
  const [columns, setColumns] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Moving within the same column
      const column = Array.from(columns[source.droppableId]);
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);
      setColumns({ ...columns, [source.droppableId]: column });
    } else {
      // Moving between columns
      const sourceColumn = Array.from(columns[source.droppableId]);
      const destColumn = Array.from(columns[destination.droppableId]);
      const [removed] = sourceColumn.splice(source.index, 1);
      destColumn.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {Object.keys(columns).map((columnId, index) => (
          <Column key={columnId} name={columnId} tasks={columns[columnId]} />
        ))}
      </div>
    </DragDropContext>
  );
};

const Column = ({ name, tasks }) => {
  return (
    <Droppable droppableId={name} key={name}>
      {(provided) => (
        <div
          className="bg-neutral-200 h-100 w-full overflow-y-scroll overflow-x-hidden p-4 rounded-md"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h3 className="text-center font-semibold mb-2">{name}</h3>
          <Divider />
          {tasks.map((task, index) => (
            <Item key={task.id} item={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const Item = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          className="text-center py-2 px-4 border-[1px] border-zinc-300 bg-white my-2 rounded-md shadow-sm"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
};

export default Kanban;
