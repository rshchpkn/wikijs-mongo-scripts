// email of the user you want to update
userEmail = '';

if(!userEmail) {
    throw new Error('You must specify user email');
}

defaultRights = [
    {
        path: '/',
        role: 'read',
        exact: true,
        deny: false,
        _id: ObjectId(),
    },
    {
        path: '/admin',
        role: 'write',
        exact: false,
        deny: false,
        _id: ObjectId(),
    },
    {
        path: '/all',
        role: 'read',
        exact: false,
        deny: false,
        _id: ObjectId(),
    },
];

db = connect("127.0.0.1:4500/wiki", DB_NAME, DB_PASS);

entriesCollection = db.getCollection('entries');
entries = entriesCollection.find({ _id: {$regex: /^[^\/\s]+$/}});
entryIds = entries.map(entry => entry._id);
rightsPaths = entryIds.map(entryId => '/' + entryId);
rights = rightsPaths.map((path) => ({
    path,
    role: 'read',
    exact: false,
    deny: true,
    _id: ObjectId(),
}));

usersCollection = db.getCollection('users');

user = usersCollection.findOne({email: userEmail});
userRights = user.rights;

rightsToAdd = defaultRights.concat(getDeveloperDefaultsRights()).filter((right) => !userRights.some((userRight) => userRight.path === right.path));
// rightsToAdd = defaultRights.concat(getDeveloperDefaultsRights()).filter((right) => !userRights.some((userRight) => userRight.path === right.path));


usersCollection.findOneAndUpdate(
    { email: userEmail },
    { $push: {"rights": { $each: rightsToAdd }}}
);



function getDeveloperDefaultsRights() {
    var exactPathes = ['/home','/human-resources','/marketing','/project-management','/sales'];
    var nonExactPathes = ['/development','/general'];
    var deniedPathes = ['/bookkeeping','/employees','/owner'];
    var exactRights = exactPathes.map(path => ({role: 'read', exact: true, deny: false, path, _id: ObjectId()}));
    var nonExactRights = nonExactPathes.map(path => ({role: 'read', exact: false, deny: false, path, _id: ObjectId()}));
    var deniedRights = deniedPathes.map(path =>  ({role: 'read', exact: false, deny: true, path, _id: ObjectId()}));
    return deniedRights.concat(nonExactRights).concat(exactRights);
}