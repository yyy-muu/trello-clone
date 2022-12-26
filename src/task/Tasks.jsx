import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Task } from "./Task";

const reorder = (taskList, startIndex, endIndex) => {
  const remove = taskList.splice(startIndex, 1); // １番目の要素を削除
  taskList.splice(endIndex, 0, remove[0]); // 0番目の要素を削除して、removeした要素の0番目を追加する
};

export const Tasks = ({ taskList, setTaskList }) => {
  const handleDragEnd = (result) => {
    // タスク入れ替え

    reorder(taskList, result.source.index, result.destination.index);
    setTaskList(taskList);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            // innerRef : ドラッグ＆ドロップしていないカードを制御する
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {taskList.map((task, index) => (
                <div key={task.id}>
                  <Task
                    index={index}
                    task={task}
                    taskList={taskList}
                    setTaskList={setTaskList}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
