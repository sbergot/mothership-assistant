import { Log } from "Messages/types";
import { Timer, WithId } from "Rules/types";
import { ReadWriteGame } from "./types";
import { uuidv4 } from "Services/storageServices";
import { useState } from "react";
import { Block, Button } from "UI/Atoms";

interface Props extends Log, ReadWriteGame {}

function getNewTimer(): Timer {
  return {
    currentTimeInSec: 0,
    id: uuidv4(),
    intervalInSec: 60,
    isPaused: true,
    isPublic: false,
    isRecurring: false,
    title: "",
  };
}

export function DmTimers({ log, game, setGame }: Props) {
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
        onClick={() => {
          setGame((g) => ({ ...g, timers: [...g.timers, newTimer] }));
          setNewTimer(getNewTimer());
        }}
      >
        new timer
      </Button>
      <div>
        {game.timers.map((t) => (
          <div key={t.id}>{t.title}</div>
        ))}
      </div>
    </div>
  );
}
