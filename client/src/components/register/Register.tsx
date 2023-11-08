export const Register = () => {
  return (
    <section className='auth-page-container'>
      <form id='auth-form'>
        <label>
          Email:
          <input type='email' name='email' required />
        </label>
        <label>
          Password:
          <input type='password' name='password' required />
        </label>
        <label>
          Name:
          <input type='text' name='name' required />
        </label>
        <button type='submit'>Register</button>
      </form>
    </section>
  );
};
