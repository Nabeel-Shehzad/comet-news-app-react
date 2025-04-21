import { useState, useEffect } from "react";
import { MessageSquare, Search, Users, TrendingUp, Zap, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const ChatPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  const categories = [
    { id: "all", name: "All" },
    { id: "trending", name: "Trending", icon: <TrendingUp size={14} /> },
    { id: "local", name: "Local" },
    { id: "news", name: "News" },
    { id: "technology", name: "Technology" },
    { id: "business", name: "Business" },
    { id: "politics", name: "Politics" },
    { id: "sports", name: "Sports" },
    { id: "health", name: "Health" },
    { id: "entertainment", name: "Entertainment" }
  ];

  // Fetch chat rooms from Firestore
  useEffect(() => {
    const fetchChatRooms = async () => {
      setLoading(true);
      try {
        const chatRoomsQuery = query(
          collection(db, 'chatRooms'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(chatRoomsQuery);

        const rooms = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Format timestamp for display
          timeAgo: doc.data().createdAt ? formatTimeAgo(doc.data().createdAt.toDate()) : 'Recently'
        }));

        setChatRooms(rooms);
        setFilteredRooms(rooms);

        // Calculate total participants
        const total = rooms.reduce((sum, room) => sum + (room.participants || 0), 0);
        setTotalUsers(total);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  // Filter rooms by category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredRooms(chatRooms);
    } else if (activeCategory === "trending") {
      setFilteredRooms(chatRooms.filter(room => room.isHot));
    } else {
      setFilteredRooms(chatRooms.filter(room =>
        room.category?.toLowerCase() === activeCategory
      ));
    }
  }, [activeCategory, chatRooms]);

  // Filter rooms by search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      if (activeCategory === "all") {
        setFilteredRooms(chatRooms);
      } else if (activeCategory === "trending") {
        setFilteredRooms(chatRooms.filter(room => room.isHot));
      } else {
        setFilteredRooms(chatRooms.filter(room =>
          room.category?.toLowerCase() === activeCategory
        ));
      }
    } else {
      const query = searchQuery.toLowerCase().trim();
      setFilteredRooms(
        chatRooms.filter(room =>
          room.title.toLowerCase().includes(query) ||
          room.description.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, chatRooms, activeCategory]);

  // Format timestamp to "X minutes/hours/days ago" format
  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000; // years
    if (interval > 1) return Math.floor(interval) + ' years ago';

    interval = seconds / 2592000; // months
    if (interval > 1) return Math.floor(interval) + ' months ago';

    interval = seconds / 86400; // days
    if (interval > 1) return Math.floor(interval) + ' days ago';

    interval = seconds / 3600; // hours
    if (interval > 1) return Math.floor(interval) + ' hours ago';

    interval = seconds / 60; // minutes
    if (interval > 1) return Math.floor(interval) + ' minutes ago';

    return 'Just now';
  };

  // Navigate to the chat room when clicking a discussion
  const handleChatClick = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  // Group rooms by category for display
  const trendingRooms = filteredRooms.filter(room => room.isHot);
  const otherRooms = filteredRooms.filter(room => !room.isHot);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <MessageSquare size={24} className="text-primary" />
          <h1 className="text-2xl font-bold">Live Chatrooms</h1>
        </div>
        <p className="mt-2 text-muted">Join live conversations about today's most important topics</p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center text-muted">
          <Users size={18} className="mr-2" />
          <span className="font-medium">{totalUsers}</span> people online
        </div>
        <div className="flex items-center text-muted">
          <MessageSquare size={18} className="mr-2" />
          <span className="font-medium">{chatRooms.length}</span> active discussions
        </div>
      </div>

      {/* Search */}
      <div className="relative mt-6 mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search discussions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg bg-secondary border border-border py-2 pl-10 pr-4 text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-1 overflow-x-auto mt-2 pb-2 scrollbar-hide border-b border-border">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex whitespace-nowrap items-center gap-1 rounded-md px-4 py-2 font-medium transition-colors ${activeCategory === category.id
                ? "bg-primary text-white"
                : "text-muted hover:bg-secondary"
              }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.icon && <span>{category.icon}</span>}
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted">Loading discussions...</span>
        </div>
      ) : (
        <>
          {/* Trending Discussions */}
          {trendingRooms.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-primary" />
                <h2 className="text-xl font-bold">Trending Discussions</h2>
              </div>

              <div className="space-y-4">
                {trendingRooms.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="block rounded-lg border border-border bg-secondary hover:border-primary/50 transition-all cursor-pointer"
                    onClick={() => handleChatClick(discussion.id)}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium">{discussion.title}</h3>
                          {discussion.isHot && (
                            <span className="ml-2 bg-orange-600/20 text-orange-400 text-xs px-2 py-0.5 rounded flex items-center">
                              <Zap size={12} className="mr-1" />
                              Hot
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-muted">
                          <Users size={14} className="mr-1" />
                          <span>{discussion.participants || 0}</span>
                          <Clock size={14} className="ml-3 mr-1" />
                          <span>{discussion.timeAgo}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted">{discussion.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Discussions */}
          {otherRooms.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={20} className="text-primary" />
                <h2 className="text-xl font-bold">Discussions</h2>
              </div>

              <div className="space-y-4">
                {otherRooms.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="block rounded-lg border border-border bg-secondary hover:border-primary/50 transition-all cursor-pointer"
                    onClick={() => handleChatClick(discussion.id)}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium">{discussion.title}</h3>
                          <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded">
                            {discussion.category}
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-muted">
                          <Users size={14} className="mr-1" />
                          <span>{discussion.participants || 0}</span>
                          <Clock size={14} className="ml-3 mr-1" />
                          <span>{discussion.timeAgo}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted">{discussion.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredRooms.length === 0 && (
            <div className="text-center py-16">
              <MessageSquare size={40} className="mx-auto text-muted mb-4" />
              <h3 className="text-xl font-medium mb-2">No discussions found</h3>
              <p className="text-muted">
                {searchQuery
                  ? "Try a different search term"
                  : "There are no chat rooms in this category yet"}
              </p>
            </div>
          )}
        </>
      )}

      {/* Login/Admin CTA at bottom */}
      <div className="mt-8 pb-6 flex flex-col sm:flex-row gap-2">
        {!isAuthenticated ? (
          <Button
            variant="outline"
            className="w-full justify-center border-border py-2 text-foreground hover:bg-secondary"
            leftIcon={<MessageSquare size={16} />}
            onClick={() => window.location.href = "/login"}
          >
            Login to Join Discussions
          </Button>
        ) : isAdmin && (
          <Button
            variant="primary"
            className="w-full justify-center py-2"
            leftIcon={<MessageSquare size={16} />}
            onClick={() => navigate("/admin")}
          >
            Manage Chat Rooms
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatPage;