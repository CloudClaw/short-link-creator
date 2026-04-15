export const getShortUrl = async (originalUrl: string): Promise<string> => {
  const response = await fetch(process.env.SHORTNER_API_URL as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        long_url: originalUrl
    })
  });

  const {short_url} = await response.json();

  return short_url;
};
