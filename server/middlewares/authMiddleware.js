
const protect = async (req, res, next) => {
  console.log('auth middle ware ');
  next();
};

export default protect;