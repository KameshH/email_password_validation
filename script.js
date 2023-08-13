const Ajv = require('ajv');

const ajv = new Ajv();

const schema = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        pattern: '^\\S+@\\S+\\.\\S+$', // Regular expression pattern for email validation
      },
      password: { type: 'string', minLength: 8 }
    },
    required: ['email', 'password']
  };

const validate = ajv.compile(schema);

module.exports = validate;


// const registrationForm = document.getElementById('registration-form');

// registrationForm.addEventListener('submit', async (event) => {
//     event.preventDefault();
    
//     const formData = new FormData(registrationForm);
//     const email = formData.get('email');
//     const password = formData.get('password');
    
//     if (!validate({ email, password })) {
//         alert('Invalid data');
//         return;
//     }
    
//     const response = await fetch('/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     });
    
//     if (response.ok) {
//         alert('Registration successful');
//         registrationForm.reset();
//     } else {
//         alert('Registration failed');
//     }
// });
