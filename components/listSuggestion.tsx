import React, { useEffect, useState } from "react";
import MarkdownReader from "./md-components";
import {
  CheckIcon,
  Cross1Icon,
  Pencil1Icon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type ListSuggestionProps = {
  suggestions: string;
  commitChanges: string;
  submitForm: (
    e: React.FormEvent<HTMLFormElement>,
    message: string | null
  ) => void;
  forceSubmit: ({
    suggestion,
    force,
  }: {
    suggestion: string;
    force?: boolean;
  }) => Promise<void>;
};

const ListSuggestion = ({
  suggestions,
  commitChanges,
  submitForm,
  forceSubmit,
}: ListSuggestionProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updatedMessage, setUpdatedMessage] = useState(commitChanges);

  useEffect(() => {
    setIsEditMode(false);
  }, [commitChanges, suggestions]);

  const toggelEditMode = () => {
    setIsEditMode((pre) => !pre);
  };

  return (
    <div className="mx-4 md:mx-10 pt-1">
      {isEditMode ? (
        <form
          onSubmit={(e) => submitForm(e, updatedMessage)}
          className="flex gap-2 w-full items-center justify-between "
        >
          <Input
            className="w-full"
            value={updatedMessage}
            autoComplete="off"
            onChange={(e) => {
              setUpdatedMessage(e.target.value);
            }}
            autoFocus
            required
          ></Input>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={"outline"}
                size={"icon"}
                type="submit"
                className={
                  "bg-primary-foreground text-muted-foreground border hover:bg-primary-foreground"
                }
                disabled={
                  updatedMessage === commitChanges ||
                  updatedMessage.trim() === ""
                }
              >
                <CheckIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Submit</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={"outline"}
                size={"icon"}
                type="button"
                className={
                  "bg-primary-foreground text-muted-foreground border hover:bg-primary-foreground"
                }
                onClick={toggelEditMode}
              >
                <Cross1Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cancel</p>
            </TooltipContent>
          </Tooltip>
        </form>
      ) : (
        <div className="flex w-full items-center justify-between ">
          <h1 className="text-xl font-bold">{commitChanges}</h1>
          <div className="flex items-center">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className={
                    "bg-primary-foreground text-muted-foreground border hover:bg-primary-foreground mr-2"
                  }
                  onClick={() =>
                    forceSubmit({ suggestion: commitChanges, force: true })
                  }
                >
                  <SymbolIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Regenerate</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className={
                    "bg-primary-foreground text-muted-foreground border hover:bg-primary-foreground"
                  }
                  onClick={toggelEditMode}
                >
                  <Pencil1Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}
      <MarkdownReader markdown={suggestions} />
    </div>
  );
};

export default ListSuggestion;
