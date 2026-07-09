import { Trash2, X } from "lucide-react";
import NotiIcon from "../../assets/icons/noti-icon.svg";
import { useState } from "react";

type NotificationItem = {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
};

type NotificationDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function NotificationDrawer({
  open,
  onClose,
}: NotificationDrawerProps) {
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationItem | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "Headline...",
      description:
        "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      fullDescription:
      "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum."
    },
    {
      id: 2,
      title: "Headline...",
      description: "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      fullDescription:
      "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum."
    },
    {
      id: 3,
      title: "Headline...",
      description: "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      fullDescription:
      "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum."
    },
    {
      id: 4,
      title: "Headline...",
      description: "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      fullDescription:
      "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum."
    },
  ]);
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-[999]" />

      <div className="fixed top-0 right-0 h-screen w-full max-w-[500px] bg-white z-[1000] flex flex-col">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#315497]">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            Notifications
          </h2>

          <button className="cursor-pointer" onClick={onClose}>
            <X size={24} className="text-[#111827]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {notifications.length ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => setSelectedNotification(notification)}
                  className="rounded-xl border border-[#E5E5E5] p-4 shadow-[0px_2px_10px_rgba(0,0,0,0.08)] cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-[16px] font-semibold text-[#111827]">
                        {notification.title}
                      </h3>

                      <p className="mt-1 text-[14px] text-[#979797]">
                        {notification.description}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        setNotifications((prev) =>
                          prev.filter((item) => item.id !== notification.id),
                        );
                      }}
                      className="text-[#C40000] self-start cursor-pointer hover:text-red-500 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <img
                src={NotiIcon}
                alt="No Notifications"
                className="w-[280px] h-[280px] object-contain"
              />

              <h3 className="mt-8 text-[20px] font-medium text-[#111827]">
                No Notifications
              </h3>

              <p className="text-[16px] text-[#979797]">
                Notification Inbox Empty
              </p>
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-3 flex justify-center">
            <button
              onClick={() => setNotifications([])}
              className="h-12 px-6 rounded-lg border border-[#FF5B73] text-[#FF5B73] text-sm font-medium"
            >
              Delete All Notifications
            </button>
          </div>
        )}
      </div>

      {selectedNotification && (
        <>
          <div
            onClick={() => setSelectedNotification(null)}
            className="fixed inset-0 bg-black/50 z-[1100]"
          />

          <div className="fixed inset-0 z-[1101] flex items-center justify-center px-5">
            <div className="w-full max-w-[700px] bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#315497]">
                <h2 className="text-[20px] font-semibold">
                  {selectedNotification.title}
                </h2>

                <button onClick={() => setSelectedNotification(null)}>
                  <X size={28} />
                </button>
              </div>

              <div className="px-5 py-4">
                <p className="text-[#8A8A8A] text-[16px]">
                  {selectedNotification.fullDescription}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
