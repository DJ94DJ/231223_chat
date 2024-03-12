import { useEffect, useCallback } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000", { autoConnect: false });

export function useSocket() {

    useEffect(() => {
        const initSocketConnect = () => {
          console.log('Socket connected:', socket.connected);
          if (!socket.connected) socket.connect();
        };

        initSocketConnect();
    },[socket])

    return socket
}