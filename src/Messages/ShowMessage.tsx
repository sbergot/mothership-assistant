import { GameMessage } from "Messages/types";
import { ShowSaveRoll } from "./ShowSaveRoll";
import { ShowSimpleMessage } from "./ShowSimpleMessage";
import { ShowStatRoll } from "./ShowStatRoll";
import { ShowPanicRoll } from "./ShowPanicRoll";
import { ShowPanicEffect } from "./ShowPanicEffect";
import { ShowWoundEffect } from "./ShowWoundEffect";
import { ShowAttackRoll } from "./ShowAttackRoll";

interface Props {
  message: GameMessage
}

export function ShowMessage({ message }: Props) {
  if (message.type === "StatRollMessage") {
    return <ShowStatRoll {...message.props} />
  }

  if (message.type === "AttackRollMessage") {
    return <ShowAttackRoll {...message.props} />
  }

  if (message.type === "SaveRollMessage") {
    return <ShowSaveRoll {...message.props} />
  }

  if (message.type === "PanicRollMessage") {
    return <ShowPanicRoll {...message.props} />
  }

  if (message.type === "PanicEffectMessage") {
    return <ShowPanicEffect {...message.props} />
  }

  if (message.type === "WoundEffectMessage") {
    return <ShowWoundEffect {...message.props} />
  }

  if (message.type === "SimpleMessage") {
    return <ShowSimpleMessage {...message.props} />
  }

  return <div>unknown message type</div>
}