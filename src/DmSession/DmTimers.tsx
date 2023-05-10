import { Timer, WithId } from "Rules/types";
import { ReadWriteGame } from "./types";
import { uuidv4 } from "Services/storageServices";
import { useState } from "react";
import { Block, Button } from "UI/Atoms";
import { ButtonIcon, PauseIcon, PlayIcon, ResetIcon, XIcon } from "UI/Icons";
import { deleteInList, updateInList } from "helpers";

interface Props extends ReadWriteGame {}

function getNewTimer(): Timer {
  return {
    currentTimeInMSec: 0,
    id: uuidv4(),
    intervalInSec: 60,
    isPaused: true,
    isPublic: false,
    isRecurring: false,
    title: "",
  };
}

export function DmTimers({ game, setGame }: Props) {
  const [newTimer, setNewTimer] = useState(getNewTimer());
  return (
    <div>
      <Block variant="dark">
        <div className="flex flex-col gap-2">
          <div>
            <label>Title</label>
            <input
              className="input"
              value={newTimer.title}
              onChange={(e) =>
                setNewTimer((t) => ({ ...t, title: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Interval</label>
            <input
              className="input"
              type="number"
              value={newTimer.intervalInSec}
              onChange={(e) =>
                setNewTimer((t) => ({
                  ...t,
                  intervalInSec: parseInt(e.target.value),
                }))
              }
            />
          </div>
          <div className="flex justify-start">
            <input
              className="input w-16 cursor-pointer"
              type="checkbox"
              defaultChecked={newTimer.isPublic}
              onChange={(e) =>
                setNewTimer((t) => ({ ...t, isPublic: e.target.checked }))
              }
            />
            Public
          </div>
          <div className="flex justify-start">
            <input
              className="input w-16 cursor-pointer"
              type="checkbox"
              defaultChecked={newTimer.isRecurring}
              onChange={(e) =>
                setNewTimer((t) => ({ ...t, isRecurring: e.target.checked }))
              }
            />
            Recurring
          </div>
        </div>
      </Block>
      <Button
        disabled={newTimer.title === ""}
        onClick={() => {
          setGame((g) => ({ ...g, timers: [...g.timers, newTimer] }));
          setNewTimer(getNewTimer());
        }}
      >
        new timer
      </Button>
      <div>
        {game.timers.map((t) => (
          <div key={t.id}>
            <div>{t.title} - {Math.round(t.currentTimeInMSec / 1000)}</div>
            <ButtonIcon
              onClick={() =>
                setGame((g) => ({
                  ...g,
                  timers: updateInList(g.timers, t.id, (t1) => ({
                    ...t1,
                    isPaused: !t1.isPaused,
                  })),
                }))
              }
            >
              {t.isPaused ? <PlayIcon /> : <PauseIcon />}
            </ButtonIcon>
            <ButtonIcon
              onClick={() => {
                setGame((g) => ({
                  ...g,
                  timers: deleteInList(g.timers, t.id),
                }));
              }}
            >
              <XIcon />
            </ButtonIcon>
            <ButtonIcon
              disabled={!t.isPaused}
              onClick={() =>
                setGame((g) => ({
                  ...g,
                  timers: updateInList(g.timers, t.id, (t1) => ({
                    ...t1,
                    currentTimeInMSec: 0,
                  })),
                }))
              }
            >
              <ResetIcon />
            </ButtonIcon>
          </div>
        ))}
      </div>
    </div>
  );
}
