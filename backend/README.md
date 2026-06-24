# MeetMind Backend

Express.js + MongoDB + Google Gemini API backend for AI Meeting Memory System.

## Setup

```bash
cd backend
cp .env.example .env
# Fill in your environment variables
npm install
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |
| POST | /api/auth/refresh-token | Refresh access token |
| POST | /api/auth/forgot-password | Request password reset |
| POST | /api/auth/reset-password/:token | Reset password |
| PUT  | /api/auth/change-password | Change password (protected) |

### Meetings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/meetings | Get all meetings (paginated) |
| POST | /api/meetings | Create meeting |
| GET | /api/meetings/:id | Get single meeting |
| PUT | /api/meetings/:id | Update meeting |
| DELETE | /api/meetings/:id | Delete meeting |
| GET | /api/meetings/search | Search meetings |
| PATCH | /api/meetings/:id/action-items/:itemId/toggle | Toggle action item |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/ai/summarize/:meetingId | Generate AI summary |
| POST | /api/ai/action-items/:meetingId | Extract action items |
| POST | /api/ai/ask | Ask AI about meetings |
| POST | /api/ai/semantic-search | Semantic search |
| GET | /api/ai/memories/:meetingId | Get meeting memories |

### Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/upload/meeting/:meetingId | Upload file to meeting |
| POST | /api/upload/avatar | Upload user avatar |
| DELETE | /api/upload/file/:publicId | Delete file |

### Users (Admin)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | Get all users |
| GET | /api/users/stats | Get system stats |
| DELETE | /api/users/:id | Delete user |

## Environment Variables

See `.env.example` for required variables.
