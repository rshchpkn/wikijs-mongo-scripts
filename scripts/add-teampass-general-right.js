teampassGeneraRight = {
        path: '/teampass',
        role: 'read',
        exact: true,
        deny: false,
        _id: ObjectId(),
    };

db = connect("127.0.0.1:4500/wiki", DB_NAME, DB_PASS);

usersCollection = db.getCollection('users');

users = usersCollection.find({});

usersCollection.updateMany(
    { },
    { $push: {"rights": { $each: [teampassGeneraRight] }}}
);