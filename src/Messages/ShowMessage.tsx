import { AnyMessage } from "Session/types";
import { ShowStatRoll } from "./ShowStatRoll";

interface Props {
  message: AnyMessage
}

export function ShowMessage({ message }: Props) {
  if (message.type === "StatRollMessage") {
    return <ShowStatRoll {...message.props} />
  }

  return <div>unknown message type: {message.type}</div>
}