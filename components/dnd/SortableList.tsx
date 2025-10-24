"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Item sortável
function SortableItem({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between rounded border px-3 py-2 bg-background text-foreground"
    >
      <span className="select-none">{label}</span>
      <span className="text-xs text-muted-foreground">Arraste para ordenar</span>
    </li>
  );
}

export function SortableList() {
  const [items, setItems] = useState<Array<{ id: string; label: string }>>([
    { id: "a", label: "Item A" },
    { id: "b", label: "Item B" },
    { id: "c", label: "Item C" },
  ]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === String(active.id));
    const newIndex = items.findIndex((i) => i.id === String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;

    setItems((prev) => arrayMove(prev, oldIndex, newIndex));
  }

  return (
    <div className="w-full max-w-sm space-y-3">
      <h3 className="text-base font-semibold">Sortable (DnD Kit)</h3>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-2">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} label={item.label} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}