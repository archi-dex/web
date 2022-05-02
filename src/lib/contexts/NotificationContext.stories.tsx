import { AlertColor } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { Select } from "~/components/inputs/Select";

import { NotificationProvider, useNotifications } from "./NotificationContext";

export default {
  title: "Contexts/NotificationProvider",
  component: NotificationProvider,
} as ComponentMeta<typeof NotificationProvider>;

const NotificationsDemo = () => {
  const { enqueue, dismiss } = useNotifications();
  const [message, setMessage] = useState("test");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const notify = () => enqueue(message, severity);

  return (
    <Stack>
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} />
      <Select
        options={["success", "info", "warning", "error"]}
        value={severity}
        onChange={(e) => setSeverity(e.target.value as AlertColor)}
      />
      <Button onClick={notify}>Enqueue</Button>
      <Button onClick={dismiss}>Dismiss</Button>
    </Stack>
  );
};

export const Primary: ComponentStory<typeof NotificationProvider> = (props) => (
  <NotificationProvider {...props}>
    <NotificationsDemo />
  </NotificationProvider>
);
