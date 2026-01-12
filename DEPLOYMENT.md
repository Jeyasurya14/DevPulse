# 🚀 Production Deployment Guide

This guide will help you deploy **DevPulse** to production using **Render** (Backend) and **Vercel** (Frontend).

## 📋 Prerequisites
- A GitHub account with this repository pushed to it.
- A [Render](https://render.com) account.
- A [Vercel](https://vercel.com) account.
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (Free Tier is fine).

---

## Part 1: Backend Deployment (Render)

We will use the `render.yaml` blueprint to automate this.

1.  **Login to Render**.
2.  Click **"New +"** and select **"Blueprint"**.
3.  Connect your GitHub repository.
4.  Render will detect the `render.yaml` file and propose a service named `devpulse-backend`.
5.  **Click "Apply"**. 
    *   *Note: The first build might fail or be incomplete because we haven't set the real Environment Variables yet.*
6.  Go to the **Dashboard**, click on the new `devpulse-backend` service.
7.  Click **"Environment"**.
8.  **Add/Update the variables** using the values from the `production_setup.env` file in your project root.
    *   **CRITICAL**: ensure `MONGO_URI` is your real connection string.
    *   **CRITICAL**: ensure `SECRET_KEY` is a long random string.
    *   **CRITICAL**: ensure `RAZORPAY_` keys are set.
9.  **Save Changes** and wait for the deployment to finish.
10. **Copy your Backend URL** (e.g., `https://devpulse-backend-xyz.onrender.com`).
    *   *You will need this for the Frontend.*

---

## Part 2: Frontend Deployment (Vercel)

1.  **Login to Vercel**.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  Vercel will detect `Next.js`.
5.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Add `NEXT_PUBLIC_API_URL` and paste your **Render Backend URL** (from Part 1).
        *   *Example*: `https://devpulse-backend-xyz.onrender.com` (No trailing slash).
6.  Click **"Deploy"**.
7.  Wait for the build to complete.
8.  **Copy your Frontend URL** (e.g., `https://devpulse-frontend.vercel.app`).

---

## Part 3: Connecting Them (CORS & Hosts)

Now that both services exist, we need to introduce them.

1.  Go back to **Render** -> `devpulse-backend` -> **Environment**.
2.  Update `ALLOWED_HOSTS`:
    *   Add your Render URL (without `https://`).
    *   *Example*: `devpulse-backend-xyz.onrender.com`
3.  Update `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS`:
    *   Add your **Frontend URL** (e.g., your Vercel URL or Custom Domain).
    *   **IMPORTANT**: Do NOT include a trailing slash.
    *   *Correct*: `https://devpulse.learn-made.in`
    *   *Incorrect*: `https://devpulse.learn-made.in/`
4.  **Save Changes**. Render will redeploy automatically.

---

## ✅ Verification
1.  Open your Vercel URL.
2.  The landing page should load.
3.  Try to **Log In** or **Register**.
    *   If it works, the Database connection is good.
    *   If you get a CORS error in the console, double-check Step 3.

**🎉 You are Live!**
