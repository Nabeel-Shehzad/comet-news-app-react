import { useState, useRef, useEffect } from "react";
import { ArrowLeft, MoreVertical, Users, Volume2, Maximize, Minimize, Send } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { db, rtdb } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, push, set, onValue, serverTimestamp as rtdbServerTimestamp, query, orderByChild, limitToLast } from "firebase/database";
import { useAuth } from "../context/AuthContext";

const ChatRoomPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { currentUser, userProfile, isAdmin } = useAuth();
  const [message, setMessage] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const chatContainerRef = useRef(null);
  const [topic, setTopic] = useState({
    title: "Loading...",
    onlineUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [chatMessages, setChatMessages] = useState([
    {
      id: "welcome",
      system: true,
      content: "Welcome to the chat room! Please be respectful of other users.",
      time: ""
    }
  ]);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  // Fetch chat room details from Firestore
  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        setLoading(true);
        const chatDocRef = doc(db, "chatRooms", chatId);
        const chatSnapshot = await getDoc(chatDocRef);

        if (chatSnapshot.exists()) {
          const chatData = chatSnapshot.data();
          setTopic({
            title: chatData.title,
            onlineUsers: 0, // Will be updated from realtime presence
            description: chatData.description
          });
          setLoading(false);
        } else {
          setError("Chat room not found");
          navigate('/chat');
        }
      } catch (err) {
        console.error("Error fetching chat room:", err);
        setError("Failed to load chat room");
        setLoading(false);
      }
    };

    if (chatId) {
      fetchChatRoom();
    }
  }, [chatId, navigate]);

  // Set user presence when entering/leaving chat room
  useEffect(() => {
    if (!chatId || !currentUser) return;

    const userStatusRef = ref(rtdb, `chatRooms/${chatId}/presence/${currentUser.uid}`);

    // Add user to presence list when they join
    const userPresenceData = {
      name: userProfile?.name || currentUser.email || 'Anonymous',
      role: userProfile?.role || 'user',
      lastSeen: rtdbServerTimestamp()
    };

    set(userStatusRef, userPresenceData);

    // Remove user from presence list when they leave
    return () => {
      set(userStatusRef, null);
    };
  }, [chatId, currentUser, userProfile]);

  // Subscribe to online users
  useEffect(() => {
    if (!chatId) return;

    const presenceRef = ref(rtdb, `chatRooms/${chatId}/presence`);

    const unsubscribe = onValue(presenceRef, (snapshot) => {
      const presenceData = snapshot.val() || {};
      const users = Object.entries(presenceData).map(([uid, data]) => ({
        uid,
        ...data
      }));

      setOnlineUsers(users);
      setTopic(prev => ({
        ...prev,
        onlineUsers: users.length
      }));
    });

    return () => unsubscribe();
  }, [chatId]);

  // Subscribe to chat messages from Realtime Database
  useEffect(() => {
    if (!chatId) return;

    // Create a query for the last 100 messages, ordered by timestamp
    const messagesRef = ref(rtdb, `chatRooms/${chatId}/messages`);
    const messagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(100));

    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const messagesData = snapshot.val() || {};

      const messages = Object.entries(messagesData).map(([key, data]) => {
        return {
          id: key,
          user: data.userName || 'Anonymous',
          content: data.text,
          time: data.timestamp ? new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
          role: data.userRole,
          isYou: currentUser && data.userId === currentUser.uid,
          system: data.system,
          timestamp: data.timestamp // Add the timestamp for sorting
        };
      }).sort((a, b) => {
        // Ensure messages are sorted by timestamp even if Firebase doesn't return them in order
        const timeA = a.timestamp || 0;
        const timeB = b.timestamp || 0;
        return timeA - timeB;
      });

      setChatMessages([
        {
          id: "welcome",
          system: true,
          content: "Welcome to the chat room! Please be respectful of other users.",
          time: ""
        },
        ...messages
      ]);
    });

    return () => unsubscribe();
  }, [chatId, currentUser]);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || !currentUser) return;

    try {
      // Add message to Realtime Database
      const messagesRef = ref(rtdb, `chatRooms/${chatId}/messages`);
      const newMessageRef = push(messagesRef);

      await set(newMessageRef, {
        text: message,
        userId: currentUser.uid,
        userName: userProfile?.name || currentUser.email || 'Anonymous',
        userRole: userProfile?.role || 'user',
        timestamp: Date.now(),
        isAdmin: isAdmin || false
      });

      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message");
    }
  };

  // Function to get initial for avatar
  const getInitial = (name) => {
    return (name || 'A').charAt(0).toUpperCase();
  };

  // Handle fullscreen toggle
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (chatContainerRef.current.requestFullscreen) {
        chatContainerRef.current.requestFullscreen();
      } else if (chatContainerRef.current.webkitRequestFullscreen) {
        chatContainerRef.current.webkitRequestFullscreen();
      } else if (chatContainerRef.current.msRequestFullscreen) {
        chatContainerRef.current.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  // Detect when fullscreen mode changes outside of our button
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullScreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullScreenChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-2">Loading chat room...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-red-400 mb-4">{error}</p>
        <Button variant="primary" onClick={() => navigate('/chat')}>
          Return to Chat Rooms
        </Button>
      </div>
    );
  }

  return (
    <div ref={chatContainerRef} className="h-full w-full flex flex-col">
      {/* Chat Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/chat" className="rounded-full p-2 hover:bg-secondary">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-semibold">{topic.title}</h1>
              <div className="flex items-center text-xs text-muted">
                <Users size={14} className="mr-1" />
                <span>{topic.onlineUsers} online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="rounded-full p-2 hover:bg-secondary">
              <Volume2 size={18} />
            </button>
            <button
              className="rounded-full p-2 hover:bg-secondary"
              onClick={toggleFullScreen}
              aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
              title={isFullScreen ? "Exit full screen" : "Enter full screen"}
            >
              {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
            <button className="rounded-full p-2 hover:bg-secondary">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-background">
        <div className="mx-auto max-w-3xl">
          {/* Chat Messages */}
          {chatMessages.map((msg) => (
            <div key={msg.id} className="mb-4">
              {msg.system ? (
                <div className="my-2 flex justify-center">
                  <div className="rounded-full bg-secondary px-4 py-1 text-xs text-muted">
                    {msg.content}
                  </div>
                </div>
              ) : msg.isYou ? (
                // Your messages on the right side
                <div className="flex items-start justify-end">
                  <div className="flex-1 text-right">
                    <div className="flex items-center justify-end">
                      <span className="font-medium text-foreground">{msg.user}</span>
                      {isAdmin && (
                        <span className="ml-2 rounded px-2 py-0.5 text-xs font-semibold bg-purple-700 dark:bg-purple-900 text-purple-100">
                          ADMIN
                        </span>
                      )}
                    </div>
                    <div className="mt-1 rounded-lg bg-primary p-3 text-sm text-primary-foreground inline-block">
                      {msg.content}
                    </div>
                    <div className="mt-1 text-xs text-muted">{msg.time}</div>
                  </div>
                  <div className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {getInitial(msg.user)}
                  </div>
                </div>
              ) : (
                // Other user messages on the left side
                <div className="flex items-start">
                  <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                    {getInitial(msg.user)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-medium text-foreground">{msg.user}</span>
                      {msg.role && (msg.role === 'admin' || msg.isAdmin) && (
                        <span className="ml-2 rounded px-2 py-0.5 text-xs font-semibold bg-purple-700 dark:bg-purple-900 text-purple-100">
                          ADMIN
                        </span>
                      )}
                      {msg.role && msg.role === 'moderator' && (
                        <span className="ml-2 rounded px-2 py-0.5 text-xs font-semibold bg-green-700 dark:bg-green-900 text-green-100">
                          MOD
                        </span>
                      )}
                    </div>
                    <div className="mt-1 rounded-lg bg-secondary p-3 text-sm text-foreground">
                      {msg.content}
                    </div>
                    <div className="mt-1 text-xs text-muted">{msg.time}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t border-border bg-card p-4">
        <form onSubmit={handleSendMessage} className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={currentUser ? "Type a message..." : "Sign in to join the conversation"}
              className="flex-1 rounded-lg bg-secondary border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              disabled={!currentUser}
            />
            <Button
              type="submit"
              variant="primary"
              className="aspect-square p-3"
              disabled={!message.trim() || !currentUser}
              aria-label="Send message"
            >
              <Send size={18} />
            </Button>
          </div>
          {!currentUser && (
            <div className="text-center mt-2">
              <Link to="/login" className="text-primary hover:underline text-sm">
                Sign in to participate in the discussion
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatRoomPage;