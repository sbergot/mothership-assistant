import { MessagePanel } from "Messages/MessagePanel";
import { Character, CustomEntry, Game, RevealedElement } from "Rules/types";
import { DataConnection, Peer } from "peerjs";
import { useEffect, useRef, useState } from "react";
import { Title } from "UI/Atoms";
import {
  AnyMessage,
  ConnectionMetadata,
  GameMessage,
  Log,
  RevealedElements,
  StampedMessage,
  SyncMessage,
} from "Messages/types";
import { ButtonIcon, CopyIcon } from "UI/Icons";
import { getAllRevealedElements, stamp } from "helpers";
import { Modes, ReadWriteGame } from "./types";
import { DmSessionRouting } from "./DmSessionRouting";
import { MobileLayout } from "UI/MobileLayout";

interface Props extends ReadWriteGame {}

type ConnectionState = "opened" | "closed" | "error";

const MAX_MESSAGE_NBR = 500;

interface ConnectionInfo {
  id: string;
  character: Character | null;
  state: ConnectionState;
}

function rotateArray<T>(arr: T[], limit: number): T[] {
  return arr.slice(Math.max(arr.length - limit, 0));
}

function useDmConnection(
  messages: StampedMessage[],
  revealedElements: RevealedElement[],
  storeMessage: (m: StampedMessage) => void
) {
  const [sessionCode, setSessionCode] = useState("");
  const [connectionsState, setConnectionsState] = useState<
    Record<string, ConnectionInfo>
  >({});
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const revealedElementsRef = useRef(revealedElements);
  revealedElementsRef.current = revealedElements;
  const debounceRef = useRef(false);
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
        console.log("Data received", data);
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
        if (typeData.type === "RevealedElementsRequest") {
          const response: SyncMessage = {
            type: "RevealedElementsResponse",
            props: { revealedElements: revealedElementsRef.current },
          };
          conn.send(response);
          return;
        }
        if (typeData.type === "RevealedElementsResponse") {
          return;
        }
        sendAll(typeData);
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

  function sendAll(stamped: StampedMessage) {
    if (!stamped.transient) {
      storeMessage(stamped);
    }
    setTransientMessages((tms) =>
      rotateArray([...tms, stamped], MAX_MESSAGE_NBR)
    );
    if (playerConnectionsRef.current) {
      Object.values(playerConnectionsRef.current).forEach((c) => {
        c.send(stamped);
      });
    }
  }

  function log(m: GameMessage) {
    const stamped = stamp({ id: "warden", name: "warden" }, m);
    sendAll(stamped);
  }

  function updateRevealedElements(c: Game) {
    const response: SyncMessage = {
      type: "RevealedElementsResponse",
      props: { revealedElements: getAllRevealedElements(c) },
    };
    if (playerConnectionsRef.current) {
      Object.values(playerConnectionsRef.current).forEach((c) => {
        c.send(response);
      });
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return {
    sessionCode,
    connections: Object.values(connectionsState),
    log,
    updateRevealedElements,
    messages: transientMessages,
  };
}

export function DmSession({ game, setGame }: Props) {
  const revealedElements: RevealedElement[] = getAllRevealedElements(game);
  const { sessionCode, connections, log, messages, updateRevealedElements } = useDmConnection(
    game.messages,
    revealedElements,
    (m) => {
      setGame((g) => ({
        ...g,
        messages: rotateArray([...g.messages, m], MAX_MESSAGE_NBR),
      }));
    }
  );
  const [mode, setMode] = useState<Modes>({ mode: "DmSheet" });

  const characters: Character[] = connections
    .map((c) => c.character)
    .filter((x): x is Character => x !== null);

  const commonContext: Log & RevealedElements = { log, revealedElements };

  const leftPart = (
    <>
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
        log={log}
        updateRevealedElements={updateRevealedElements}
      />
    </>
  );

  const rightPart = (
    <MessagePanel
      messages={messages}
      authorId={"warden"}
      contextType="warden"
      commonContext={commonContext}
      wardenContext={{ setMode }}
    />
  );

  return <MobileLayout leftPart={leftPart} rightPart={rightPart} />;
}
