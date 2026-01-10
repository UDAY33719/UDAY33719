# Critical Bug Fix Tasks

## Backend Fixes
- [x] Change health check route from '/health' to '/api/health' in server/server.js
- [x] Verify all API routes are registered correctly
- [x] Start the backend server on port 5000

## Frontend Fixes
- [x] Add network error handling in AuthContext.jsx to set auth state to 'unknown' and show warning
- [x] Fix React warnings in DashboardEnhanced.jsx by adding onChange handlers to checkboxes
- [x] Fix accessibility issues in DashboardEnhanced.jsx: Add id/name to form fields and associate labels

## Verification
- [x] Test backend health endpoint at /api/health
- [x] Ensure Axios calls succeed without ERR_CONNECTION_REFUSED
- [x] Confirm no React warnings in dashboard
