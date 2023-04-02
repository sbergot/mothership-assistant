import { GameMessage } from "Messages/types";
import { ShowSaveRoll } from "./ShowSaveRoll";
import { ShowSimpleMessage } from "./ShowSimpleMessage";
import { ShowStatRoll } from "./ShowStatRoll";

interface Props {
  message: GameMessage
}

export function ShowMessage({ message }: Props) {
  if (message.type === "StatRollMessage") {
    return <ShowStatRoll {...message.props} />
  }

  if (message.type === "SaveRollMessage") {
    return <ShowSaveRoll {...message.props} />
  }

  if (message.type === "PanicRollMessage") {
    return <ShowSaveRoll {...message.props} />
  }

  if (message.type === "PanicEffectMessage") {
    return <ShowSaveRoll {...message.props} />
  }

  if (message.type === "SimpleMessage") {
    return <ShowSimpleMessage {...message.props} />
  }

  return <div>unknown message type</div>
}