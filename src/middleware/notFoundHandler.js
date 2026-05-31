export const notFoundHandler = (req, res) => {
  ((req, res) => {
    res.status(404).json({ message: 'Route not found'});
});
};

