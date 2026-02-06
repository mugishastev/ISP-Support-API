# ISP Support API - GraphQL

A comprehensive **GraphQL API** for ISP support ticket management built with **NestJS**, **Prisma**, **PostgreSQL**, and **Apollo Server**.

## 🚀 Features

- **GraphQL API** with Apollo Server
- **JWT Authentication** with access & refresh tokens
- **Role-Based Access Control** (ADMIN, AGENT, TECHNICIAN)
- **Real-time Subscriptions** for ticket updates
- **Prisma ORM** for type-safe database access
- **Rate Limiting** with throttler
- **Input Validation** with class-validator
- **Fastify** HTTP adapter for performance

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## 🛠️ Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/isp_support_db"
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
PORT=5000
NODE_ENV=development
CORS_ORIGINS="http://localhost:3000"
```

3. **Run database migrations:**
```bash
npx prisma migrate dev --name init
```

4. **Generate Prisma Client:**
```bash
npx prisma generate
```

## 🏃 Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The GraphQL Playground will be available at: **http://localhost:5000/graphql**

## 📊 Database Schema

### Models
- **User** - System users (Admin, Agent, Technician)
- **Customer** - ISP customers with subscriptions
- **Subscription** - Customer internet plans
- **Ticket** - Support tickets
- **TicketUpdate** - Ticket status change history
- **ActivityLog** - System activity tracking

## 🔐 Authentication

### Login
```graphql
mutation {
  login(loginInput: {
    email: "admin@example.com"
    password: "password123"
  }) {
    user {
      id
      email
      fullName
      role
    }
    accessToken
    refreshToken
  }
}
```

### Refresh Token
```graphql
mutation {
  refreshToken(refreshTokenInput: {
    refreshToken: "your-refresh-token"
  }) {
    accessToken
    refreshToken
  }
}
```

## 📝 GraphQL Operations

### Users (Admin Only)

**Create User:**
```graphql
mutation {
  createUser(createUserInput: {
    fullName: "John Doe"
    email: "john@example.com"
    password: "password123"
    role: AGENT
  }) {
    id
    fullName
    email
    role
  }
}
```

**Get All Users:**
```graphql
query {
  users {
    id
    fullName
    email
    role
    status
  }
}
```

### Customers

**Create Customer:**
```graphql
mutation {
  createCustomer(createCustomerInput: {
    fullName: "Jane Smith"
    phone: "+1234567890"
    email: "jane@example.com"
    address: "123 Main St"
    subscription: {
      planName: "Premium 100Mbps"
      speedMbps: 100
      price: 49.99
      isActive: true
    }
  }) {
    id
    fullName
    phone
    subscription {
      planName
      speedMbps
      price
    }
  }
}
```

**Get Customers:**
```graphql
query {
  customers {
    id
    fullName
    phone
    email
    subscription {
      planName
      speedMbps
      isActive
    }
  }
}
```

### Tickets

**Create Ticket:**
```graphql
mutation {
  createTicket(createTicketInput: {
    description: "Internet connection is down"
    priority: HIGH
    customerId: "customer-uuid"
  }) {
    id
    ticketNumber
    description
    status
    priority
    customer {
      fullName
      phone
    }
  }
}
```

**Assign Ticket:**
```graphql
mutation {
  assignTicket(assignTicketInput: {
    ticketId: "ticket-uuid"
    userId: "technician-uuid"
  }) {
    id
    ticketNumber
    status
    assignedTo {
      fullName
      role
    }
  }
}
```

**Update Ticket Status:**
```graphql
mutation {
  updateTicketStatus(updateTicketStatusInput: {
    ticketId: "ticket-uuid"
    status: RESOLVED
    note: "Fixed connection issue"
    userId: "technician-uuid"
  }) {
    id
    ticketNumber
    status
    resolvedAt
  }
}
```

**Subscribe to Ticket Updates:**
```graphql
subscription {
  ticketUpdated {
    id
    ticketNumber
    status
    customer {
      fullName
    }
  }
}
```

## 🔒 Role-Based Access

| Operation | ADMIN | AGENT | TECHNICIAN |
|-----------|-------|-------|------------|
| Manage Users | ✅ | ❌ | ❌ |
| Create Customers | ✅ | ✅ | ❌ |
| View Customers | ✅ | ✅ | ✅ |
| Create Tickets | ✅ | ✅ | ❌ |
| Assign Tickets | ✅ | ✅ | ❌ |
| Update Ticket Status | ✅ | ✅ | ✅ |

## 📁 Project Structure

```
src/
├── main.ts                      # Application entry point
├── app.module.ts                # Root module
├── prisma/                      # Prisma service
├── config/                      # Configuration files
├── auth/                        # Authentication module
│   ├── guards/                  # Auth & roles guards
│   ├── strategies/              # JWT strategies
│   └── decorators/              # Custom decorators
├── users/                       # Users module
├── customers/                   # Customers module
├── tickets/                     # Tickets module
│   └── subscriptions/           # Real-time subscriptions
└── common/                      # Shared utilities
    ├── enums/                   # GraphQL enums
    ├── filters/                 # Exception filters
    ├── interceptors/            # Logging interceptors
    ├── guards/                  # Throttler guard
    └── utils/                   # Helper functions
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🛡️ Security Features

- **JWT Authentication** with short-lived access tokens
- **Refresh Token** rotation
- **Password Hashing** with bcrypt
- **Role-Based Authorization**
- **Rate Limiting** (100 requests/minute)
- **Input Validation** on all mutations
- **CORS** configuration

## 📚 Additional Commands

```bash
# Format code
npm run format

# Lint code
npm run lint

# View Prisma Studio
npx prisma studio

# Create new migration
npx prisma migrate dev --name migration_name
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.