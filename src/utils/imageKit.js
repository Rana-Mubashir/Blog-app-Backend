import ImageKit from 'imagekit'
import multer from 'multer'

const upload = multer({ storage: multer.memoryStorage() });

const imagekit = new ImageKit({
    publicKey: 'public_6lEoned5Z4kZb79vBILXqMm6I40=',
    privateKey: 'private_+rODDcvJuEywFmXcV8Em25FcRXY=',
    urlEndpoint: 'https://ik.imagekit.io/zugnpkswv'
  });

  export {upload,imagekit}