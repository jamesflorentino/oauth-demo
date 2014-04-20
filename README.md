Configuration
=============

1. Create a database in your preferred DB of choice.
2. Use the db name for the path for the mysql host. e.g. `mysql://your_user:your_pass@your_host/your_database_name`
3. Add this to your `.env` file.

```
DB_URL=mysql://your_user:your_pass@your_host/your_database_name
ADMIN_KEY=banana
```

4. Run `foreman start`

Tests
=====

1. Install mocha `npm install mocha -g`.
2. Change directory to `test/`
3. run `$ mocha rest.js --reporter spec`

How to use
==========

Refer to the `test/rest.js` example to know how to authenticate with the server.

Author
======

[James Florentino](http://blog.jamesflorentino.com)

License
=======

MIT
