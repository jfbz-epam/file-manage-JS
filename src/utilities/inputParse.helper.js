module.exports = (line) => {
  if ((line[0] === 'CREATE' && line.length !== 2)
  || (line[0] === 'DELETE' && line.length !== 2)
  || (line[0] === 'MOVE' && line.length !== 3)
  || (line[0] === 'LIST' && line.length !== 1)) {
    throw new Error(`invalid params for ${line[0]} method`);
  } else {
    return true;
  }
};
