# Solace - Booking Agency Demo

## Demo

(link)

### About

This is a demo project built for a cabin booking agency. It's a simple Next.js site that allows users to book and edit reservations for their dream, spectacular getaway.

### Technology

This is a full-stack application that leverages Next.js's full-stack capabilites. The project uses Tailwind CSS for styling, Next Auth for Google authentication, as well as Supabase for data storage.

### Installation instructions

```
https://github.com/chaleay/Oasis-Site.git
npm i
npm run dev
```

The project expects an `env.local` file with the following:

```
SUPABASE_URL=SUPBASE_URL
SUPABASE_KEY=SECRET
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="SECRET"
AUTH_GOOGLE_ID=test
AUTH_GOOGLE_SECRET=supersecretkey
```

You will need to provide your own testing credentials and supabase instance.
