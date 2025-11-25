# File Uploader

File uploader app which I built as part of [The Odin Project](https://www.theodinproject.com/) Node.js curriculum.

## Technologies

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![EJS](https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## Features

### User accounts

User can create accounts with username, password and email.

### Folders

Users can create, read, rename and delete folders.

### Files

Users can upload any file type and preview images.

## Project Structure

### Routes

#### User

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Route</th>
      <th>Feature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>GET</th>
      <th>/</th>
      <th>Homepage</th>
    </tr>
    <tr>
      <th>GET</th>
      <th>/login</th>
      <th>Login form</th>
    </tr>
    <tr>
      <th>GET</th>
      <th>/register</th>
      <th>Register post</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/login</th>
      <th>Login account</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/register</th>
      <th>Register account</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/logout</th>
      <th>Log out from account</th>
    </tr>
  </tbody>
</table>

#### Folder

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Route</th>
      <th>Feature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>GET</th>
      <th>/</th>
      <th>Root folder page</th>
    </tr>
    <tr>
      <th>GET</th>
      <th>/:id</th>
      <th>Specific folder page</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/:id</th>
      <th>Create folder inside specified folder by :id</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/:rename</th>
      <th>Rename folder</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/:delete</th>
      <th>Delete folder</th>
    </tr>
  </tbody>
</table>

#### File

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Route</th>
      <th>Feature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>GET</th>
      <th>/:id</th>
      <th>File info page</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/:id</th>
      <th>Upload file</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/download/:id</th>
      <th>Download file</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/delete/:id</th>
      <th>Delete file</th>
    </tr>
  </tbody>
</table>

## What I learned

- How to use Prisma ORM;
- How to setup typescript and tailwind from scratch on a project;
- How to use TailwindCSS;
- Typescript basics;

## What is missing

- Share folder link feature;
- A better design.
