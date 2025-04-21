import { useState, useEffect } from 'react';
import {
  Trash2,
  Edit,
  MessageSquare,
  Users,
  TrendingUp,
  Settings,
  Plus,
  X,
  Save,
  Eye,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';

const CATEGORIES = [
  "Trending",
  "Local",
  "News",
  "Technology",
  "Business",
  "Politics",
  "Sports",
  "Health",
  "Entertainment",
  "Other"
];

const AdminDashboard = () => {
  const { userProfile, currentUser } = useAuth();
  const navigate = useNavigate();

  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [isEditingRoom, setIsEditingRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'News',
    isHot: false
  });

  // Fetch chat rooms from Firestore
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
        ...doc.data()
      }));

      setChatRooms(rooms);
    } catch (err) {
      console.error('Error fetching chat rooms:', err);
      setError('Failed to load chat rooms');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchChatRooms();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Create new chat room
  const handleCreateRoom = async (e) => {
    e.preventDefault();

    try {
      // Check if userProfile exists
      if (!userProfile || !currentUser) {
        setError('User information is not available. Please try logging out and back in.');
        return;
      }

      const newRoom = {
        ...formData,
        participants: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: {
          uid: currentUser.uid, // Use currentUser.uid instead of userProfile.uid
          name: userProfile?.name || 'Admin',
          role: userProfile?.role || 'admin'
        },
        active: true
      };

      await addDoc(collection(db, 'chatRooms'), newRoom);

      // Reset form and refresh the list
      setFormData({
        title: '',
        description: '',
        category: 'News',
        isHot: false
      });
      setIsAddingRoom(false);
      fetchChatRooms();
    } catch (err) {
      console.error('Error creating chat room:', err);
      setError('Failed to create chat room: ' + err.message);
    }
  };

  // Update existing chat room
  const handleUpdateRoom = async (e) => {
    e.preventDefault();

    if (!currentRoom) return;

    try {
      const roomRef = doc(db, 'chatRooms', currentRoom.id);

      await updateDoc(roomRef, {
        ...formData,
        updatedAt: serverTimestamp()
      });

      // Reset form and refresh the list
      setCurrentRoom(null);
      setIsEditingRoom(false);
      fetchChatRooms();
    } catch (err) {
      console.error('Error updating chat room:', err);
      setError('Failed to update chat room');
    }
  };

  // Delete chat room
  const handleDeleteRoom = async (roomId) => {
    if (!confirm('Are you sure you want to delete this chat room? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'chatRooms', roomId));
      fetchChatRooms();
    } catch (err) {
      console.error('Error deleting chat room:', err);
      setError('Failed to delete chat room');
    }
  };

  // Edit chat room
  const handleEditRoom = (room) => {
    setCurrentRoom(room);
    setFormData({
      title: room.title,
      description: room.description,
      category: room.category,
      isHot: room.isHot || false
    });
    setIsEditingRoom(true);
    setIsAddingRoom(false);

    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View chat room
  const handleViewRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  // Cancel form
  const handleCancel = () => {
    setIsAddingRoom(false);
    setIsEditingRoom(false);
    setCurrentRoom(null);
    setFormData({
      title: '',
      description: '',
      category: 'News',
      isHot: false
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-muted mt-1">
            Welcome {userProfile?.name}, manage your chat rooms here
          </p>
        </div>

        {!isAddingRoom && !isEditingRoom && (
          <Button
            variant="primary"
            onClick={() => setIsAddingRoom(true)}
            leftIcon={<Plus size={16} />}
          >
            Create Chat Room
          </Button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-500/10 dark:bg-red-900/30 border border-red-600 dark:border-red-800 text-red-800 dark:text-red-100 px-4 py-3 rounded mb-4">
          {error}
          <button
            className="float-right"
            onClick={() => setError(null)}
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Create/Edit Form */}
      {(isAddingRoom || isEditingRoom) && (
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            {isEditingRoom ? (
              <>
                <Edit size={18} className="mr-2 text-primary" />
                Edit Chat Room
              </>
            ) : (
              <>
                <Plus size={18} className="mr-2 text-primary" />
                Create New Chat Room
              </>
            )}
          </h2>

          <form onSubmit={isEditingRoom ? handleUpdateRoom : handleCreateRoom} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary"
                placeholder="Enter chat room title"
                required
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary"
                placeholder="Enter chat room description"
                rows={3}
                required
                maxLength={250}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary"
                  required
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  id="isHot"
                  name="isHot"
                  checked={formData.isHot}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border bg-secondary text-primary focus:ring-primary/50"
                />
                <label htmlFor="isHot" className="ml-2 text-sm text-foreground">
                  Mark as Hot/Trending
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                leftIcon={<X size={16} />}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                leftIcon={isEditingRoom ? <Save size={16} /> : <Plus size={16} />}
              >
                {isEditingRoom ? 'Update' : 'Create'} Chat Room
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Chat Rooms List */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <MessageSquare size={20} className="mr-2 text-primary" />
          Manage Chat Rooms
        </h2>

        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-2 text-muted">Loading chat rooms...</p>
          </div>
        ) : chatRooms.length === 0 ? (
          <div className="text-center py-8 bg-card rounded-lg border border-border">
            <MessageSquare size={40} className="mx-auto text-muted mb-2" />
            <p className="text-muted">No chat rooms found</p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddingRoom(true)}
              leftIcon={<Plus size={16} />}
              className="mt-4"
            >
              Create your first chat room
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {chatRooms.map(room => (
              <div
                key={room.id}
                className="flex flex-col sm:flex-row justify-between rounded-lg border border-border bg-card"
              >
                <div className="p-4 flex-grow">
                  <div className="flex flex-wrap gap-2 items-start mb-1">
                    <h3 className="text-lg font-medium">{room.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded">
                        {room.category}
                      </span>
                      {room.isHot && (
                        <span className="bg-orange-600/20 text-orange-400 text-xs px-2 py-0.5 rounded flex items-center">
                          <TrendingUp size={10} className="mr-1" />
                          Hot
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted mb-2">{room.description}</p>
                  <div className="flex items-center text-xs text-muted">
                    <Users size={12} className="mr-1" />
                    <span>{room.participants || 0} participants</span>
                    {room.createdAt && (
                      <>
                        <Clock size={12} className="ml-3 mr-1" />
                        <span>
                          Created: {new Date(room.createdAt.toDate()).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col flex-row items-stretch sm:items-end justify-end p-4 gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<Eye size={14} />}
                    onClick={() => handleViewRoom(room.id)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit size={14} />}
                    onClick={() => handleEditRoom(room)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    leftIcon={<Trash2 size={14} />}
                    onClick={() => handleDeleteRoom(room.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;