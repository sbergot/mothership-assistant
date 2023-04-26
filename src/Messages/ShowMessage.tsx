import { GameMessage, MessageContext } from "Messages/types";
import { ShowSaveRoll } from "./ShowSaveRoll";
import { ShowSimpleMessage } from "./ShowSimpleMessage";
import { ShowStatRoll } from "./ShowStatRoll";
import { ShowPanicRoll } from "./ShowPanicRoll";
import { ShowPanicEffect } from "./ShowPanicEffect";
import { ShowWoundEffect } from "./ShowWoundEffect";
import { ShowAttackRoll } from "./ShowAttackRoll";
import { ShowDamage } from "./ShowDamage";
import { ShowRestRoll } from "./ShowRestRoll";
import { ShowDeathCheck } from "./ShowDeathCheck";
import { ShowGenericRoll } from "./ShowGenericRoll";

interface Props {
  message: GameMessage;
  context: MessageContext;
}

export function ShowMessage({ message, context }: Props) {
  if (message.type === "StatRollMessage") {
    return <ShowStatRoll {...message.props} />;
  }

  if (message.type === "GenericRollMessage") {
    return <ShowGenericRoll {...message.props} />;
  }

  if (message.type === "AttackRollMessage") {
    return <ShowAttackRoll {...message.props} context={context} />;
  }

  if (message.type === "DamageMessage") {
    return <ShowDamage {...message.props} context={context} />;
  }

  if (message.type === "SaveRollMessage") {
    return <ShowSaveRoll {...message.props} />;
  }

  if (message.type === "RestRollMessage") {
    return <ShowRestRoll {...message.props} />;
  }

  if (message.type === "PanicRollMessage") {
    return <ShowPanicRoll {...message.props} />;
  }

  if (message.type === "PanicEffectMessage") {
    return <ShowPanicEffect {...message.props} />;
  }

  if (message.type === "DeathCheckMessage") {
    return <ShowDeathCheck {...message.props} />;
  }

  if (message.type === "WoundEffectMessage") {
    return <ShowWoundEffect {...message.props} />;
  }

  if (message.type === "SimpleMessage") {
    return <ShowSimpleMessage {...message.props} />;
  }

  return <div>unknown message type</div>;
}
