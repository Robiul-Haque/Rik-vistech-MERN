
export const whatsappLink = (message) => {
    const messageToSend = encodeURIComponent(message || "");
    const url = `https://wa.me/?text=${messageToSend}`
    window.open(url, "_blank");
}
export const whatsappText = (phone) => {
    const whatsapp = phone?.startsWith("+") ? phone : `+88${phone}`
    const url = `https://wa.me/${whatsapp}`
    window.open(url, "_blank");
}
export const sendWhatsappMessage = (phone, message) => {
    const messageToSend = encodeURIComponent(`
    আসসালামু আলাইকুম*

DYNAMIC SKILLBASE E-LEARNING POINTএ আপনাকে স্বাগতম 🖥

Name:- ${message.name}
Student ID:- ${message.userId}


আমি DS E-LEARNING POINT .... থেকে আপনার কাউন্সিলর বলছি..🥳

আপনি অনলাইনে জব করার জন্য আপনার হোয়াটসঅ্যাপ নাম্বারটি দিয়েছেন 🎉🎉

আমাদের কোম্পানিতে
কি কি কাজ আছে...?
কত ইনকাম..?
কি করে কাজ গুলো করতে হবে..? 

সমস্ত ডিটেইলস জানতে হলে আপনাকে একটি কাউন্সিলিং মিটিং জয়েন করতে হবে..🎀
    `);
    const url = `https://wa.me/${phone}?text=${messageToSend} `
    window.open(url, "_blank");
    return url
}