"use client";

import Image from "next/image";
import React from "react";
import data from "./data.json";
import { Card, CardHeader } from "./ui/card";

const EmptyScreen = ({
  onSubmit,
}: {
  onSubmit: ({ suggestion }: { suggestion: string }) => void;
}) => {
  const randomMessage =
    data.messages[Math.floor(Math.random() * data.messages.length)];

  const randomSuggestions = data.suggestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="h-full w-full flex justify-center  ">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={"/logo-light.png"}
          alt="logo"
          width={200}
          height={200}
          className="dark:block hidden"
          priority
        />
        <Image
          src={"/logo-dark.png"}
          alt="logo"
          width={200}
          height={200}
          className="dark:hidden block"
          priority
        />
        <CardHeader className="font-bold text-center text-lg">
          {randomMessage}
        </CardHeader>
        <div className="grid grid-cols-2 gap-3 mx-14 mt-4">
          {randomSuggestions.map((suggestion, index) => (
            <Card
              className="p-4 flex items-center w-full rounded-lg cursor-pointer hover:border-primary hover:bg-primary-foreground"
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
