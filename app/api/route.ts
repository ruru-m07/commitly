import { type NextRequest } from "next/server";
import { model, systemHistory } from "@/utils";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const message = searchParams.get("message");

  if (!message) {
    return new Response("No message provided", { status: 400 });
  }

  const chat = model.startChat({
    history: [...(await systemHistory())],
  });

  const result = await chat.sendMessageStream(message);

  const response = await result.response;

  const data = response.text();

  if (!data) {
    return new Response("something went wrong!", { status: 500 });
  }

  return new Response(data);
}
