export const decodeBase64 = (data?: string) => {
  if (typeof data !== 'string') return;
  const buff = Buffer.from(data, 'base64');
  const text = buff.toString('utf-8');
  return text;
};
