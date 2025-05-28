# Comet News 🌟

A modern, responsive news aggregation platform with real-time chat functionality. Built with React, Firebase, and the NewsAPI, deployed at [cometnews.ai](https://cometnews.ai).

## 🚀 Features

### Core Features
- **📰 News Aggregation**: Real-time news from multiple sources via NewsAPI
- **💬 Chat Rooms**: Community discussions around news topics
- **🔐 Authentication**: Secure Firebase authentication
- **👨‍💼 Admin Dashboard**: Content management for administrators
- **🎨 Modern UI**: Dark/light theme with responsive design
- **📱 Mobile Friendly**: Optimized for all device sizes

### News Features
- Category-based filtering (Business, Technology, Sports, etc.)
- Featured article highlighting
- Infinite scroll pagination
- Search functionality
- Time-based sorting

### Chat Features
- Real-time messaging with Firebase Realtime Database
- Category-based chat rooms
- Hot topics highlighting
- User presence indicators
- Admin-moderated discussions

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and development server
- **React Router v7** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend Services
- **Firebase Authentication** - User management
- **Firebase Firestore** - Chat rooms and user data
- **Firebase Realtime Database** - Real-time chat messages
- **Firebase Storage** - File uploads
- **NewsAPI** - News data source

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project
- NewsAPI key

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd news
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication, Firestore, and Realtime Database
   - Update `src/lib/firebase.js` with your Firebase config
   - Add your domain to Firebase authorized domains

4. **Configure NewsAPI**
   - Get an API key from [newsapi.org](https://newsapi.org)
   - Update the API key in `src/lib/newsService.js`

5. **Start development server**
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Sidebar, Footer, etc.)
│   └── ui/              # Reusable UI components
├── context/             # React Context providers
│   ├── AuthContext.jsx  # Authentication state
│   └── ThemeContext.jsx # Theme management
├── lib/                 # Utilities and services
│   ├── firebase.js      # Firebase configuration
│   ├── newsService.js   # NewsAPI integration
│   └── utils.js         # Helper functions
├── pages/               # Page components
│   ├── HomePage.jsx     # News feed
│   ├── ChatPage.jsx     # Chat rooms list
│   ├── ChatRoomPage.jsx # Individual chat room
│   ├── AdminDashboard.jsx # Admin panel
│   └── ...              # Other pages
├── App.jsx              # Main app component
└── main.jsx             # App entry point
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options

#### AWS Lightsail (Windows)
1. Build the project: `npm run build`
2. Upload `dist/` contents to `C:\inetpub\wwwroot\comet-news\`
3. Copy `api-proxy.php` to the same directory
4. Configure IIS to handle PHP files
5. Add domain to Firebase authorized domains

#### Cloudflare Workers
Use the provided `cloudflare-worker.js` for serverless deployment.

#### XAMPP
Extract `xampp_deployment.zip` to your XAMPP htdocs folder.

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_NEWS_API_KEY=your_newsapi_key
```

### Firebase Setup
1. **Authentication**: Enable Email/Password and Google providers
2. **Firestore**: Create collections for `users` and `chatRooms`
3. **Realtime Database**: Set up for chat messages
4. **Security Rules**: Configure appropriate read/write permissions

### API Proxy
For production deployment, use `api-proxy.php` to handle NewsAPI requests and avoid CORS issues.

## 👥 User Roles

- **Admin**: Full access to admin dashboard, can manage chat rooms
- **Moderator**: Can moderate chat discussions
- **User**: Can read news and participate in chats

## 🔒 Security Features

- **Protected Routes**: Admin-only access to dashboard
- **Firebase Security Rules**: Proper data access controls
- **API Proxy**: Secure NewsAPI key handling
- **Input Validation**: Form validation and sanitization

## 📱 Responsive Design

- **Mobile-first approach** with TailwindCSS
- **Collapsible sidebar** for mobile navigation
- **Touch-friendly interface** for mobile devices
- **Optimized performance** across all devices

## 🎨 Theming

- **Dark/Light mode** toggle
- **CSS custom properties** for theme variables
- **Consistent design system** with TailwindCSS
- **Smooth transitions** between themes

## 🔍 Key Components

### Authentication (AuthContext)
Manages user authentication state, role-based permissions, and Firebase integration.

### News Service
Handles NewsAPI integration with local development and production proxy support.

### Chat System
Real-time messaging with Firebase Realtime Database and room-based organization.

### Admin Dashboard
Complete content management system for chat rooms and user moderation.

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Common Issues

1. **News not loading**: Check NewsAPI key and proxy configuration
2. **Firebase errors**: Verify Firebase config and authorized domains
3. **PHP errors**: Ensure PHP is properly configured on your server
4. **Chat not working**: Check Firebase Realtime Database rules

### Debugging Tips

- Check browser console for error messages
- Verify Firebase configuration
- Test API proxy endpoint directly
- Check network requests in DevTools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **NewsAPI** for news data
- **Firebase** for backend services
- **TailwindCSS** for styling
- **Lucide** for icons

---

**Live Demo**: [cometnews.ai](https://cometnews.ai)

For questions or support, please open an issue in the repository.
