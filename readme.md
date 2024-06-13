
# FormFit Backend API Documentation

Welcome to the documentation for the FormFit backend API. Below are the endpoints available for interacting with user data and profiles.

## Base URL
https://formfit-backend-api-firestore-jgyozsb3oq-uc.a.run.app


## Endpoints

### 1. Test Endpoint

**URL:** `/test`  
**Method:** `GET`  
**Description:** Endpoint to check server status.

**Response:**
```json
{
  "status": "success",
  "message": "testing"
}

### 2. Register

**URL:** `/register`  
**Method:** `POST`  
**Description:** Register a new user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}

**Request:**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}
