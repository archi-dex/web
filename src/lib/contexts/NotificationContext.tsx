import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Notification {
  key: number;
  message: string;
  severity: AlertColor;
}

export interface NotificationContextValue {
  enqueue: (message: string, severity?: AlertColor) => void;
  dismiss: () => void;
}

export const NotificationContext =
  createContext<NotificationContextValue | undefined>(undefined);

export const useNotifications = () => {
  const value = useContext(NotificationContext);
  if (!value) {
    throw new Error(
      "NotificationContext consumer does not have a matching provider"
    );
  }

  return value;
};

export const NotificationProvider = (props: PropsWithChildren<{}>) => {
  const [items, setItems] = useState<Notification[]>([]);
  const [current, setCurrent] = useState<Notification | null>(null);

  const next = useCallback(() => {
    setCurrent(items[0] ?? null);
    setItems((items) => items.filter((_, i) => i !== 0));
  }, [items]);

  const enqueue = useCallback(
    (message: string, severity: AlertColor = "info") => {
      const item = { key: Date.now(), message, severity };
      if (current) {
        setItems((items) => [...items, item]);
      } else {
        setCurrent(item);
      }
    },
    [current]
  );

  const dismiss = useCallback(() => {
    setCurrent(null);
    next();
  }, [next]);

  useEffect(() => {
    if (!current && items.length > 0) {
      next();
    }
  }, [current, items.length, next]);

  useEffect(() => {
    if (current) {
      const timer = setTimeout(() => setCurrent(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [current]);

  return (
    <NotificationContext.Provider value={{ enqueue, dismiss }}>
      <Snackbar open={!!current}>
        <Alert onClose={dismiss} severity={current?.severity}>
          {current?.message}
        </Alert>
      </Snackbar>
      {props.children}
    </NotificationContext.Provider>
  );
};
