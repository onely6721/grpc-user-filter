# GRPC Filtering Service

This project consists of two NestJS microservices — **Producer** and **Consumer** — communicating via gRPC. The Producer filters users from a JSON file by age (>18), and the Consumer fetches and logs this filtered list.

## 🧱 Project Structure

```
.
├── apps/
│   ├── producer/
│   └── consumer/
├── libs/
│   └── proto/              # Shared .proto definitions and generated TS types
```

## 📦 Requirements

* Node.js 18+
* npm

## 📁 Setup

```bash
# Install dependencies
npm install

```

## 🚀 Running 

### 1. Start the Producer (gRPC server)

```bash
npm run start:dev producer
```

This will run the Producer microservice at `localhost:50051`.

### 2. Start the Consumer

In another terminal:

```bash
npm run start:dev consumer
```

The Consumer will call the gRPC method and log filtered users to the console.


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

## ✅ Example Output

```bash
Filtered users: [
  { id: 1, name: 'Alice', age: 25 },
  { id: 3, name: 'Charlie', age: 30 }
]
```

