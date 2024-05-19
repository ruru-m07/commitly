import React from "react";

interface ErrorComponentProps {
  error: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Oops! Something Went Wrong! <span className="ml-2"> : ( </span>
      </h3>
      <p className="text-sm text-muted-foreground mt-2">{error}</p>
    </div>
  );
};

export default ErrorComponent;
