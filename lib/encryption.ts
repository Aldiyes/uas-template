import CryptoJS from 'crypto-js';

export const encrypt = (data: string) => {
	return CryptoJS.AES.encrypt(data, process.env.CRYPTO_SECRET!).toString();
};

export const decrypt = (data: string) => {
	const chipertext = CryptoJS.AES.decrypt(data, process.env.CRYPTO_SECRET!);
	return chipertext.toString(CryptoJS.enc.Utf8);
};
