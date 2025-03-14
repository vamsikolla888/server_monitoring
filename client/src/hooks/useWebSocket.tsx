import { useEffect, useState, useRef, useCallback } from "react";

interface WebSocketOptions {
  onMessage?: (message: string) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  reconnect?: boolean;
  reconnectInterval?: number;
}

const useWebSocket = (url: string, options: WebSocketOptions = {}) => {
  const { onMessage, onOpen, onClose, onError, reconnect = true, reconnectInterval = 3000 } = options;
  
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoized function to prevent unnecessary effect re-runs
  const connect = useCallback(() => {
    if (wsRef.current) return; // Prevent duplicate connections

    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setIsConnected(true);
      onOpen?.();
    };

    wsRef.current.onmessage = (event: MessageEvent) => {
      setMessages((prev) => [...prev, event.data]);
      onMessage?.(event.data);
    };

    wsRef.current.onerror = (error: Event) => {
      console.error("WebSocket Error:", error);
      onError?.(error);
    };

    wsRef.current.onclose = () => {
      setIsConnected(false);
      onClose?.();
      wsRef.current = null; // Reset reference
      if (reconnect) {
        reconnectTimeoutRef.current = setTimeout(connect, reconnectInterval);
      }
    };
  }, [url, reconnect, reconnectInterval, onMessage, onOpen, onClose, onError]);

  useEffect(() => {
    connect();

    return () => {
      wsRef.current?.close();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.warn("WebSocket is not connected.");
    }
  };

  return { isConnected, messages, sendMessage };
};

export default useWebSocket;
