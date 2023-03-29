import { GameMessage } from "Messages/types";
import { ShowSimpleMessage } from "./ShowSimpleMessage";
import { ShowStatRoll } from "./ShowStatRoll";

interface Props {
  message: GameMessage
}

export function ShowMessage({ message }: Props) {
  if (message.type === "StatRollMessage") {
    return <ShowStatRoll {...message.props} />
  }

  if (message.type === "SimpleMessage") {
    return <ShowSimpleMessage {...message.props} />
  }

  return <div>unknown message type: {message}</div>
}