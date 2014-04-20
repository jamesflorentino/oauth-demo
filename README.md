Configuration
=============

1. Create a database in your preferred DB of choice.
2. Use the name you used in your database as the path for the mysql host. e.g. `mysql://your_user:your_pass@your_host/your_database_name`
3. Add this to your `.env` file and run `foreman start`

```
DB_URL=mysql://your_user:your_pass@your_host/your_database_name
ADMIN_KEY=banana
```

Author
======

[James Florentino](jamesflorentino@gmail.com)

- [Website](http://blog.jamesflorentino.com)
- [Twitter](https://twitter.com/jamesflorentino)
- [GitHub](https://github.com/jamesflorentino)

License
=======

MIT
