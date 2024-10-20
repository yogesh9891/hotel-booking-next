import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import CreateMenuForm from "./CreateMenuForm";

function EditMenu() {
  
  // ===================================================================================================================

  const [MenuItem, setMenuItem] = useState([
    { id: "Home", name: "Home" },
    { id: "About", name: "About" },
    { id: "Blog", name: "Blog" },
    { id: "Contact", name: "Contact" },
    { id: "Portfolio", name: "Portfolio" },
    { id: "SignIn", name: "Sign In" },
    { id: "SignUp", name: "Sign Up" },
  ]);
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };
  const onDragEnd=(result)=> {
    // dropped outside the list
    if (!result.destination) {
      return ;
    }

    const items = reorder(
      MenuItem,
      result.source.index,
      result.destination.index
    );

    setMenuItem({
      items
    });
  }
  
  // ===================================================================================================================

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Edit Menu</h5>
          <CreateMenuForm />
          <DashboardBox className="col-lg-8">
            <div className="d-flex justify-content-end mb-4">
              <CustomButton
                isLink
                btnName="Create Menu Item"
                iconName="fa-solid fa-plus"
                path="/Menus/Menus-Item"
              />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="dragable-menu">
                {(provided) => (
                  <ul
                    className="dragable-menu"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {MenuItem.map((item, i) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={i}>
                          {(provided,index) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={index}
                            >
                              {item.name}
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                     {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default EditMenu;
