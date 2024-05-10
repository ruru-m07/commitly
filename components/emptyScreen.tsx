"use client";

import Image from "next/image";
import React from "react";
import suggestionsData from "./suggestions.json";
import { Card } from "./ui/card";

const EmptyScreen = ({
  onSubmit,
}: {
  onSubmit: ({ suggestion }: { suggestion: string }) => void;
}) => {
  const messages: string[] = [
    "Commit something awesome!",
    "Let's craft some clever commits!",
    "Your commit history starts here...",
    "Type away and witness the magic!",
    "Time to make your commits shine!",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  const randomSuggestions = suggestionsData.messages
    .sort(() => 0.5 - Math.random()) // Shuffle the array
    .slice(0, 3); // Get the first 3 elements

  return (
    <div className="h-full w-full flex justify-center  ">
      <div className="grid place-items-center">
        <Image
          src={"/logo-light.png"}
          alt="logo"
          width={150}
          height={150}
          className="dark:block hidden"
        />
        <Image
          src={"/logo-dark.png"}
          alt="logo"
          width={150}
          height={150}
          className="dark:hidden block"
        />
        <h1 className="font-bold text-center">{randomMessage}</h1>
        <div className="flex justify-between items-cente mx-2">
          {randomSuggestions.map((suggestion, index) => (
            <Card
              className="m-2 p-4 flex justify-center items-center w-1/3 cursor-pointer hover:border-primary hover:bg-primary-foreground/35"
              key={index}
              onClick={() => onSubmit({ suggestion })}
            >
              <p className="text-sm ">{suggestion}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyScreen;
