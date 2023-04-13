import { MessagePanel } from "Messages/MessagePanel";
import { Character, Game } from "Rules/types";
import { DmSheet } from "./DmSheet";
import { DataConnection, Peer } from "peerjs";
import { useEffect, useRef, useState } from "react";
import { Title } from "UI/Atoms";
import {
  AnyMessage,
  ConnectionMetadata,
  GameMessage,
  Log,
  StampedMessage,
  SyncMessage,
} from "Messages/types";
import { ButtonIcon, CopyIcon } from "UI/Icons";
import { stamp } from "helpers";
import { Modes, ReadWriteGame } from "./types";
import { DmSessionRouting } from "./DmSessionRouting";

interface Props extends ReadWriteGame {
}

type ConnectionState = "opened" | "closed" | "error";

interface ConnectionInfo {
  id: string;
  character: Character | null;
  state: ConnectionState;
}

function useDmConnection(
  messages: StampedMessage[],
  storeMessage: (m: StampedMessage) => void
) {
  const [sessionCode, setSessionCode] = useState("");
  const [connectionsState, setConnectionsState] = useState<
    Record<string, ConnectionInfo>
  >({});
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const debounceRef = useRef(false);
  const connRef = useRef<DataConnection | null>(null);
  const playerConnectionsRef = useRef<Record<string, DataConnection>>({});
  const [transientMessages, setTransientMessages] =
    useState<StampedMessage[]>(messages);

  function initialize() {
    if (debounceRef.current) {
      return;
    }
    debounceRef.current = true;
    const peer = new Peer();
    playerConnectionsRef.current = {};
    setConnectionsState({});

    peer.on("open", function (id) {
      console.log("peer connected with id: " + id);
      setSessionCode(id);
    });

    peer.on("connection", function (c) {
      console.log("Peer connected");
      ready(c);
    });
    peer.on("disconnected", function () {
      console.log("Connection lost. Please reconnect");
    });
    peer.on("close", function () {
      console.log("Peer destroyed");
      playerConnectionsRef.current = {};
      setConnectionsState({});
    });
    peer.on("error", function (err) {
      console.log(err);
    });
    function ready(conn: DataConnection) {
      const metadata: ConnectionMetadata = conn.metadata;
      playerConnectionsRef.current[metadata.browserId] = conn;
      setConnectionsState((cs) => ({
        ...cs,
        [metadata.browserId]: {
          character: null,
          id: metadata.browserId,
          state: "opened",
        },
      }));

      conn.on("data", function (data) {
        console.log("Data recieved", data);
        const typeData = data as AnyMessage;
        if (typeData.type === "UpdateChar") {
          const newChar = typeData.props.character;
          setConnectionsState((cs) => ({
            ...cs,
            [metadata.browserId]: {
              character: newChar,
              id: metadata.browserId,
              state: "opened",
            },
          }));
          return;
        }
        if (typeData.type === "MessageHistoryRequest") {
          const response: SyncMessage = {
            type: "MessageHistoryResponse",
            props: { messages: messagesRef.current },
          };
          conn.send(response);
          return;
        }
        if (typeData.type === "MessageHistoryResponse") {
          return;
        }
        if (!typeData.transient) {
          storeMessage(typeData);
        }
        setTransientMessages((tms) => [...tms, typeData]);
        Object.values(playerConnectionsRef.current).forEach((c) => {
          c.send(typeData);
        });
      });

      conn.on("close", function () {
        console.log("Connection destroyed");
        delete playerConnectionsRef.current[metadata.browserId];
        setConnectionsState((cs) => ({
          ...cs,
          [metadata.browserId]: {
            character: null,
            id: metadata.browserId,
            state: "closed",
          },
        }));
      });

      conn.on("error", (e) => {
        console.error("connexion error", e);
        setConnectionsState((cs) => ({
          ...cs,
          [metadata.browserId]: {
            ...cs[metadata.browserId],
            state: "error",
          },
        }));
      });
    }
  }

  function log(m: GameMessage) {
    if (connRef.current) {
      connRef.current.send(stamp({ id: "warden", name: "warden" }, m));
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return {
    sessionCode,
    connections: Object.values(connectionsState),
    log,
    messages: transientMessages,
  };
}

export function DmSession({ game, setGame }: Props) {
  const { sessionCode, connections, log, messages } = useDmConnection(
    game.messages,
    (m) => {
      setGame((g) => ({ ...g, messages: [...g.messages, m] }));
    }
  );
  const [mode, setMode] = useState<Modes>({ mode: "DmSheet" });

  const characters: Character[] = connections
    .map((c) => c.character)
    .filter((x): x is Character => x !== null);

  const commonContext: Log = { log };

  return (
    <div className="flex gap-2">
      <div className="max-w-2xl w-full">
        <Title>
          <span className="normal-case">Session code: {sessionCode}</span>
          <ButtonIcon
            onClick={() => {
              navigator.clipboard.writeText(sessionCode);
            }}
          >
            <CopyIcon />
          </ButtonIcon>
        </Title>
        {connections.map(({ id, character, state }) => (
          <div key={id}>
            {id} - {character?.name ?? "???"} - {state}
          </div>
        ))}
        <DmSessionRouting
          game={game}
          setGame={setGame}
          characters={characters}
          mode={mode}
          setMode={setMode}
        />
      </div>
      <MessagePanel
        messages={messages}
        authorId={"warden"}
        contextType="warden"
        commonContext={commonContext}
        wardenContext={{ setMode }}
      />
    </div>
  );
}
