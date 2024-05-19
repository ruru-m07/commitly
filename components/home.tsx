"use client";

import React from "react";
import dynamic from "next/dynamic";
import { commitChange } from "@/action";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toastVariants } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import ListSuggestion from "@/components/listSuggestion";
import FormComponent from "./formComponent";
import ErrorComponent from "./errorComponent";
import LoadingComponent from "./loadingComponent";
import Loader from "./loader";

const EmptyScreen = dynamic(() => import("@/components/emptyScreen"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Home() {
  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [commitChanges, setCommitChanges] = React.useState<string | null>(null);
  const [isEmojiSupport, setIsEmojiSupport] = React.useState<boolean>(false);
  const [commitMessages, setCommitMessages] = React.useState<string | null>(
    null
  );

  const { toast } = useToast();

  const handleSubmit = async ({
    suggestion,
    force = false,
  }: {
    suggestion: string;
    force?: boolean;
  }) => {
    if (!force && suggestion === commitChanges) {
      toast({
        variant: "destructive",
        title: "Duplicate Message",
        description: "Please enter a different message.",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await commitChange({
        message: suggestion,
        isEmojiSupport: isEmojiSupport,
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
              onClick={() => handleSubmit({ suggestion })}
            >
              Try again
            </button>
          ),
        });
      } else {
        if (data) {
          setCommitMessages(data.text);
          console.log(data.text);
          setCommitChanges(suggestion);
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
    handleSubmit({ suggestion: message || "" });
  };

  return (
    <div className="h-full py-10 flex items-center justify-center">
      <ScrollArea className="h-screen w-full">
        <div className="flex h-screen mx-0 lg:mx-48 xl:mx-60 flex-col p-4 lg:col-span-2">
          <div className="w-full h-5/6 mb-2 flex items-end">
            <Card className="h-full w-full py-4 flex justify-center items-center bg-primary-foreground/25">
              <ScrollArea className="flex justify-center items-center w-full">
                {error ? (
                  <ErrorComponent error={error} />
                ) : isLoading ? (
                  <LoadingComponent />
                ) : commitMessages ? (
                  <ListSuggestion
                    suggestions={commitMessages!}
                    commitChanges={commitChanges || ""}
                    submitForm={submitForm}
                    forceSubmit={handleSubmit}
                  />
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <EmptyScreen onSubmit={handleSubmit} />
                  </div>
                )}
              </ScrollArea>
            </Card>
          </div>

          <div className="flex-1" />

          <FormComponent
            isLoading={isLoading}
            message={message}
            setMessage={setMessage}
            submitForm={submitForm}
            setIsEmojiSupport={setIsEmojiSupport}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
