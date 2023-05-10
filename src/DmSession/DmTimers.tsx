import { Timer, WithId } from "Rules/types";
import { ReadWriteGame } from "./types";
import { uuidv4 } from "Services/storageServices";
import { useState } from "react";
import { Block, Button, Progress2 } from "UI/Atoms";
import {
  ButtonIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
  TrashIcon,
  XIcon,
} from "UI/Icons";
import { deleteInList, updateInList } from "helpers";
import { BlockWithTitle, EntryHeader } from "UI/Molecules";

function formatNbr(n: number) {
  return String(n).padStart(2, "0");
}

function formatTime(timeInMs: number): string {
  const timeInSeconds = Math.round(timeInMs / 1000);
  const seconds = timeInSeconds % 60;
  const minutes = Math.floor(timeInSeconds / 60) % 60;
  const hours = Math.floor(seconds / 3600);
  return `${formatNbr(hours)}:${formatNbr(minutes)}:${formatNbr(seconds)}`;
}

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

interface TimerHeaderProps {
  title: string;
  onDelete(): void;
}

function TimerHeader({ title, onDelete }: TimerHeaderProps) {
  return (
    <div className="text-center relative">
      <div>{title}</div>
      <div className="absolute right-2 top-0">
        <ButtonIcon light onClick={onDelete}>
          <TrashIcon />
        </ButtonIcon>
      </div>
    </div>
  );
}

interface Props extends ReadWriteGame {}

export function DmTimers({ game, setGame }: Props) {
  const [newTimer, setNewTimer] = useState(getNewTimer());
  return (
    <div>
      <Block variant="dark">
        <div className="flex items-start gap-4">
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
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-10 pt-8">
            <div className="flex justify-start">
              <input
                className="input w-16 cursor-pointer"
                type="checkbox"
                checked={newTimer.isPublic}
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
                checked={newTimer.isRecurring}
                onChange={(e) =>
                  setNewTimer((t) => ({ ...t, isRecurring: e.target.checked }))
                }
              />
              Recurring
            </div>
            <div className="ml-4 mt-1">
              <Button
                dark
                disabled={newTimer.title === ""}
                onClick={() => {
                  setGame((g) => ({ ...g, timers: [...g.timers, newTimer] }));
                  setNewTimer(getNewTimer());
                }}
              >
                new timer
              </Button>
            </div>
          </div>
        </div>
      </Block>
      <div className="mt-4 flex flex-wrap justify-between gap-4">
        {game.timers.map((t) => {
          const header = (
            <TimerHeader
              title={t.title}
              onDelete={() => {
                setGame((g) => ({
                  ...g,
                  timers: deleteInList(g.timers, t.id),
                }));
              }}
            />
          );
          return (
            <div className="max-w-xs w-full">
              <BlockWithTitle light title={header} key={t.id}>
                <div className="flex justify-between">
                  <div className="flex gap-1">
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
                  <span className="text-lg text-mother-5">{formatTime(t.currentTimeInMSec)}</span>
                  <Progress2 current={t.currentTimeInMSec} max={t.intervalInSec * 1000} />
                </div>
              </BlockWithTitle>
            </div>
          );
        })}
      </div>
    </div>
  );
}
