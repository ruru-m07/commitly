"use client";

import { commitChange } from "@/action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toastVariants } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CornerDownLeft } from "lucide-react";
import React from "react";
import dynamic from "next/dynamic";
import ListSuggestion from "@/components/listSuggestion";
import Loader from "@/components/loader";
import { Spinner } from "@/components/ui/spinner";

const EmptyScreen = dynamic(() => import("@/components/emptyScreen"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Home() {
  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [commitChanges, setcommitChanges] = React.useState<string | null>(null);
  const [commitMessages, setcommitMessages] = React.useState<string | null>(
    null
  );

  const { toast } = useToast();

  const handelSubmit = async ({ suggestion }: { suggestion: string }) => {
    if (suggestion === commitChanges) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "error: Please enter a different message.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await commitChange({
        message: suggestion,
      });

      if (error) {
        setError(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error,
          action: (
            <button
              className={cn(
                toastVariants({
                  variant: "destructive",
                  className: "w-fit m-0 p-2 text-xs hover:bg-[#815305]/35",
                })
              )}
              onClick={() => handelSubmit({ suggestion })}
            >
              Try again
            </button>
          ),
        });
      } else {
        if (data) {
          setcommitMessages(data.text);
          setcommitChanges(suggestion);
          setMessage("");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = (
    e: React.FormEvent<HTMLFormElement>,
    message: string | null
  ): void => {
    e.preventDefault();
    handelSubmit({ suggestion: message || "" });
  };

  return (
    <div className=" h-full py-10 flex items-center justify-center">
      <ScrollArea className="h-screen w-full">
        <div className=" flex h-screen mx-0 lg:mx-48 xl:mx-60 flex-col p-4 lg:col-span-2">
          <div className="w-full h-5/6 mb-2 flex  items-end">
            <Card className="h-full w-full py-4 flex justify-center items-center bg-primary-foreground/25">
              <ScrollArea className=" flex justify-center items-center">
                {error ? (
                  <div>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      Oops! Something Went Wrong!{" "}
                      <span className="ml-2"> : ( </span>
                    </h3>
                    <p className="text-sm text-muted-foreground">{error}</p>
                  </div>
                ) : isLoading ? (
                  <Loader />
                ) : commitMessages ? (
                  <ListSuggestion
                    suggestions={commitMessages!}
                    commitChanges={commitChanges || ""}
                  />
                ) : (
                  <EmptyScreen onSubmit={handelSubmit} />
                )}
              </ScrollArea>
            </Card>
          </div>

          <div className="flex-1" />

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
              <Button
                type="submit"
                size="sm"
                className={`ml-auto gap-1.5 ${!message && "bg-primary-foreground text-muted-foreground border cursor-not-allowed hover:bg-primary-foreground"}`}
                disabled={isLoading}
              >
                {isLoading && <Spinner className="size-4" />}
                  Generate
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </div>
      </ScrollArea>
    </div>
  );
}
