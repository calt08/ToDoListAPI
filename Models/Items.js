class Items {
    constructor(id, owner, description, status, dueDate) {
        this.id = id;
        this.owner = owner;
        this.description = description;
        this.status = status;
        this.dueDate = dueDate;
    }
}

module.exports = Items;