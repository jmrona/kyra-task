# Kyra Frontend Assignment: Asset Review

A full-stack asset management and review platform built with Next.js 16, React 19, and Nitro for API backend.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Running the Application

1. **Clone the repository**
```bash
git clone <repository-url>
cd kyra
```

2. **Set up environment variables**

Create `.env` files for both client and API:

```bash
# client/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

```bash
# api/.env
CLIENT_URL=http://localhost:4000
```

3. **Start the API server** (Terminal 1)
```bash
cd api
npm install
npm run dev
```
The API will run on `http://localhost:3000`

4. **Start the client application** (Terminal 2)
```bash
cd client
npm install
npm run dev
```
The app will be available at `http://localhost:4000`

5. **Open your browser** and navigate to `http://localhost:4000`

---

## 🏗️ Tech Stack

### Frontend (`/client`)
- **Framework:** Next.js 16 (App Router)
- **React:** 19.x with Server Components
- **Styling:** Tailwind CSS v4
- **State Management:** React Server Actions, useActionState
- **Validation:** Zod
- **Icons:** Lucide React
- **Testing:** Vitest + Playwright (Browser Mode)
- **TypeScript:** Full type safety

### Backend (`/api`)
- **Framework:** Nitro (UnJS)
- **Runtime:** Node.js
- **Storage:** In-memory storage
- **Validation:** Zod
- **CORS:** Configured for local development

---

## 📁 Project Structure

```
kyra/
├── api/                      # Backend API (Nitro)
│   ├── server/
│   │   ├── api/             # API endpoints
│   │   │   └── assets/      # Asset endpoints
│   │   ├── middleware/      # CORS middleware
│   │   └── plugins/         # Seed data plugin
│   └── seed/                # Mock data (assets.json, comments.json)
│
├── client/                   # Frontend (Next.js)
│   ├── actions/             # Server Actions
│   │   └── __tests__/       # Action tests
│   ├── app/                 # App Router pages
│   │   ├── asset/[id]/      # Asset detail page
│   │   ├── validations/     # Form validation schemas
│   │   │   └── __tests__/   # Validation tests
│   │   ├── error.tsx        # Error boundary
│   │   └── loading.tsx      # Loading state
│   ├── components/          # React components
│   │   ├── Alert/
│   │   ├── Asset/
│   │   ├── AssetDetails/
│   │   ├── AssetMessages/
│   │   ├── Badge/
│   │   ├── Checkbox/
│   │   ├── StatusDropdown/
│   │   │   └── StatusDropdown.test.tsx
│   │   └── ...
│   ├── lib/                 # Utility functions
│   │   ├── getAssets.ts
│   │   ├── getComments.ts
│   │   └── __tests__/       # Utility tests
│   ├── styles/              # Global styles
│   └── types/               # TypeScript definitions
│
└── docs/
    └── images/              # Reference designs
```

---

## ✨ Features Implemented

### 1. Assets Collection View
- ✅ Grid layout with asset cards
- ✅ Status badges with color coding
- ✅ Creator profile information
- ✅ Deliverable metadata
- ✅ Status filter tabs (All, Awaiting Asset, Pending Review, etc.)
- ✅ Responsive design (mobile & desktop)
- ✅ Loading skeletons

### 2. Asset Review - Overview Tab
- ✅ Two-panel layout (details + overview)
- ✅ Video and thumbnail preview
- ✅ Status badge with edit dropdown
- ✅ Sound URL with copy-to-clipboard
- ✅ Creator caption display
- ✅ Brand and deliverable information
- ✅ Tab navigation (Overview/Messages)

### 3. Asset Review - Messages Tab
- ✅ Real-time comment thread
- ✅ User avatars with deterministic colors
- ✅ Timestamp display
- ✅ Comment form with validation
- ✅ Internal message toggle
- ✅ Timestamp toggle with time picker
- ✅ Optimistic UI updates
- ✅ Custom scrollbar styling
- ✅ Scroll overscroll containment

### 4. Additional Features
- ✅ **Status Management:** Update asset status via dropdown
- ✅ **Form Validation:** Zod schemas for comments
- ✅ **Error Handling:** Error boundaries and error states
- ✅ **Loading States:** Skeleton screens for better UX
- ✅ **Accessibility:** ARIA labels, keyboard navigation, focus states
- ✅ **Responsive Design:** Mobile-first approach
- ✅ **Testing Suite:** Unit, integration, and component tests

---

## 🧪 Testing

Run tests with:
```bash
cd client
npm run test
```

**Test Coverage:**
- ✅ Zod validation schemas (`commentSchema`)
- ✅ Utility functions (`getStatusBadge`)
- ✅ Interactive components (`StatusDropdown`)
- ✅ Server Actions (`submitComment`)

Tests use **Vitest** with **Playwright** in browser mode for realistic component testing.

---

## 🎨 Design Implementation

The implementation follows the provided reference designs:

| Assets View | Asset Detail - Overview | Asset Detail - Messages |
|-------------|------------------------|------------------------|
| ![Assets](./docs/images/assets-page.png) | ![Overview](./docs/images/asset-review-overview.png) | ![Messages](./docs/images/asset-review-comments.png) |

### Design Decisions
- **Color Palette:** Dark theme with neutral grays and accent colors
- **Typography:** Geist Sans font family
- **Spacing:** Consistent 8px grid system
- **Components:** Reusable, composable component architecture
- **Animations:** Subtle transitions and loading states

---

## 🔧 API Endpoints

### Assets
- `GET /api/assets` - List all assets
- `GET /api/assets/:id` - Get single asset
- `PATCH /api/assets/:id` - Update asset status

### Comments
- `GET /api/assets/:id/comments` - Get asset comments
- `POST /api/assets/:id/comments` - Create new comment

**Note:** Data is stored in-memory and resets on server restart.

---

## 🚢 Deployment

### Vercel (Recommended)
Both client and API are configured for Vercel deployment:

1. **Deploy API:**
```bash
cd api
vercel
```

2. **Deploy Client:**
```bash
cd client
vercel
```

Update environment variables in Vercel dashboard to point to production API URL.

### Other Platforms
- Client can be deployed to any Next.js hosting (Netlify, Railway, etc.)
- API can be deployed to any Node.js hosting with Nitro support

---

## 🔐 Environment Variables

### Client (`client/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### API (`api/.env`)
```env
CLIENT_URL=http://localhost:4000
```

---

## 🛠️ Development

### Available Scripts

**Client:**
```bash
npm run dev          # Start dev server (port 4000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```

**API:**
```bash
npm run dev          # Start dev server (port 3000)
```

---

## 📝 Key Implementation Details

### Performance Optimizations
- Server Components for zero-bundle overhead
- React Compiler enabled for automatic memoization
- `'use cache'` directive for data fetching
- Lazy loading with Suspense boundaries
- Optimized images and videos

### Code Quality
- TypeScript strict mode
- ESLint configuration
- Consistent code formatting
- Component-level tests
- Type-safe API calls

### User Experience
- Instant feedback on form submissions
- Optimistic UI updates
- Loading skeletons during data fetching
- Error boundaries for graceful error handling
- Accessible components (ARIA, keyboard navigation)

---

## 📦 Project Requirements Met

### Original Assignment Goals
✅ Recreate the **Asset Review feature** from reference designs  
✅ Use **React** (React 19 with Server Components)  
✅ **Responsive** and **usable on mobile**  
✅ Maintainable, production-quality code  

### Technical Implementation
✅ Modern Next.js 16 App Router architecture  
✅ Type-safe with TypeScript throughout  
✅ Form validation with Zod  
✅ Error handling and loading states  
✅ Comprehensive test coverage  
✅ CORS-configured API backend  
✅ Clean component architecture  
✅ Accessibility best practices  

---

## 🤝 Contributing

This is a technical assessment project. For questions or issues, please contact the project maintainer.

---

## 📄 License

This project is for educational and assessment purposes only.
