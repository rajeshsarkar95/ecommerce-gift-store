import React from "react";
import { FaWhatsapp } from 'react-icons/fa';
import "../../styles/WhatsApp.css"
const WhatsAppIcon = ({ phoneNumber = "", message = '', size = 40, color = "#25D366", className = '' }) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
        <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`whatsapp-icon ${className}`}
        style={{ fontSize: size, color }}
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    )
}

export default WhatsAppIcon;