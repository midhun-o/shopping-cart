interface TokenDetails {
  token: string;
  type: string;
}

const Authorization = () => {
  const token: string | null = localStorage.getItem('jsonwebtoken');
  const tokenDetails: TokenDetails | null = token ? JSON.parse(token) : null;
  if (tokenDetails?.type !== 'admin') {
    return false;
  }
  return tokenDetails.token;
};

export default Authorization;
