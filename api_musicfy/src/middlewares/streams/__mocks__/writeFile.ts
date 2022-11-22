const upload = (req, res, next) => ({
  single: () => {
    req['file'] = { file: { path: 'filename', filename: 'file.mp3' } };
    next();
  }
});

export default upload;
