"use client";

import { commitMessage } from "@/action";
import AiLoading from "@/components/AiLoading";
import Navbar from "@/components/Navbar";
import ListChat from "@/components/listChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Content } from "@google/generative-ai";
import { CornerDownLeft } from "lucide-react";
import React from "react";

export default function Home() {
  const [chatHistory, setChatHistory] = React.useState<Content[] | []>([]);
  const [message, setMessage] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { toast } = useToast();

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      setChatHistory((prevMsg) => [
        ...prevMsg,
        { role: "user", parts: [{ text: message }] },
      ]);

      const data = await commitMessage({
        message: message,
        history: chatHistory,
      });

      if (data.success && data.text) {
        setChatHistory((prevMsg) => [
          ...prevMsg,
          { role: "model", parts: [{ text: data.text }] },
        ]);
      } else {
        console.log(data.error);
        if (data.error) {
          toast({
            description: data.error,
          });
        } else {
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <main className="mx-10 lg:mx-20">
      <section className="h-screen py-10">
        <Navbar />
        <div className=" h-full py-10 flex items-center justify-center">
          <ScrollArea className="h-screen  w-full">
            <div className="relative flex h-screen mx-0 sm:mx-10 lg:mx-60 flex-col p-4 lg:col-span-2">
              <ScrollArea className="w-full h-5/6 mb-2">
                <ListChat chatHistory={chatHistory} />
                {isLoading && <AiLoading />}
              </ScrollArea>

              <div className="flex-1" />
              <form
                onSubmit={handelSubmit}
                className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
              >
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Input
                  id="message"
                  placeholder="Describe your changes here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  disabled={isLoading}
                  autoFocus
                  required
                />
                <div className="flex items-center p-3 pt-0">
                  <Button
                    type="submit"
                    size="sm"
                    className="ml-auto gap-1.5"
                    disabled={isLoading}
                  >
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </form>
            </div>
          </ScrollArea>
        </div>
      </section>
    </main>
  );
}
