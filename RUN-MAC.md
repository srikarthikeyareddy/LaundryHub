# Run on this Mac

Open this folder in Visual Studio Code. Use **Terminal → Run Task → Run LaundryHub** to start the Java backend and Next.js frontend in separate VS Code terminals.

Visit http://localhost:3000. MySQL must be running (`brew services start mysql`). The `laundry_db` database has been created locally; the Java application creates tables and seeds demo records automatically.

## Manual startup

Terminal 1, from the project folder:

```sh
cd backend
./mvnw spring-boot:run
```

Terminal 2, from the project folder:

```sh
cd frontend
npm install
npm run dev
```

The Maven Wrapper downloads Maven when needed, so a separate Maven installation is unnecessary. The wrapper requires a Java installation; the project compiles for Java 21.

## Demo access

Open `/login` and sign in as **Sri Karthikeya** with registration **RA2311003011798** and demo password **WashWise@123**. Student credentials are checked by the Java backend using BCrypt. Set `DEMO_STUDENT_PASSWORD` to override the default demo password before starting the backend. The room, department, and phone have not been supplied and are marked as unset.

The Staff demo and account switcher remain available for project demonstrations. This adds a credential-checked demo sign-in, not full API authorization: the upstream application's other REST endpoints and local-storage profile switcher remain demonstration features.

## Stopping and restarting

Use Ctrl+C in each server terminal before starting another instance. The frontend uses port 3000 and backend uses port 8080. Data remains in the local MySQL database across restarts.

This is the upstream LaundryHub project, not the proposed WashWise forecasting extension. It currently provides laundry orders, pricing, status tracking, students, and staff dashboards.
