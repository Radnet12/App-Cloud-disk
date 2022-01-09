module.exports = class UserDto {
    id;
    email;
    diskSpace;
    usedSpace;
    avatar;

    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.diskSpace = user.diskSpace;
        this.usedSpace = user.usedSpace;
        this.avatar = user.avatar;
    }
};
