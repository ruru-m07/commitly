import { Badge } from "./ui/badge";

const AiLoading = () => {
  return (
    <div className="flex justify-start gap-1 mb-2">
      <Badge variant="outline" className="ml-2 h-fit mr-2 animate-pulse">
        Thinking...
      </Badge>
    </div>
  );
};

export default AiLoading;
