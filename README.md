# YourBlog

## Description
Your blog is a simple application for writing blogs.
Users can register ,write blogs, see other people's blogs, like and comment them.
Using clodinary for upload images.

## Run server
1. Double click on WebApi.sln in server folder.
2. Choose right connection string depends on which version of SQL Server you use (Express or Developer)
3. Run it with kestrel

## Run client
1. Open *client folder* in cmd/integrated terminal
2. npm install
3. npm **start**

I am seeding some data and 3 test users (2 UserRole, 1 AdminRole) when you start the app with kestrel.
You can see information about users in Seeder class in data folder.
