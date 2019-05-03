userEmailsToAddRight = [];

projectsRight = {
    path: '/projects',
    role: 'write',
    exact: false,
    deny: false,
    _id: ObjectId(),
};

db = connect("127.0.0.1:4500/wiki", DB_NAME, DB_PASS);

usersCollection = db.getCollection('users');

usersCollection.updateMany(
    {email: {$in: userEmailsToAddRight}},
    {$push: {"rights": {$each: [projectsRight]}}}
);