
db.createUser(
    {
        user: "root", //To change
        pwd: "example", // To change
        roles: [
            {
                role: "readWrite",
                db: "Temperature"   // Name of the database to create
            }
        ]
    }
);


