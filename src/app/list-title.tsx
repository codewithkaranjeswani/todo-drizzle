"use client";

import { CheckIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { updateListTitleAction } from "./list-actions";
import { ListType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { DialogTrigger } from "@/components/ui/dialog";
import { CardDescription, CardTitle } from "@/components/ui/card";

function datefmt(dt: Date) {
  return dt.toLocaleString("en-IN", { hour12: false, hourCycle: "h23" });
}

export default function EditableTitle({ list }: { list: ListType }) {
  const [v, setV] = useState(list.title ?? "");
  const [t, setT] = useState(true);
  return (
    <>
      {t ? (
        <div className="flex flex-1 gap-x-2 items-baseline">
          <DialogTrigger asChild>
            <div className="flex flex-col gap-y-2 w-10/12 hover:cursor-pointer">
              <CardTitle>{v}</CardTitle>
              <div className="py-2" />
              <CardDescription className="text-xs font-thin">
                c {datefmt(list.createdAt)}
              </CardDescription>
              <CardDescription className="text-xs font-thin">
                u {datefmt(list.updatedAt)}
              </CardDescription>
            </div>
          </DialogTrigger>
          <button
            className="flex w-2/12 items-center"
            onClick={() => setT((p) => !p)}
          >
            <Pencil2Icon />
          </button>
        </div>
      ) : (
        <form
          className="flex flex-1 gap-x-2 items-baseline"
          action={updateListTitleAction.bind(null, list.id, v)}
        >
          <Input
            type="text"
            name="updateTitleText"
            placeholder={`${v}`}
            value={`${v}`}
            onChange={(e) => setV(e.target.value)}
            className="flex w-10/12"
          />
          <button
            className="flex w-2/12 items-center"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (v !== list.title) updateListTitleAction(list.id, v);
              setT((p) => !p);
            }}
          >
            <CheckIcon />
          </button>
        </form>
      )}
    </>
  );
}
