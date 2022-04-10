const bcrypt = require('bcrypt');

const verifyPass = async () =>{

  const myPassword = 'admin 123 .202';
  const hash = "$2b$10$Ij0l6c/24hujSckzDpP./.a/XWmmXOfeqzNlfIU/uPf0y9mosB/8";
  const isVerify = await bcrypt.compare(myPassword, hash);

  console.info(isVerify);
}

verifyPass();
