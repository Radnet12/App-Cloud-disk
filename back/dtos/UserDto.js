module.exports = class UserDto {
    id;
    email;
    diskSpace;
    usedSpace;
    avatar;
    files;

    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.diskSpace = user.diskSpace;
        this.usedSpace = user.usedSpace;
        this.avatar = user.avatar;
        this.files = user.files;
    }
};
