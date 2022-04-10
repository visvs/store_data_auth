const bcrypy = require('bcrypt');

const hashPassword = async () =>{

  const myPassword = 'admin 123 .202';

  const hash = await bcrypy.hash(myPassword, 10);
  console.info(hash);
}

hashPassword();
