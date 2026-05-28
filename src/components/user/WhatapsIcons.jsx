import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../../styles/WhatsApp.css";

const WhatsAppIcon = ({
  phoneNumber = "",
  message = "",
  imageUrls = [],
  shareImages = [],
  size = 40,
  color = "#25D366",
  className = "",
}) => {
  const buildWaLink = ()=>{
    let fullMessage = message;
    if (imageUrls.length > 0){
      const imgBlock = imageUrls
        .map((url, i) => `🖼 Image ${i + 1}: ${url}`)
        .join("\n");
      fullMessage = `${message}\n\n${imgBlock}`;
    }
    const encoded = encodeURIComponent(fullMessage);
    return phoneNumber
      ? `https://wa.me/${phoneNumber}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;
  };
  const handleClick = async (e)=>{
    if (shareImages.length > 0 && navigator.share){
      e.preventDefault();
      try {
        const files = await Promise.all(
          shareImages.map(async (imgUrl, index) => {
            const response = await fetch(imgUrl);
            const blob = await response.blob();
            return new File(
              [blob],
              `image-${index + 1}.jpg`,
              { type: blob.type }
            );
          })
        );
        const shareData = {
          title: "Product Details",
          text: message,
          files,
        };
        if (navigator.canShare && navigator.canShare({ files })) {
          await navigator.share(shareData);
          return;
        }
      } catch (err) {
        console.error("Share failed:", err);
      }
    }
    window.open(buildWaLink(), "_blank", "noopener,noreferrer");
  };
  return (
    <button
      onClick={handleClick}
      className={`whatsapp-icon ${className}`}
      style={{
        fontSize: size,
        color,
        background: "none",
        border: "none",
        cursor: "pointer",
      }}
      title="Share on WhatsApp"
    >
      <FaWhatsapp />
    </button>
  );
};

export default WhatsAppIcon;