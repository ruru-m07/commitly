import React from "react";
import MarkdownReader from "./md-components";

const ListSuggestion = ({
  suggestions,
  commitChanges,
}: {
  suggestions: string;
  commitChanges: string;
}) => {
  return (
    <div className="mx-4 md:mx-10">
      <h1 className="text-xl font-bold">{commitChanges}</h1>
      <MarkdownReader markdown={suggestions} />
    </div>
  );
};

export default ListSuggestion;
