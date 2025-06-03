# 🐳 GRPC Filtering Service

This project consists of two NestJS microservices — **Producer** and **Consumer** — communicating via **gRPC**.
The Producer filters users from a JSON file by age (>18), and the Consumer fetches and logs this filtered list.

---

## 🧱 Project Structure

```
.
├── apps/
│   ├── producer/
│   └── consumer/
├── libs/
│   └── proto/              # Shared .proto definitions and generated TS types
├── docker-compose.yml
```

---

## 📦 Requirements

* Node.js 18+
* npm
* Docker (optional, for containerized run)

---

## 📁 Local Setup

```bash
# Install dependencies
npm install
```

---

## 🚀 Running Locally (with npm)

### 1. Start the Producer (gRPC server)

```bash
npm run start producer
```

This will run the Producer microservice at `localhost:50051`.

### 2. Start the Consumer

In another terminal:

```bash
npm run start consumer
```

The Consumer will call the gRPC method and log filtered users to the console.

---

## 🐋 Running with Docker Compose

### 1. Build and run services

```bash
docker-compose up --build
```

This will:

* Build isolated images for Producer and Consumer
* Start both services on ports `50051` and `50052`

### 2. Example output

```bash
producer_service | Application is running on: grpc://0.0.0.0:50051
consumer_service | Filtered users: [ { id: 1, name: 'Alice', age: 25 }, { id: 3, name: 'Charlie', age: 30 } ]
```

> Make sure the `users.json` file is correctly included in the Docker image. If missing, see Dockerfile's COPY instructions.

---

## 📄 Proto Example

`libs/proto/users.proto`

```proto
syntax = "proto3";

package users;

service UserService {
  rpc GetFilteredUsers (Empty) returns (FilteredUsers);
}

message Empty {}

message User {
  int32 id = 1;
  string name = 2;
  int32 age = 3;
}

message FilteredUsers {
  repeated User users = 1;
}
```

---

## ✅ Example Output

```bash
Filtered users: [
  { id: 1, name: 'Alice', age: 25 },
  { id: 3, name: 'Charlie', age: 30 }
]
```
