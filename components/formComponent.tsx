import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { CornerDownLeft } from "lucide-react";

interface FormComponentProps {
  isLoading: boolean;
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  submitForm: (
    e: React.FormEvent<HTMLFormElement>,
    message: string | null
  ) => void;
  setIsEmojiSupport: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormComponent: React.FC<FormComponentProps> = ({
  isLoading,
  message,
  setMessage,
  submitForm,
  setIsEmojiSupport,
}) => {
  return (
    <form
      onSubmit={(e) => submitForm(e, message)}
      className="relative overflow-hidden rounded-lg border bg-primary-foreground/25 focus-within:ring-1 focus-within:ring-ring shadow"
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Input
        id="message"
        placeholder="Describe your changes here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        onChange={(e) => setMessage(e.target.value)}
        value={message || ""}
        disabled={isLoading}
        autoComplete="off"
        autoFocus
        required
      />
      <div className="flex items-center p-3 pt-0">
        <div className="flex items-center space-x-2">
          <Switch
            onCheckedChange={(e) => setIsEmojiSupport(e)}
            id="emoji-mode"
            name="emoji-mode"
            aria-label="Emoji Mode"
          />
          <Label htmlFor="emoji-mode">Emoji Mode</Label>
        </div>
        <Button
          type="submit"
          size="sm"
          className={cn("ml-auto gap-1.5", {
            "bg-primary-foreground text-muted-foreground border cursor-not-allowed hover:bg-primary-foreground":
              !message || isLoading,
          })}
          disabled={isLoading}
        >
          {isLoading && <Spinner className="size-4" />}
          Generate
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
};

export default FormComponent;
