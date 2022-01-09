module.exports = class FileDto {
    id;
    name;
    type;
    accessLink;
    date;
    size;
    path;
    user;
    parent;
    children;

    constructor(file) {
        this.id = file?._id;
        this.name = file?.name;
        this.type = file?.type;
        this.accessLink = file?.accessLink;
        this.date = file?.date;
        this.size = file?.size;
        this.path = file?.path;
        this.user = file?.user;
        this.parent = file?.parent;
        this.children = file?.children;
    }
};
