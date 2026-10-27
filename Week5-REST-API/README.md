# CN5006 Week 5 — Express REST API

This folder contains a starter implementation based on the Week 5 lab manual. It demonstrates Express routes, reading student data from JSON, HTML forms, and MongoDB CRUD endpoints.

## Requirements

- Node.js (LTS)
- MongoDB Atlas account or local MongoDB
- GitHub repository for source control

## Run locally

1. Open a terminal in this folder.
2. Install packages with `npm install`.
3. Copy `.env.example` to `.env` and set your own `MONGO_URI`.
4. Start the app with `npm start`.
5. Visit `http://localhost:5000`.

Do not upload `.env` or expose database credentials in commits.

## Routes

| Method | Path | Purpose |
|---|---|---|
| GET | `/` | Hello message |
| GET | `/about` | About message |
| GET | `/users/:userId/books/:bookId` | Demonstrate URL parameters |
| GET | `/GetStudents` | Return all sample student JSON |
| GET | `/GetStudent/:id` | Return one sample student |
| GET | `/studentinfo` | Display student form |
| POST | `/submit-data` | Receive student form |
| GET | `/Showform` | Display employee form |
| POST | `/insertOne` | Insert one employee |
| GET | `/persons` | Retrieve all employees |
| POST | `/insertMany` | Insert an array of employees in JSON |
| GET | `/findFemalesOver30` | Find female employees aged 30+ |
| GET | `/countDocuments` | Count employee documents |
| PATCH | `/updateManyPersons` | Update records using a supplied filter |
| DELETE | `/deleteManyPersons` | Delete records matching a supplied filter |

MongoDB routes return HTTP 503 until a valid connection is configured.

## Testing JSON endpoints

Use a browser for GET routes. For POST, PATCH, and DELETE requests, use an API client such as Postman or the VS Code REST Client extension. For example, POST to `/insertMany` with JSON:

```json
{
  "persons": [
    { "name": "Ayesha Khan", "age": 32, "gender": "Female", "salary": 32000 },
    { "name": "Ali Ahmed", "age": 25, "gender": "Male", "salary": 28000 }
  ]
}
```

For the update route, send a JSON body with both `filter` and `update`. For the delete route, provide a non-empty filter and test only against sample data.

## Portfolio evidence checklist

- [ ] Screenshot of `/` and `/about`
- [ ] Screenshot of `/GetStudents`
- [ ] Screenshots of `/GetStudent/1` and an unknown ID such as `/GetStudent/4`
- [ ] Screenshot of student and employee forms
- [ ] Screenshots of MongoDB endpoints working
- [ ] Screenshot of example records in MongoDB
- [ ] Add your own 150–200 word reflection after completing and testing the work

## Important note

The lab manual refers to an existing Week 4 `Week4Lab.js`. This folder includes a compatible illustrative implementation because that original file was not provided with the uploaded Week 5 PDF. Compare it with your own Week 4 work and your tutor's requirements before submission.
