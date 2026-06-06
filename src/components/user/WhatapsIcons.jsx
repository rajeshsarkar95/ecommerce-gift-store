import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../../styles/WhatsApp.css";

const WhatsAppIcon = ({
  phoneNumber = "",
  message = "",
  shareImages = [],
  size = 40,
  color = "#25D366",
  className = "",
})=> {
const buildWaLink = ()=>{
    const encoded = encodeURIComponent(message);
    return phoneNumber
      ? `https://wa.me/${phoneNumber}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;
  };
  const fetchImageFiles = async ()=>{
    return Promise.all(
      shareImages.map(async (imgUrl,index)=>{
        const response = await fetch(imgUrl);
        if (!response.ok) throw new Error(`Failed to fetch image: ${imgUrl}`);
        const blob = await response.blob();
        const ext = blob.type.split("/")[1] || "jpg";
        return new File([blob],`product-${index + 1}.${ext}`,{
          type: blob.type,
        });
      })
    );
  };
const handleClick = async (e)=>{
    e.preventDefault();
    const hasImages = shareImages.length > 0;
    const canUseNativeShare = typeof navigator.share === "function";
    const canUseCanShare = typeof navigator.canShare === "function";
    if (hasImages && canUseNativeShare){
      try {
        const files = await fetchImageFiles();
        const shareData = {
          title:"Product Details",
          text:message,
          files,
        };
        const finalData =
          canUseCanShare && navigator.canShare({files})
            ? shareData
            : {title:shareData.title,text:shareData.text};
        await navigator.share(finalData);
        return;
      } catch (err){
        if (err.name === "AbortError") return;
        console.warn("Native share failed,falling back to WhatsApp:",err);
      }
    }
    window.open(buildWaLink(),"_blank","noopener,noreferrer");
  };
  return (
    <button
      onClick={handleClick}
      className={`whatsapp-icon ${className}`}
      style={{
        fontSize:size,
        color,
        background:"none",
        border:"none",
        cursor:"pointer",
        padding:0,
        lineHeight:1,
      }}
      title="Share on WhatsApp"
      aria-label="Share on WhatsApp"
    >
      <FaWhatsapp/>
    </button>
  );
};
export default WhatsAppIcon;