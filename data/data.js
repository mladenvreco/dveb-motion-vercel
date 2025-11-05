export const mockDevices = [
  {
    id: 1,
    name: "Apple Watch",
    connected: true,
    lastSync: "2 hours ago",
    info: "Tracks heart rate, steps, and calories.",
  },
  {
    id: 2,
    name: "Garmin Forerunner",
    connected: false,
    lastSync: "1 day ago",
    info: "Tracks GPS activity, heart rate, and performance stats.",
  },
  {
    id: 3,
    name: "Fitbit Charge 6",
    connected: true,
    lastSync: "45 minutes ago",
    info: "Monitors sleep, heart rate, and daily steps.",
  },
  {
    id: 4,
    name: "Spotify",
    connected: true,
    lastSync: "Synced just now",
    info: "Plays your favorite workout playlists.",
  },
];

export const mockNotifications = [
  {
    id: 1,
    type: "training",
    message: "Upcoming HIIT session at 18:00",
    read: false,
  },
  {
    id: 2,
    type: "billing",
    message: "Your subscription has been renewed",
    read: true,
  },
  {
    id: 3,
    type: "system",
    message: "New app version available",
    read: false,
  },
  {
    id: 4,
    type: "community",
    message: "New comment on your post",
    read: true,
  },
];

export const mockProgress = {
  daily: [3000, 4500, 6000, 5500, 8000, 9000, 7500],
  weekly: [35000, 42000, 48000, 50000],
  monthly: [200000, 215000, 230000],
};
