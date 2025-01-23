# Newsletter Signup

## Overview

This is a sample project showing how contacts can be gathered for communication purposes.

## Requirements

1. Get all contacts
2. Add a new contact, or update an existing contact
3. Download a CSV of all contacts, sorted by signup date

## Starting Point

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

I chose to use Next.js because the default `create-react-app`:

1. Was not building. At first it was a dependency conflict, which I resolved. Then it was many missing packages and misconfigurations, which I decided it was not worth it to solve.
2. It does not contain a server by default. Next.js does (pages/api contains the routes).

## APIs

### getAllContacts

```
GET /getAllContacts
```

Example response body:

```
{
  atleastihavechicken@gmail.com: {
    firstName: "Leeroy",
    lastName: "Jenkins",
    createdTimestamp: 12345,
    updatedTimestamp: 12345,
  }
}
```

### createUpdateContact

I decided to combine the use cases for creating a new contact with updating an existing one.

```
POST /createUpdateContact
```

Example body (type `contactInfo`):

```
{
  firstName: Leeroy,
  lastName: Jenkins,
  email: atleastihavechicken@gmail.com,
}
```

## How to Run

This app requires node.js and npm.

Install (first time only):

```
npm install
```

Dev:

```bash
npm run dev
```

Production:

```
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can see the list of contacts on the page. There is also a button to download them as a CSV. I chose to sort them by creation timestamp descending, so the most recent signups will be listed first.
