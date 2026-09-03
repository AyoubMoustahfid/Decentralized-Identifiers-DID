# Decentralized-Identifiers-DID

# DID Exam Platform

A simple Node.js project demonstrating the difference between **traditional JWT authentication** and **Decentralized Identifier (DID) authentication** with a simplified **Verifiable Credential (VC)** flow.

The project uses **MongoDB** for persistence and Node.js built-in cryptography for Ed25519 signatures.


## Technologies

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* Ed25519
* Node.js Crypto API

## Concepts Demonstrated

### Without DID

```text
Student
   │
   │ email + password
   ▼
Backend
   │
   │ JWT
   ▼
Protected API
```

Authentication is based on a centralized username/password system.

### With DID

```text
Student Wallet
     │
     │ DID + signature
     ▼
Exam Platform
     │
     │ resolve DID
     ▼
Public Key
     │
     ▼
Verify Signature
```

The server verifies that the student controls the private key associated with the DID.

### DID + Verifiable Credential

```text
University
    │
    │ signs credential
    ▼
Student Wallet
    │
    │ presents credential
    ▼
Exam Platform
    │
    ├── Verify DID signature
    ├── Verify university signature
    ├── Verify trusted issuer
    └── Verify student status
```

This allows the platform to distinguish between:

* A person who controls a DID
* A legitimate student certified by a trusted university

## Requirements

* Node.js 20+
* MongoDB running locally

Example MongoDB connection:

```text
mongodb://localhost:27017/exam-platform
```

## Setup

Clone the repository:

```bash
git clone https://github.com/AyoubMoustahfid/Decentralized-Identifiers-DID.git
cd Decentralized-Identifiers-DID
```

---

# Without DID

Go to the directory:

```bash
cd without-did
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
PORT=8080
MONGODB_URI="database url"
JWT_SECRET="development-secret"
```

Start the server:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:8080
```

### Register

```http
POST /auth/register
```

Example:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}
```

### Login

```http
POST /auth/login
```

The server returns a JWT.

### Protected endpoint

```http
GET /api/exams
Authorization: Bearer <JWT>
```

---

# With DID

Open another terminal:

```bash
cd with-did
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/exam-platform
```

Start the server:

```bash
npm run dev
```

## Create a Wallet

From the `with-did` directory:

```bash
node client/create-wallet.js
```

This creates a wallet containing:

```text
DID
Public Key
Private Key
```

The wallet is saved locally as:

```text
client/wallet.json
```

> `wallet.json` is for this educational project only and must not be committed to Git.

Add it to `.gitignore`:

```gitignore
.env
client/wallet.json
node_modules/
```

## Test DID Authentication

Run:

```bash
node client/authenticate.js
```

The flow is:

```text
1. Client sends DID
2. Server generates challenge
3. Client signs challenge with private key
4. Client sends signature
5. Server resolves DID
6. Server verifies signature
7. Authentication succeeds
```

Expected result:

```json
{
  "authenticated": true,
  "did": "did:example:..."
}
```

---

# Test Student Credentials

Run:

```bash
node client/test-students.js
```

The test demonstrates:

### 1. Legitimate student

```text
DID authentication       ✅
University credential    ✅
University signature     ✅

ACCESS GRANTED
```

### 2. Student without credential

```text
DID authentication       ✅
University credential    ❌

ACCESS DENIED
```

### 3. Modified credential

```text
Credential signature     ❌

ACCESS DENIED
```

A valid university credential cannot simply be modified without invalidating its signature.

## Important Security Note

This project is a **learning implementation**.

The `/did/create` endpoint currently generates the key pair on the server and returns the private key to the client. This simplifies the demonstration.

In a production system:

```text
Private Key
    │
    └── stays inside the user's wallet

Backend
    │
    ├── stores/resolves public key
    └── never receives private key
```

The `did:example:` method used here is also a simplified DID implementation for learning purposes.

## Learning Goals

This project demonstrates:

* Centralized authentication with JWT
* DID-based authentication
* Public/private key cryptography
* Challenge-response authentication
* DID resolution
* Verifiable Credentials
* Credential signatures
* Trusted issuers
* Authentication vs authorization
* Legitimate vs illegitimate identity verification

## License

MIT
