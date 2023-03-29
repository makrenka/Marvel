import img from '../../resources/img/error.gif';

export const ErrorMessage = () => (
  // <img src={process.env.PUBLIC_URL + '/error.gif'} alt="error" />
  <img
    style={{
      display: 'block',
      width: '250px',
      height: '250px',
      objectFit: 'contain',
      margin: '0 auto',
    }}
    src={img}
    alt="Error"
  />
);