const formatName = (name) => { // format name to initials if name is too long
    if (name.length < 18) return name;
    const names = name.split(" ");
    return names.map((word) => word[0].toUpperCase()).join(".");
};

module.exports = {
    formatName,
};