"use client";

import { CheckIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { updateListTitleAction } from "./list-actions";
import { ListType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { DialogTrigger } from "@/components/ui/dialog";

export default function EditableTitle({ list }: { list: ListType }) {
  const [v, setV] = useState(list.title ?? "");
  const [t, setT] = useState(true);
  return (
    <>
      {t ? (
        <div className="flex flex-1 gap-x-2 items-center">
          <DialogTrigger asChild>
            <div className="flex w-10/12 hover:cursor-pointer">{v}</div>
          </DialogTrigger>
          <button
            className="flex w-2/12 items-center"
            onClick={() => setT((p) => !p)}
          >
            <Pencil2Icon />
          </button>
        </div>
      ) : (
        <>
          <form
            className="flex flex-1 gap-x-2"
            action={updateListTitleAction.bind(null, list.id, v)}
          >
            <Input
              type="text"
              name="updateTitleText"
              placeholder={`${v}`}
              onChange={(e) => setV(e.target.value)}
              className="flex w-10/12"
            />
            <button
              className="flex w-2/12 items-center"
              type="submit"
              onClick={() => setT((p) => !p)}
            >
              <CheckIcon />
            </button>
          </form>
        </>
      )}
    </>
  );
}
